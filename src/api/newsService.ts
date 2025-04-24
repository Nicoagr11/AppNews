import { News } from "../types/news.d";
import { v4 as uuidv4 } from "uuid";

let newsList: News[] = [
    {
      id: uuidv4(),
      title: "Noticia inicial",
      subtitle: "Subtítulo inicial de prueba",
      author: "Redacción",
      image: "https://via.placeholder.com/600x300.png?text=Imagen+de+noticia",
      description: "Este es el contenido de prueba para una noticia.",
      createdAt: new Date().toISOString(),
    },
  ];
  

export const getNews = (): Promise<News[]> => Promise.resolve(newsList);

export const getNewsById = (id: string): Promise<News | undefined> =>
  Promise.resolve(newsList.find((n) => n.id === id));

export const createNews = (
  news: Omit<News, "id" | "createdAt">
): Promise<News> => {
  const newItem: News = {
    ...news,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  newsList.push(newItem);
  return Promise.resolve(newItem);
};

export const updateNews = (
  id: string,
  updates: Partial<News>
): Promise<News | undefined> => {
  const index = newsList.findIndex((n) => n.id === id);
  if (index !== -1) {
    newsList[index] = { ...newsList[index], ...updates };
    return Promise.resolve(newsList[index]);
  }
  return Promise.resolve(undefined);
};

export const deleteNews = (id: string): Promise<void> => {
  newsList = newsList.filter((n) => n.id !== id);
  return Promise.resolve();
};
