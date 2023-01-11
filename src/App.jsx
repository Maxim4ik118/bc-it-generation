import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Loader from 'components/Loader/Loader';

import Layout from 'Layout/Layout';
import { Product } from 'components/Product/Product';
import { setFilter } from 'redux/products/productsSlice';

const productData = [
  {
    id: 1,
    img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
    price: 10.99,
    title: 'Taco XXL',
    discount: {
      value: 17,
    },
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1668534576765-d9fa656e26c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    price: 11.99,
    title: 'Taco 2XXL',
    discount: {
      value: 23,
    },
  },
  {
    id: 3,
    img: 'https://plus.unsplash.com/premium_photo-1663924749013-7259f695b183?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    price: 7.77,
    title: 'Taco XS',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1667684550432-35d19dd88940?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8cVBZc0R6dkpPWWN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    price: 6.66,
    title: 'Taco M',
  },
];

export const App = () => {
  // const [products, setProducts] = useState(productData);
  const products = useSelector(state => state.products.products);
  const filterValue = useSelector(state => state.products.filter);
  const dispatch = useDispatch();
  // const promoProducts = useSelector(state => state.products.promoProducts);
  // const limitedProducts = useSelector(state => state.products.limitedProducts);

  return (
    <Layout>
      <input
        type="text"
        value={filterValue}
        onChange={e => dispatch(setFilter(e.target.value))}
      />
      {products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          image={product.img}
          title={product.title}
          price={product.price}
          discount={product.discount}
        />
      ))}
    </Layout>
  );
};
