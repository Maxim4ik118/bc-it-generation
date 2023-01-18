import axios from 'axios';

const inctance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Функція сервіс
export const fetchPosts = async () => {
  const { data } = await inctance.get('/posts');

  return data;
};

export const fetchPostComments = async (postId = '1') => {
  const { data } = await inctance.get(`/posts/${postId}/comments`);

  return data;
};

export const fetchPostDetails = async (postId = '1') => {
  const { data } = await inctance.get(`/posts/${postId}`);

  return data;
};
