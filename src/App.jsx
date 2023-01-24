import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import Layout from 'Layout/Layout';

import RegisterPage from 'pages/RegisterPage';
import LoginPage from 'pages/LoginPage';
// import ContactsPage from 'pages/ContactsPage';
import Loader from 'components/Loader/Loader';
import Card from 'components/Card/Card';

import { authUserRequest } from 'redux/userSlice';

// const HomePage = lazy(() => import('pages/HomePage'));
// const DetailsPage = lazy(() => import('pages/DetailsPage'));
const PageNotFound404 = lazy(() => import('pages/PageNotFound404'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));
// const PostsPage = lazy(() => import('pages/PostsPage'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    dispatch(authUserRequest());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:postId/*" element={<PostDetails />} />
          <Route path="/details" element={<DetailsPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<PageNotFound404 />} />
        </Routes>
      </Suspense>
      {/* <Card /> */}
    </Layout>
  );
};
