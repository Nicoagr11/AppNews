import React from 'react';
import { News } from '../types/news';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from '@mui/material';

type Props = {
  newsList: News[];
  onSelect: (news: News) => void;
};

export const NewsList: React.FC<Props> = ({ newsList, onSelect }) => {
  return (
    <Grid container spacing={2}>
      {newsList.map((news) => (
          <Card>
            <CardActionArea onClick={() => onSelect(news)}>
              {news.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={news.image}
                  alt={news.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {news.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {news.subtitle}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Por: {news.author}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      ))}
    </Grid>
  );
};
