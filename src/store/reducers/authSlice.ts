import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { nanoid } from 'nanoid';
import { IFormValues } from '../../components/Auth';


export interface IAuth {
  token: string,
  id: number,
  loading: boolean,
  authError: string
}


// Define the initial state using that type
const initialState: IAuth = {
  token: JSON.parse(localStorage.getItem('authToken') || JSON.stringify('')),
  id: JSON.parse(localStorage.getItem('userId') || JSON.stringify('')),
  loading: false,
  authError: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authFetching: (state) => {
      state.loading = true;
    },
    authFetchingSuccess: (state, action: PayloadAction<IAuth>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.authError = '';
    },
    authFetchingError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.authError = action.payload;
    },
  },
})

// export const { nameReducer, emailReducer, passwordReducer, confPasswordReducer } = formSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const auth = (state: RootState) => state.auth

export default authSlice.reducer
