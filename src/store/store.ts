import { configureStore } from "@reduxjs/toolkit";
import { api as Users } from "../shared/api/usersApi";
import { api as Auth } from "../shared/api/authApi";
import { api as Template } from "../shared/api/templateApi";
import { api as Forms } from "../shared/api/formsApi";
import { api as Search } from "../shared/api/searchApi";
import { api as Comment } from "../shared/api/commentApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [Users.reducerPath]: Users.reducer,
    [Auth.reducerPath]: Auth.reducer,
    [Template.reducerPath]: Template.reducer,
    [Forms.reducerPath]: Forms.reducer,
    [Search.reducerPath]: Search.reducer,
    [Comment.reducerPath]: Comment.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(Users.middleware)
      .concat(Auth.middleware)
      .concat(Template.middleware)
      .concat(Forms.middleware)
      .concat(Search.middleware)
      .concat(Comment.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
