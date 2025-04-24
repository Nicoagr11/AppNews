import React, { useState } from 'react';
import { News } from '../types/news';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

interface Props {
  news: News[];
  onSelect: (news: News) => void;
}

export const NewsCarousel: React.FC<Props> = ({ news, onSelect }) => {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const [page, setPage] = useState(0);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));

  const currentItems = news.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Grid container spacing={2}>
        {currentItems.map((n) => (
            <Card onClick={() => onSelect(n)} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6">{n.title}</Typography>
              </CardContent>
            </Card>
        ))}
      </Grid>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button onClick={handlePrev} disabled={page === 0}>←</Button>
        <Button onClick={handleNext} disabled={page === totalPages - 1}>→</Button>
      </div>
    </div>
  );
};
