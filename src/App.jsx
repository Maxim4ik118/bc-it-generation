import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'components/Loader/Loader';

// import HomePage from 'pages/HomePage';
// import DetailsPage from 'pages/DetailsPage';
// import PageNotFound404 from 'pages/PageNotFound404';
// import PostDetails from 'pages/PostDetails';
// import PostsPage from 'pages/PostsPage';

import Layout from 'Layout/Layout';
import RegisterPage from 'pages/RegisterPage';
import LoginPage from 'pages/LoginPage';
import ContactsPage from 'pages/ContactsPage';

// const HomePage = lazy(() => import('pages/HomePage'));
// const DetailsPage = lazy(() => import('pages/DetailsPage'));
const PageNotFound404 = lazy(() => import('pages/PageNotFound404'));
// const PostDetails = lazy(() => import('pages/PostDetails'));
// const PostsPage = lazy(() => import('pages/PostsPage'));

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

export const App = () => {
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
    </Layout>
  );
};
