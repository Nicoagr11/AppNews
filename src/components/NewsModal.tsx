import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Divider,
} from '@mui/material';
import { News } from '../types/news';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<News, 'id'>) => void;
  initialData?: Omit<News, 'id'>;
};

export const NewsModal: React.FC<Props> = ({ open, onClose, onSave, initialData }) => {
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setImage(initialData.image || '');
      setAuthor(initialData.author || '');
      setTitle(initialData.title);
      setSubtitle(initialData.subtitle || '');
      setDescription(initialData.description || '');
    } else {
      setImage('');
      setAuthor('');
      setTitle('');
      setSubtitle('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    const baseData = { image, author, title, subtitle, description };
    const createdAt = initialData?.createdAt ?? new Date().toISOString(); // conservar si existe o generar nueva
  
    onSave({ ...baseData, createdAt }); // TypeScript feliz 😊
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          backgroundColor: '#ffffff',
          color: "orangered",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {initialData ? 'Editar Noticia' : 'Nueva Noticia'}
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
        <TextField
          label="URL de la imagen"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <TextField
          label="Autor"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Título"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Subtítulo"
          fullWidth
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <TextField
          label="Descripción"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', padding: '1.5rem' }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: "orangered", borderColor: "orangered" }}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "orangered" }}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
