import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';

import { requestPostComments } from 'redux/postsSlice';

import css from '../App.module.scss';
import WithAuthRedirect from 'hoc/WithAuthRedirect';


function PostComments() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector(state => state.posts.comments);
  const isLoading = useSelector(state => state.posts.isLoading);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (!postId) return;

    dispatch(requestPostComments(postId));
  }, [postId, dispatch]);

  const hasCommentsError = error.length > 0;
  return (
    <div className={css.details}>
      {isLoading && <Loader />}
      {hasCommentsError && <ErrorIndicator error={hasCommentsError} />}
      <h3>Comments</h3>
      <p>PostId: {postId}</p>
      {comments?.length === 0 && (
        <p>
          There are no comments for current post. Please selecte another one.
        </p>
      )}
      {Array.isArray(comments) &&
        comments.map(({ id, name, email, body }) => {
          return (
            <div key={id} className={css.comment}>
              <h4>Name: {name}</h4>
              <p>
                <b>Email:</b> {email}
              </p>
              <p>
                <b>Body:</b> {body}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default WithAuthRedirect(PostComments, "/register");
