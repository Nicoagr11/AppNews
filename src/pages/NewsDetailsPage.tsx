import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById, deleteNews } from '../api/newsService';
import { News } from '../types/news';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { NewsModal } from '../components/NewsModal';

export const NewsDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getNewsById(id).then((data) => {
        if (data) setNews(data);
        else navigate('/'); // si no se encuentra, redirige
      });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (id) {
      await deleteNews(id);
      navigate('/');
    }
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  if (!news) return <Typography>Cargando...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Volver
      </Button>

      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      )}

      <Box mt={2}>
        <Typography variant="h4" gutterBottom>
          {news.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {news.subtitle}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          Por {news.author}
        </Typography>
        <Typography variant="body1" sx={{ mt: 3 }}>
          {news.description}
        </Typography>
      </Box>

      <Box mt={4} display="flex" gap={2}>
        <Button variant="outlined" color="primary" onClick={handleEdit}>
          Editar
        </Button>
        <Button variant="outlined" color="error" onClick={() => setConfirmDelete(true)}>
          Eliminar
        </Button>
      </Box>

      {/* Modal de edición */}
      <NewsModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={(data) => {
          // Lógica para actualizar
          setNews({ ...news, ...data });
          setEditModalOpen(false);
        }}
        initialData={news}
      />

      {/* Confirmación de borrado */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>¿Estás seguro de que querés eliminar esta noticia?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
