import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';

import { requestPostDetails } from 'redux/postsSlice';
import WithAuthRedirect from 'hoc/WithAuthRedirect';

const PostComments = lazy(() => import('./PostComments'));


function PostDetails() {
  const dispatch = useDispatch();
  const postDetails = useSelector(state => state.posts.postDetails);
  const isLoading = useSelector(state => state.posts.isLoading);
  const error = useSelector(state => state.posts.error);
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    dispatch(requestPostDetails(postId));
  }, [postId, dispatch]);

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

export default WithAuthRedirect(PostDetails, "/register");
