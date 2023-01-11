import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userData: null,
};

const userSlice = createSlice({
  // Ім'я слайсу
  name: 'user',
  // Початковий стан редюсера слайсу
  initialState: initialState,
  // Об'єкт редюсерів
  reducers: {
    login: (state, action) => {
      // some logic
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
export const { login } = userSlice.actions;
// Редюсер слайсу
export const userReducer = userSlice.reducer;
