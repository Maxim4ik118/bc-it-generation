import ErrorIndicator from 'components/ErrorIndicator';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerUserRequest } from 'redux/userSlice';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(state => state.auth.isLoading);
  const userData = useSelector(state => state.auth.userData);
  const error = useSelector(state => state.auth.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(userData !== null) navigate('/contacts');

  }, [userData, navigate])


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
        name,
        email,
        password,
    };

    dispatch(registerUserRequest(formData));
  }

  return (
    <div>
      <h1>Реєстрація</h1>
      {isLoading && <Loader />}
      {error && <ErrorIndicator error={error} />}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            required
          />
        </label>
        <label>
          Email:
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            required
          />
        </label>
        <label>
          Password:
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            required
          />
        </label>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}

export default RegisterPage;
