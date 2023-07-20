import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface IUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

export interface IUsersState {
  user: IUser | undefined,
  loading: boolean,
  error: string
}


// Define the initial state using that type
const initialState: IUsersState = {
  user: undefined,
  loading: false,
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching: (state) => {
      state.loading = true;
    },
    userFetchingSuccess: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    },
    userFetchingError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
})

// export const { nameReducer, emailReducer, passwordReducer, confPasswordReducer } = formSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const user = (state: RootState) => state.user

export default userSlice.reducer
