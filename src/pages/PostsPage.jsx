import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';

import { fetchPostDetails } from 'services/api';

import css from '../App.module.scss';

function SearchPostsPage() {
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query'); // 33

  const searchRef = useRef();

  const getPostsBySearchTerm = async (searchTerm) => {
    try {
      setIsLoading(true);
      const post = await fetchPostDetails(searchTerm);

      setSearchedPosts([post]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(!query) return;

    getPostsBySearchTerm(query);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchParams({ query: searchRef.current.value });
    // getPostsBySearchTerm(searchRef.current.value);
    searchRef.current.value = '';
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={searchRef} type="text" placeholder='Enter postId' required/>
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

export default SearchPostsPage;
