import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ContactsAPI } from 'services/userApi';

export const getContactsRequest = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    try {
      const response = await ContactsAPI.getContactsRequest();

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContactRequest = createAsyncThunk(
  'contacts/add',
  async (contactData, thunkApi) => {
    try {
      const response = await ContactsAPI.addContactRequest(contactData);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactRequest = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkApi) => {
    try {
      const response = await ContactsAPI.deleteContactRequest(contactId);

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

      .addCase(getContactsRequest.pending, state => {
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
      })

      // Add New Contact

      .addCase(addContactRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(addContactRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Contact

      .addCase(deleteContactRequest.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedContactId = action.payload.id;
        state.contacts = state.contacts.filter(
          contact => contact.id !== deletedContactId
        );
      })
      .addCase(deleteContactRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const contactsReducer = contactsSlice.reducer;
