import { createSlice } from '@reduxjs/toolkit';
import { noticeApi } from './fetchNotice';

const initialState = {
  noticesFinded: null
};

export const sliceNotice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    postToUserNotices(state, action) {
      return { ...state, noticesFinded: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(noticeApi.endpoints.getNoticeByWord.matchFulfilled, (state, { payload }) => {
      state.noticesFinded = payload.notices;
    });
  }
});

export const { postToUserNotice } = sliceNotice.actions;

export const noticeUserReducer = sliceNotice.reducer;

