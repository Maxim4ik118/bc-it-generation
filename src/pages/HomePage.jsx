import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';

// import useSelectPost from 'hooks/useSelectPost';

import { fetchPosts } from 'services/api';

import css from '../App.module.scss';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const posts = await fetchPosts();

      setPosts(posts);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []); // componentDidMount

  const hasError = error.length > 0;
  return (
    <>
      {hasError && <ErrorIndicator error={error} />}
      <div className={css.mainWrapper}>
        <div className={css.list}>
          <h2>Posts</h2>
          {isLoading && <Loader />}
          {Array.isArray(posts) &&
            posts.map(post => {
              return (
                <Link
                  key={post.id}
                  className={css.postItem}
                  to={`/post/${post.id}`}
                >
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
