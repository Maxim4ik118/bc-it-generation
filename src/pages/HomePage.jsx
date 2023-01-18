import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';

import { requestPosts } from 'redux/postsSlice';

import css from '../App.module.scss';

// UI - User Interface(React)
function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const isLoading = useSelector(state => state.posts.isLoading);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    dispatch(requestPosts());
  }, [dispatch]); // componentDidMount

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
                  to={`/posts/${post.id}`}
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
