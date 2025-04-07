import { Card, CardContent, Typography, Avatar, Chip } from '@mui/material';
import styled from 'styled-components';

const ForumCard = ({ topic }) => {
  return (
    <StyledCard>
      <CardContent>
        <Header>
          <Avatar src={topic.author.avatar} />
          <div>
            <Typography variant="h6">{topic.title}</Typography>
            <Typography variant="caption">{topic.author.name}</Typography>
          </div>
        </Header>
        <Typography variant="body2" sx={{ mt: 2 }}>{topic.content}</Typography>
        <TagsContainer>
          {topic.tags.map(tag => (
            <Chip label={tag} size="small" sx={{ mr: 1, mt: 1 }} />
          ))}
        </TagsContainer>
        <FilePreview>
          {topic.files?.map(file => (
            <a href={file.url} target="_blank">{file.name}</a>
          ))}
        </FilePreview>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  margin: 1rem 0;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Header = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FilePreview = styled.div`
  margin-top: 1rem;
  a {
    display: block;
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default ForumCard;