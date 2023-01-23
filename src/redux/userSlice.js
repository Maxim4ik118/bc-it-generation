import { UserAPI } from 'services/userApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const registerUserRequest = createAsyncThunk(
  'user/register',
  async (formData, thunkApi) => {
    try {
      const response = await UserAPI.register(formData);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUserRequest = createAsyncThunk(
  'user/login',
  async (formData, thunkApi) => {
    try {
      const response = await UserAPI.login(formData);
      localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: null,
  token: null,
  isLoading: false,
  error: null,
};
// BLL - business logic layer(Redux)
const userSlice = createSlice({
  // Ім'я слайсу
  name: 'user',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: builder =>
    builder
    // Register

      .addCase(registerUserRequest.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(registerUserRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login

      .addCase(loginUserRequest.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(loginUserRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const userReducer = userSlice.reducer;
