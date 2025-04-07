import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/forum/:topicId" element={<Forum />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;