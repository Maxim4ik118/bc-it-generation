import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';


import css from '../App.module.scss';
import { getContactsRequest } from 'redux/contactSlice';

// UI - User Interface(React)
function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts);
  const isLoading = useSelector(state => state.phonebook.isLoading);
  const error = useSelector(state => state.phonebook.error);
  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    if(userData == null) return;

    dispatch(getContactsRequest());
  }, [userData, dispatch]); // componentDidMount

  const hasError = error?.length > 0;
  return (
    <>
      {hasError && <ErrorIndicator error={error} />}
      <div className={css.mainWrapper}>
        <div className={css.list}>
          <h2>Contacts</h2>
          {isLoading && <Loader />}
          {/* {Array.isArray(posts) &&
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
            })} */}
        </div>
      </div>
    </>
  );
}

export default ContactsPage;
