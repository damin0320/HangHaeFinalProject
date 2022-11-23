import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessToken = localStorage.getItem("Access_Token");
const refreshToken = localStorage.getItem("Refresh_Token");

export const __getObjectionDetail = createAsyncThunk(
  "objectionDetails/__getObjectionDetail",
  async (payload, thunkAPI) => {
    console.log("겟오브젝션디테일 되나");
    try {
      console.log("payloadpayloadpayload", payload);
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/issue/detail/${payload}`,
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

export const __addObjectionComment = createAsyncThunk(
  "objectionDetails/__addObjectionComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/issue/comment/${payload.id}`,
        payload.comment,
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

export const __deleteObjectionComment = createAsyncThunk(
  "objectionDetails/__deleteObjectionComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/issue/comment/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      if (data.data === "댓글 삭제 성공") {
        console.log("삭제 성공");
        return thunkAPI.fulfillWithValue(payload);
      }
      console.log("삭제 성공 인데 메시지 이상? ");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __CartInObjection = createAsyncThunk(
  "objectionDetails/__CartInObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/issue/likes/${payload}`,
        "",
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      if (data.data === "찜 성공") {
        return thunkAPI.fulfillWithValue({ islike: true, count: +1 });
      }
      return thunkAPI.fulfillWithValue({ islike: false, count: -1 });
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __CartOutObjection = createAsyncThunk(
  "objectionDetails/__CartOutObjection",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/issue/likes/${payload}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Access_Token: accessToken,
            Refresh_Token: refreshToken,
            "Cache-Control": "no-cache",
          },
        }
      );
      if (data.data === "찜 삭제") {
        return thunkAPI.fulfillWithValue({ islike: false, count: -1 });
      }
      return thunkAPI.fulfillWithValue({ islike: true, count: +1 });
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ObjectionDetailsSlice = createSlice({
  name: "objectionDetails",
  initialState: {
    post: { updateComment: false },
  },
  reducers: {},
  extraReducers: {
    //__getObjectionDetail
    [__getObjectionDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getObjectionDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getObjectionDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //comment 부분

    //__addObjectionComment
    [__addObjectionComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__addObjectionComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.comments.push(action.payload);
      state.post.updateComment = !state.post.updateComment;
      state.post = { ...state.post };
    },
    [__addObjectionComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__deleteObjectionComment
    [__deleteObjectionComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteObjectionComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.comments = state.post.comments.filter(
        (comment) => comment.issuesCommentId !== action.payload
      );
    },
    [__deleteObjectionComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__CartInObjection
    [__CartInObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__CartInObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.isLike = action.payload.islike;
      state.post.likeCnt = state.post.likeCnt + action.payload.count;
    },
    [__CartInObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__CartOutObjection
    [__CartOutObjection.pending]: (state) => {
      state.isLoading = true;
    },
    [__CartOutObjection.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post.isLike = action.payload.islike;
      state.post.likeCnt = state.post.likeCnt + action.payload.count;
    },
    [__CartOutObjection.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ObjectionDetailsSlice.reducer;
