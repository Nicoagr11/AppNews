import React from 'react';
import { News } from '../types/news';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

interface Props {
  news: News;
  onSelect: (news: News) => void;
}

export const HighlightedNews: React.FC<Props> = ({ news, onSelect }) => {
  if (!news) return null;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="300"
        image={news.image || '/placeholder.jpg'}
        alt={news.title}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>{news.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {news.description?.slice(0, 150)}...
        </Typography>
        <Button onClick={() => onSelect(news)} sx={{ marginTop: 2 }}>
          Leer más
        </Button>
      </CardContent>
    </Card>
  );
};
