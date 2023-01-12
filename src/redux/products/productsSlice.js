import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
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
  ],
  filter: '',
};
const productsSlice = createSlice({
  // Ім'я слайсу
  name: 'products',
  // Початковий стан редюсера слайсу
  initialState: initialState,
  // Об'єкт редюсерів
  reducers: {
    removeProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    addProduct: (state, action) => {
      state.products = [action.payload, ...state.products];
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearAllProducts: (state, action) => {
      state.products = [];
    },
  },
});

/*
{
    type: "Винести сміття",
    payload: Корисне навантаження(дані),
} - action
*/

// Генератори екшенів(інструкцій)
export const { removeProduct, addProduct, setFilter, clearAllProducts } = productsSlice.actions;
// Редюсер слайсу
export const productsReducer = productsSlice.reducer;
