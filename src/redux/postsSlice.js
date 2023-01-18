import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPostComments, fetchPostDetails, fetchPosts } from 'services/api';

// DAL - data access layer(Redux-thunk)
export const requestPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, thunkApi) => {
    try {
      const posts = await fetchPosts();

      return posts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const requestPostBySearchTerm = createAsyncThunk(
  'posts/requestPostBySearchTerm',
  async (searchTerm, thunkApi) => {
    try {
      const post = await fetchPostDetails(searchTerm);

      return [post];
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const requestPostDetails = createAsyncThunk(
  'posts/requestPostDetails',
  async (postId, thunkApi) => {
    try {
      const post = await fetchPostDetails(postId);

      return post;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const requestPostComments = createAsyncThunk(
  'posts/requestPostComments',
  async (postId, thunkApi) => {
    try {
      const comments = await fetchPostComments(postId);

      return comments;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [], // state.posts.posts
  searchedPosts: [],
  comments: [],
  postDetails: null,
  isLoading: false,
  error: '',
};
// BLL - business logic layer(Redux)
const postsSlice = createSlice({
  // Ім'я слайсу
  name: 'posts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    setFilter(state, action) {
        state.filter = action.payload;
    }
  },
  extraReducers: builder =>
    builder
      .addCase(requestPosts.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(requestPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(requestPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Posts By Search Query
      .addCase(requestPostBySearchTerm.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(requestPostBySearchTerm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchedPosts = action.payload;
      })
      .addCase(requestPostBySearchTerm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Post Details By Id
      .addCase(requestPostDetails.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(requestPostDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postDetails = action.payload;
      })
      .addCase(requestPostDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Post Comments By Id
      .addCase(requestPostComments.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(requestPostComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(requestPostComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
});

// Генератори екшенів
// export const { setFilter } = postsSlice.actions;
// Редюсер слайсу
export const postsReducer = postsSlice.reducer;
