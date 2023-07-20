import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface IUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

export interface IUsers {
  users: IUser[],
  loading: boolean,
  error: string
}


// Define the initial state using that type
const initialState: IUsers = {
  users: [],
  loading: false,
  error: ''
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersClean: (state) => {
      state.users = [];
    },
    usersFetching: (state) => {
      state.loading = true;
    },
    usersFetchingSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.loading = false;
      state.users = state.users.concat(...action.payload);
      state.error = '';

    },
    usersFetchingError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
})

export const users = (state: RootState) => state.users

export default usersSlice.reducer
