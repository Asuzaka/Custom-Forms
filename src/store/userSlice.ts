import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../entities";

interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
    },
    setNoUser(state) {
      state.isLoading = false;
    },
    setUserLoading(state) {
      state.isLoading = true;
    },
  },
});

export const { setUser, logout, setNoUser, setUserLoading } = userSlice.actions;
export default userSlice.reducer;
