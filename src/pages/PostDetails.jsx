import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import { fetchPostDetails } from 'services/api';

// import PostComments from './PostComments';

const PostComments = lazy(() => import('./PostComments'));

function PostDetails() {
  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    const getPostDetails = async postId => {
      try {
        setIsLoading(true);
        const postDetails = await fetchPostDetails(postId);

        setPostDetails(postDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPostDetails(postId);
  }, [postId]);

  return (
    <div>
      <h1>PostDetails</h1>

      {isLoading && <Loader />}
      {error && <ErrorIndicator error={error} />}
      {postDetails !== null && (
        <div>
          <p>
            <b>userId</b>: {postDetails.userId}
          </p>
          <p>
            <b>id</b>: {postDetails.id}
          </p>
          <p>
            <b>title</b>: {postDetails.title}
          </p>
          <p>
            <b>body</b>: {postDetails.body}
          </p>
        </div>
      )}

      <Link to="comments">Comments</Link>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="comments" element={<PostComments />} />
        </Routes>
      </Suspense>

    </div>
  );
}

export default PostDetails;
