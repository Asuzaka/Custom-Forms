import { configureStore } from "@reduxjs/toolkit";
import { api as Users } from "../shared/api/usersApi";
import { api as Auth } from "../shared/api/authApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [Users.reducerPath]: Users.reducer,
    [Auth.reducerPath]: Auth.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Users.middleware).concat(Auth.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
