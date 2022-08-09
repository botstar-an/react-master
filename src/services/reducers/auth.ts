import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import authService from "../auth.service";

const fetchUserInfo = createAsyncThunk(
  'users/fetchUserInfo',
  async () => {
    const user = await authService.retrieveUserInfo();

    return user;
  }
);

interface AuthState {
  user: User;
  isProcessing: boolean;
}
const initialState : AuthState = {
  user: null,
  isProcessing: true
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isProcessing = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isProcessing = false;
    });
  }
});

export const { setUser } = authSlice.actions;

export {
  fetchUserInfo
};

export default authSlice.reducer;
