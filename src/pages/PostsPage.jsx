import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { requestPostBySearchTerm } from 'redux/postsSlice';

import css from '../App.module.scss';
import WithAuthRedirect from 'hoc/WithAuthRedirect';

function SearchPostsPage() {
  const dispatch = useDispatch();
  const searchedPosts = useSelector(state => state.posts.searchedPosts);
  const isLoading = useSelector(state => state.posts.isLoading);
  const error = useSelector(state => state.posts.error);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query'); // 33

  const searchRef = useRef();

  useEffect(() => {
    if (!query) return;

    dispatch(requestPostBySearchTerm(query));
  }, [query, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();

    setSearchParams({ query: searchRef.current.value });
    // getPostsBySearchTerm(searchRef.current.value);
    searchRef.current.value = '';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Enter postId"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <ErrorIndicator error={error} />}
      <div className={css.mainWrapper}>
        <div className={css.list}>
          <h2>Searched posts by id:</h2>
          {isLoading && <Loader />}
          {Array.isArray(searchedPosts) &&
            searchedPosts.map(post => {
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
    </div>
  );
}

export default WithAuthRedirect(SearchPostsPage, "/login");
