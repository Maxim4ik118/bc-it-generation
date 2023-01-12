import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from 'redux/products/productsSlice';

function ProductForm() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountValue, setDiscountValue] = useState('');
  const dispatch = useDispatch();

  const onChange = ({ target: { value, name, checked } }) => {
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'hasDiscount':
        setHasDiscount(checked);
        break;
      case 'discountValue':
        setDiscountValue(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = event => {
    event.preventDefault();

    const newProduct = {
      id: nanoid(),
      title,
      price: Number.parseInt(price),
      img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640',
      ...(hasDiscount && {
        discount: { value: Number.parseFloat(discountValue) },
      }),
    };

    dispatch(addProduct(newProduct));

    setTitle('');
    setPrice('');
    setHasDiscount(false);
    setDiscountValue('');
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <strong>Ім'я:</strong>
        <br />
        <input
          required
          type="text"
          name="title"
          value={title}
          onChange={onChange}
        />
      </label>
      <br />
      <br />
      <label>
        <strong>Ціна:</strong>
        <br />
        <input
          required
          type="text"
          name="price"
          value={price}
          onChange={onChange}
        />
      </label>
      <br />
      <br />
      <label>
        <strong>Чи присутня знижка?</strong>
        <br />
        <input
          type="checkbox"
          name="hasDiscount"
          checked={hasDiscount}
          onChange={onChange}
        />
      </label>
      <br />
      <br />
      {hasDiscount && (
        <label>
          <strong>Знижка:</strong>
          <br />
          <input
            type="text"
            name="discountValue"
            value={discountValue}
            onChange={onChange}
          />
        </label>
      )}
      <br />
      <br />
      <button type="submit">Додати продукт</button>
    </form>
  );
}

export default ProductForm;
