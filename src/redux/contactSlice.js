import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ContactsAPI } from 'services/userApi';

export const getContactsRequest = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    try {
      const response = await ContactsAPI.getContactsRequest();
      console.log('response: ', response);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: null,
  isLoading: false,
  error: null,
};
// BLL - business logic layer(Redux)
const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: builder =>
    builder
      // Get Contacts

      .addCase(getContactsRequest.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getContactsRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(getContactsRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),

});

export const contactsReducer = contactsSlice.reducer;
