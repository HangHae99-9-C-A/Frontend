import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../shared/Apis";

export const __getAddObjection = createAsyncThunk(
  "objections/__getAddObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getAddObjectionAX(payload);
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

export const __getObjection = createAsyncThunk(
  "objections/__getObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.getObjectionAX(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addObjection = createAsyncThunk(
  "objections/__addObjection",
  async (payload, thunkAPI) => {
    try {
      await Apis.addObjectionAX(payload).then((response) => {
        return thunkAPI.fulfillWithValue(response.data.data);
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteObjection = createAsyncThunk(
  "objections/__deleteObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.deleteObjectionAX(payload);

      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editObjection = createAsyncThunk(
  "objections/__editObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await Apis.editObjectionAX(payload);
      const payloadData = { ...payload, data: data.data };
      return thunkAPI.fulfillWithValue(payloadData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ObjectionsSlice = createSlice({
  name: "objections",
  initialState: {
    posts: [],
    postsCount: 0,
    getState: {
      categoryObj: "all",
      pageNumberObj: 0,
      pageSizeObj: 10,
      sortObj: "issuesId",
      searchObj: "",
    },

    HeaderState: {
      paramObj: "all",
      pageNumber: 0,
      pageSize: 10,
      postSort: "issuesId",
    },
    searchState: "",
  },
  reducers: {
    searchObjection(state, action) {
      state.getState = { ...state.getState, searchObj: action.payload };
    },
  },
  extraReducers: {
    //__getAddObjection
    [__getAddObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAddObjection.fulfilled]: (state, action) => {
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
    [__getAddObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__getObjection
    [__getObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__getObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.content;
      state.postsCount = action.payload.totalElements;
    },
    [__getObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__addObjection
    [__addObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__addObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
      alert("이의제기가 등록 되었습니다.");
      window.location.replace("/objectionread/all/issuesId");
    },
    [__addObjection.rejected]: (state, action) => {
      state.isLoading = false;
      alert("이의제기에 실패했습니다.");
      state.error = action.payload;
    },

    //__deleteObjection
    [__deleteObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post.issuesId !== action.payload
      );
      alert("삭제되었습니다.");
      window.location.replace("/objectionread/all/issuesId");
    },

    [__deleteObjection.rejected]: (state, action) => {
      state.isLoading = false;
      alert("삭제에 실패했습니다.");
      state.error = action.payload;
    },
    //__editObjection
    [__editObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__editObjection.fulfilled]: (state, action) => {
      state.isLoading = false;

      const indexId = state.posts.findIndex((post) => {
        if (post.issuesId == action.payload.data.issuesId) {
          return true;
        }
        return false;
      });
      state.posts[indexId] = action.payload.data;
      state.posts = [...state.posts];
      alert("수정되었습니다.");
      window.location.replace(`/ObjectionDetail/${action.payload.id}`);
    },
    [__editObjection.rejected]: (state, action) => {
      state.isLoading = false;
      alert("수정에 실패했습니다.");
      state.error = action.payload;
    },
  },
});

export const { searchObjection } = ObjectionsSlice.actions;

export default ObjectionsSlice.reducer;
