import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { query, collection, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Input, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { auth } from '../firebase';

const Message = ({ chatId }) => {
  const [messages, loading] = useCollection(
    query(collection(db, `chats/${chatId}/messages`), orderBy('timestamp'))
  );
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: newMessage,
        timestamp: serverTimestamp(),
        sender: auth.currentUser.uid
      });
      setNewMessage('');
    }
  };

  return (
    <Paper sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {messages?.docs.map(doc => (
          <ListItem key={doc.id}>
            <ListItemText 
              primary={doc.data().text}
              secondary={new Date(doc.data().timestamp?.toDate()).toLocaleString()}
              sx={{ 
                textAlign: doc.data().sender === auth.currentUser.uid ? 'right' : 'left',
                bgcolor: doc.data().sender === auth.currentUser.uid ? '#e3f2fd' : '#f5f5f5',
                borderRadius: 2,
                p: 1
              }}
            />
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Input
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </Paper>
  );
};