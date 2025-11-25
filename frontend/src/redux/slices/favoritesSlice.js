import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Thunks
export const getPosts = createAsyncThunk("post/getPosts", async (_,thunkAPI) => {
    const {rejectWithValue}=thunkAPI
  try {
  const res = await fetch(API_URL);
  return await res.json();
   } catch (error) {
    return rejectWithValue(error.message)
  }
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async (title,thunkAPI) => {
        const {rejectWithValue}=thunkAPI
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify( title ),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
     } catch (error) {
    return rejectWithValue(error.message)
  }
  }
);

export const deletePost = createAsyncThunk("post/deletePost", async (id,thunkAPI) => {
     const {rejectWithValue}=thunkAPI
       try {
  const res = await fetch(API_URL + "/" + id, {
    method: "DELETE",
  });
  return await res.json();
    } catch (error) {
    return rejectWithValue(error.message)
  }
});

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ title, id },thunkAPI) => {
    const {rejectWithValue}=thunkAPI
        try {
    const res = await fetch(${API_URL}/${id}, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
      } catch (error) {
    return rejectWithValue(error.message)
  }
  }
);

// Initial state
const initialState = {
  posts: null,
  loading: false,
  error: null,
};

// Slice
const postSlice = createSlice({
  name: "post",
  initialState,
   reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...(state.posts || []), action.payload];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = (state.posts || []).filter(post => post.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = (state.posts || []).map(post => 
          post.id === action.payload.id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;