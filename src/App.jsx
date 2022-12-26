import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';
import Details from 'components/Details/Details';
// import Details from 'components/Details/Details';

import useSelectPost from 'hooks/useSelectPost';
import useToggle from 'hooks/useToggle';
import { fetchPosts } from 'services/api';

import css from './App.module.scss';
import useResizeScreen from 'hooks/useResizeScreen';

const styles = {
  color: '#010101',
};

// const productData = [
//   {
//     id: 1,
//     img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
//     price: 10.99,
//     title: 'Taco XXL',
//     discount: {
//       value: 17,
//     },
//   },
//   {
//     id: 2,
//     img: 'https://images.unsplash.com/photo-1668534576765-d9fa656e26c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
//     price: 11.99,
//     title: 'Taco 2XXL',
//     discount: {
//       value: 23,
//     },
//   },
//   {
//     id: 3,
//     img: 'https://plus.unsplash.com/premium_photo-1663924749013-7259f695b183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
//     price: 7.77,
//     title: 'Taco XS',
//   },
//   {
//     id: 4,
//     img: 'https://images.unsplash.com/photo-1667684550432-35d19dd88940?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8cVBZc0R6dkpPWWN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
//     price: 6.66,
//     title: 'Taco M',
//   },
// ];

/*
Рефи: 
1. Коли потрібно реагувати на фокус/блюр/виділення елементу
2. Коли потрібно дістатися до властивостей HTML-елементу (value, styles, src, innerText, innerHTML)
3. При інтеграції бібліотек, які працюють з DOM(Vanilla js)
4. Коли нам потрібно зберегти значення між рендерами(setInterval, setTimeout)
*/

/*
Кастомні хуки:
1. Винесення логіки в окреме місці
2. Перевикористання одноманітною логіки в різних компонентах
3. Розбити компонент на якісь функціональні частини, щоб він 
не роздувався і його можна було легко підтримувати і масштабувати
*/
export const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isMobile, isTablet } = useResizeScreen();

  const {
    selectedPostId,
    setSelectedPostId,
    comments,
    isLoadingComments,
    commentsError,
  } = useSelectPost();

  const { visible, toggle } = useToggle();

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

  const onSelectPostId = postId => {
    setSelectedPostId(postId);
  };

  const hasError = error.length > 0;
  const hasCommentsError = commentsError.length > 0;
  return (
    <div style={styles}>
      <button onClick={toggle}>Toggle more details</button>
      {visible && <Details />}
      {hasError && <ErrorIndicator error={error} />}
      {hasCommentsError && <ErrorIndicator error={hasCommentsError} />}

      {isMobile && (
        <div className={css.mobileDetails}>
          <h3>Comments</h3>
          <p>PostId: {selectedPostId}</p>
          {comments?.length === 0 && (
            <p>
              There are no comments for current post. Please selecte another
              one.
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
      )}

      <div className={`${css.mainWrapper} ${isMobile ? css.mobile : ''}`}>
        <div className={css.list}>
          <h2>Posts</h2>
          {isLoading && <Loader />}
          {isLoadingComments && <Loader />}
          {Array.isArray(posts) &&
            posts.map(post => {
              return (
                <div
                  key={post.id}
                  className={css.postItem}
                  onClick={() => onSelectPostId(post.id)}
                >
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              );
            })}
        </div>
        {!isMobile && isTablet && (
          <div className={css.details}>
            <h3>Comments</h3>
            <p>PostId: {selectedPostId}</p>
            {comments?.length === 0 && (
              <p>
                There are no comments for current post. Please selecte another
                one.
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
        )}
      </div>
    </div>
  );
};
