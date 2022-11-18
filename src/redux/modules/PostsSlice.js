import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  posts_state: [],
  isLoading: false,
};

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

//무한스크롤
export const nhInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {},
});

export const postApis = {
  
  postListAX: (page) =>
    nhInstance.get(
      `${process.env.REACT_APP_SERVER}/api/post?page=0&size=5`
    ),
    
};

export const __postList = createAsyncThunk(
  "postSlice/__postList",
  async (payload, thunkAPI) => {
    try {
      console.log('123123',payload)
      const res = await postApis.postListAX();
      console.log('__포스트리스트',res)
      // const curPage = payload * 10;

     
      return thunkAPI.fulfillWithValue(res.data.data);
      // .slice(curPage - 10, curPage)
    } 
    catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



//검색기능 미완성
export const __searchPost = createAsyncThunk(
  "posts/__searchPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/post`, {
        headers: {
          "Content-Type": `application/json`,
          Access_Token: accessToken,
          Refresh_Token: refreshToken,
          "Cache-Control": "no-cache",
        },
      });

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getPost = createAsyncThunk(
  "posts/__getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/post/category/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
    
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
      await axios
        .post(`${process.env.REACT_APP_SERVER}/api/post`, payload, {
          headers: {
            enctype: "multipart/form-data",
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        })
        .then((response) => {
       
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
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/post/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );

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
      
      const data = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/post/${payload.postId}`,
        payload.formData,
        {
          headers: {
            enctype: "multipart/form-data",
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
  
      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
    
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __CartPost = createAsyncThunk(
  "posts/__CartPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/likes/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
   
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
 
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const PostsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {},
  extraReducers: {
    //__searchPost
    [__searchPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__searchPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__searchPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__postList
    [__postList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__postList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(...action.payload);
      console.log('액션액션',...action)
      console.log('액션액션스테이트',state)
    },
    [__postList.rejected]: (state, action) => {
      state.isLoading = false;

    },

    //__getPost
    [__getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
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
    },
    [__addPost.rejected]: (state, action) => {
      state.isLoading = false;
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
    },

    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__editPost
    [__editPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__editPost.fulfilled]: (state, action) => {
      state.isLoading = false;

      const paramId = state.posts.findIndex((post) => {
        if (post.postId == action.payload.postId) {
          return true;
        }
        return false;
      });
      state.posts[paramId] = action.payload;

      state.posts = [...state.posts];
    },
    [__editPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__CartPost
    [__CartPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__CartPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__CartPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default PostsSlice.reducer;
