import React from 'react';
import { News } from '../types/news';
import { List, ListItemButton, ListItemText, Paper } from '@mui/material';

interface Props {
  news: News[];
  onSelect: (news: News) => void;
}

export const SuggestedNewsList: React.FC<Props> = ({ news, onSelect }) => {
  return (
    <Paper elevation={3}>
      <List>
        {news.map((n) => (
          <ListItemButton key={n.id} onClick={() => onSelect(n)}>
            <ListItemText primary={n.title} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};
