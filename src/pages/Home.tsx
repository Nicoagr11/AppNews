import React, { useEffect, useState } from 'react';
import { getNews, createNews } from '../api/newsService';
import { News } from '../types/news';
import { NewsList } from '../components/NewsList';
import { Navbar } from '../components/Navbar';
import { NewsModal } from '../components/NewsModal';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner'; // importar
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import { HighlightedNews } from '../components/HighlightedNews';
import { SuggestedNewsList } from '../components/SuggestedNewsList';
import { NewsCarousel } from '../components/NewsCarousel';
import { getRandomNews } from '../utils/getRandomNews';

export const Home: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // nuevo estado
  const [saving, setSaving] = useState(false);
const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const navigate = useNavigate();

const handleSelect = (news: News) => {
  navigate(`/news/${news.id}`);
};

const loadNews = async () => {
    setLoading(true);
    const allNews = await getNews();
    setNews(allNews);
    setLoading(false);
  };
  useEffect(() => {
    loadNews();
  }, []);

  const handleCreate = () => {
    setModalOpen(true);
  };

  const handleSave = async (data: Omit<News, 'id'>) => {
    setSaving(true);
    await createNews(data);
    await loadNews(); // recargar noticias
    setSaving(false);
    setModalOpen(false);
    setSuccessDialogOpen(true); // mostrar confirmación
  };
  
  {saving && (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner />
    </div>
  )}
  

  return (
    <div>
      <Navbar onCreate={handleCreate} />
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem', display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 2 }}>
    <HighlightedNews news={news[0]} onSelect={handleSelect} />
  </div>

  {loading ? (
    <Spinner />
  ) : (
    <div style={{ flex: 1 }}>
    <SuggestedNewsList news={getRandomNews(news.slice(1), 3)} onSelect={handleSelect} />
  </div>
  )}
</div>

      <NewsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
      <NewsCarousel news={news.slice(1)} onSelect={handleSelect} />
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
  <DialogTitle>✅ Noticia creada exitosamente</DialogTitle>
  <DialogActions>
    <Button onClick={() => setSuccessDialogOpen(false)}>Cerrar</Button>
  </DialogActions>
</Dialog>

    </div>
    
  );
};
