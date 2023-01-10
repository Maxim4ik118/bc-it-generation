import axios from 'axios';

// Функція сервіс
export const fetchPosts = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return data;
};

export const fetchPostComments = async (postId = '1') => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  return data;
};

export const fetchPostDetails = async (postId = '1') => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  return data;
};
