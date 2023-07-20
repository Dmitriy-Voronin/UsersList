import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


// export interface IUser {
//   id: number,
//   email: string,
//   first_name: string,
//   last_name: string,
//   avatar: string
// }

export interface IUserAvatarState {
  avatar: string,
  loading: boolean,
  error: string
}


// Define the initial state using that type
const initialState: IUserAvatarState = {
  avatar: '',
  loading: false,
  error: ''
};

export const userAvatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    userAvatarFetching: (state) => {
      state.loading = true;
    },
    userAvatarFetchingSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.avatar = action.payload;
      state.error = '';
    },
    userAvatarFetchingError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
})

// export const { nameReducer, emailReducer, passwordReducer, confPasswordReducer } = formSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const avatar = (state: RootState) => state.avatar

export default userAvatarSlice.reducer
