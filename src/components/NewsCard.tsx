import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { News } from '../types/news';

type Props = {
  news: News;
  onSelect: (news: News) => void;
};

export const NewsCard: React.FC<Props> = ({ news, onSelect }) => (
<Card
  onClick={() => onSelect(news)}
  sx={{
    cursor: 'pointer',
    boxShadow: 3,
    borderRadius: 2,
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  }}
>
{news.image && (
      <CardMedia
        component="img"
        height="180"
        image={news.image}
        alt={news.title}
        sx={{ objectFit: 'cover' }}
      />
    )}
  <CardContent>
    <Typography variant="h6" gutterBottom>
      {news.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {news.description.length > 100
        ? news.description.substring(0, 100) + '...'
        : news.description}
    </Typography>
  </CardContent>
</Card>
);
