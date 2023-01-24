import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WithAuthRedirect from 'hoc/WithAuthRedirect';
import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';

import {
  addContactRequest,
  deleteContactRequest,
  getContactsRequest,
} from 'redux/contactSlice';

import css from '../App.module.scss';

// UI - User Interface(React)
function ContactsPage() {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.phonebook.contacts);
  const isLoading = useSelector(state => state.phonebook.isLoading);
  const error = useSelector(state => state.phonebook.error);
  const userData = useSelector(state => state.auth.userData);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (userData == null) return;

    dispatch(getContactsRequest());
  }, [userData, dispatch]); // componentDidMount

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      name,
      number,
    };

    dispatch(addContactRequest(formData));
    setName('');
    setNumber('');
  };
  const handleDeleteContact = contactId => {
    dispatch(deleteContactRequest(contactId));
  };

  const hasError = error?.length > 0;
  return (
    <>
      {hasError && <ErrorIndicator error={error} />}
      <div className={css.mainWrapper}>
        <div className={css.list}>
          {isLoading && <Loader />}
          <form onSubmit={handleSubmit}>
            <h3>Додати новий контакт</h3>
            <label>
              Name:
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
              />
            </label>
            <label>
              Number:
              <input
                value={number}
                onChange={e => setNumber(e.target.value)}
                type="text"
              />
            </label>
            <br />
            <br />
            <button disabled={isLoading} type="submit">
              Додати контакт
            </button>
          </form>
          <br />
          <h3>Список контактів</h3>
          {Array.isArray(contacts) && contacts.length === 0 && (
            <p>
              У вас відсутні контакти, додайте хочаб один для того, щоб їх
              побачити!
            </p>
          )}
          {Array.isArray(contacts) &&
            contacts.map(contact => {
              return (
                <div key={contact.id} className={css.postItem}>
                  <h3>{contact.name}</h3>
                  <p>{contact.number}</p>
                  <button
                    disabled={isLoading}
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

const ProtectedContactsPage = WithAuthRedirect(ContactsPage, "/login");

export default ProtectedContactsPage;
