import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../shared/Apis";

export const __getAddPost = createAsyncThunk(
  "posts/__getAddPost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getAddPostAX(payload);
      const obj = {
        getState: payload,
        data: data.data.content,
        totalElements: data.data.totalElements,
      };
      return thunkAPI.fulfillWithValue(obj);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPost = createAsyncThunk(
  "posts/__getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getPostAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addPost = createAsyncThunk(
  "posts/__addPost",
  async (payload, thunkAPI) => {
    try {
      await Apis.addPostAX(payload).then((response) => {
        return thunkAPI.fulfillWithValue(response.data.data);
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deletePost = createAsyncThunk(
  "posts/__deletePost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.deletePostAX(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editPost = createAsyncThunk(
  "posts/__editPost",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.editPostAX(payload);
      const payloadData = { ...payload, data: data.data };
      return thunkAPI.fulfillWithValue(payloadData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postsCount: 0,
    footerState: "Home",
    getState: {
      categoryObj: "all",
      pageNumberObj: 0,
      pageSizeObj: 10,
      sortObj: "postId",
      searchObj: "",
    },
  },
  reducers: {
    swichFooterState(state, action) {
      state.footerState = action.payload;
      state.getState = { ...state.getState, pageNumberObj: 0 };
    },

    searchPost(state, action) {
      state.getState = { ...state.getState, searchObj: action.payload };
    },
  },
  extraReducers: {
    //__getAddPost
    [__getAddPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAddPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload.getState.pageNumberObj === 0) {
        state.posts.splice(0);
        state.posts.push(...action.payload.data);
        state.postsCount = action.payload.totalElements;
        state.getState = action.payload.getState;
      } else {
        state.posts.push(...action.payload.data);
        state.postsCount = action.payload.totalElements;
        state.getState = action.payload.getState;
      }
    },
    [__getAddPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__getPost
    [__getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.content;
      state.postsCount = action.payload.totalElements;
    },
    [__getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__addPost
    [__addPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
      alert("게시물이 작성되었습니다.");
      window.location.replace("/postread/all/postId");
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
      alert("게시물 작성에 실패했습니다.");
      state.error = action.payload;
    },

    //__deletePost
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post.postId !== action.payload
      );
      alert("게시물이 삭제되었습니다.");
      window.location.replace("/postread/all/postId");
    },

    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      alert("게시물 삭제에 실패했습니다.");
      state.error = action.payload;
    },
    //__editPost
    [__editPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__editPost.fulfilled]: (state, action) => {
      state.isLoading = false;

      const paramId = state.posts.findIndex((post) => {
        if (post.postId == action.payload.data.postId) {
          return true;
        }
        return false;
      });
      state.posts[paramId] = action.payload.data;
      state.posts = [...state.posts];
      alert("게시물이 수정되었습니다.");
      window.location.replace(`/PostDetail/${action.payload.id}`);
    },
    [__editPost.rejected]: (state, action) => {
      state.isLoading = false;
      alert("게시물 수정에 실패했습니다.");
      state.error = action.payload;
    },
  },
});

export const {
  searchPost,
  swichHeaderBarState,
  swichFooterState,
  initialHeaderState,
} = PostsSlice.actions;
export default PostsSlice.reducer;
