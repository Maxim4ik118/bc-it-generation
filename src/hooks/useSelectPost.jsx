import { useEffect, useState } from 'react';
import { fetchPostComments } from 'services/api';

function useSelectPost() {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');

  const getPostComments = async selectedPostId => {
    try {
      setIsLoadingComments(true);
      const comments = await fetchPostComments(selectedPostId);

      setComments(comments);
    } catch (error) {
      setCommentsError(error.message);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    if (selectedPostId === null) return;

    getPostComments(selectedPostId);
  }, [selectedPostId]);

  return {
    selectedPostId,
    setSelectedPostId,
    comments,
    isLoadingComments,
    commentsError,
  };
}

export default useSelectPost;
