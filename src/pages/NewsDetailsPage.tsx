import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById, deleteNews, updateNews } from '../api/newsService';
import { News } from '../types/news';
import { NewsModal } from '../components/NewsModal';
import {
  Container,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
} from '@mui/material';
import { Spinner } from '../components/Spinner'; // importar
import { Navbar } from '../components/Navbar';
import { SuggestedNewsList } from '../components/SuggestedNewsList';
import { getNews } from '../api/newsService'; // Para obtener todas las noticias

export const NewsDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [allNews, setAllNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      if (id) {
        const found = await getNewsById(id);
        setNews(found ?? null);
      }
    };
    fetchNews();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await deleteNews(id);
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      if (id) {
        const found = await getNewsById(id);
        setNews(found ?? null);
      }
  
      const all = await getNews();
      setAllNews(all);
    };
    fetchNews();
  }, [id]);
  
  const getSuggestedNews = (): News[] => {
    return allNews
      .filter((n) => n.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  };
  

  const handleSave = async (data: Omit<News, 'id' | 'createdAt'>) => {
    if (id) {
      await updateNews(id, data);
      const updated = await getNewsById(id);
      setNews(updated ?? null);
    }
    setEditOpen(false);
  };

  if (!news) return <Spinner />;

  return (
    <div>
        <Navbar
  onEdit={() => setEditOpen(true)}
  onDelete={() => setConfirmDeleteOpen(true)}
/>

<Container sx={{ mt: 4 }}>
  <Grid container spacing={4}>
    {/* Detalle principal */}
      <Typography variant="h4" gutterBottom>{news.title}</Typography>
      {news.image && (
        <img src={news.image} alt={news.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
      )}
      <Typography variant="h6" color="text.secondary">{news.subtitle}</Typography>
      <Typography variant="subtitle2" color="text.secondary">Por {news.author}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>{news.description}</Typography>

    {/* Lista sugerida */}
      <Typography variant="h6" gutterBottom>Otras noticias</Typography>
      <SuggestedNewsList news={getSuggestedNews()} onSelect={(n) => navigate(`/news/${n.id}`)} />
  </Grid>
</Container>
    </div>
  );
};
