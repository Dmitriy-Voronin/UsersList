import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice';
import usersReducer from './reducers/usersReducer';
import userReducer from './reducers/userReducer';
import userAvatarReduser from './reducers/avatarReducer';
import likeReducer from './reducers/likeReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    user: userReducer,
    avatar: userAvatarReduser,
    like: likeReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
