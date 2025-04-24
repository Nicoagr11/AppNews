import React, { useEffect, useState } from 'react';
import { getNews, createNews } from '../api/newsService';
import { News } from '../types/news';
import { NewsList } from '../components/NewsList';
import { Navbar } from '../components/Navbar';
import { NewsModal } from '../components/NewsModal';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner'; // importar
import { Typography } from '@mui/material';
import { HighlightedNews } from '../components/HighlightedNews';
import { SuggestedNewsList } from '../components/SuggestedNewsList';
import { NewsCarousel } from '../components/NewsCarousel';
import { getRandomNews } from '../utils/getRandomNews';

export const Home: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // nuevo estado
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

  const handleSave = async (data: Omit<News, 'id' | 'createdAt'>) => {
    await createNews(data);
    loadNews(); // recargar noticias
  };

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
    </div>
  );
};
