import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';

import useSelectPost from 'hooks/useSelectPost';

import css from '../App.module.scss';

function PostComments() {
    const { postId } = useParams();

  const {
    selectedPostId,
    setSelectedPostId,
    comments,
    isLoadingComments,
    commentsError,
  } = useSelectPost();

  useEffect(() => {
    if(!postId) return;

    setSelectedPostId(postId);
  }, [setSelectedPostId, postId]);

  const hasCommentsError = commentsError.length > 0;
  return (
    <div className={css.details}>
      {isLoadingComments && <Loader />}
      {hasCommentsError && <ErrorIndicator error={hasCommentsError} />}
      <h3>Comments</h3>
      <p>PostId: {selectedPostId}</p>
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

export default PostComments;
