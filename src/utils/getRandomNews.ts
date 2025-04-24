import { News } from '../types/news';

export const getRandomNews = (news: News[], count: number): News[] => {
  const shuffled = [...news].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};