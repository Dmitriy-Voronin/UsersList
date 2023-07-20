import { AppDispatch } from "../store";
import axios  from "axios";
import { IFormValues } from "../../components/Auth";
import { IAuth, authSlice } from "./authSlice";
import { IUser, usersSlice } from "./usersReducer";
import { userSlice } from "./userReducer";
import { userAvatarSlice } from "./avatarReducer";

export const fetchAuth = ({ email, password }: IFormValues) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetching())
    const response = await axios.post<IAuth>(
      'https://reqres.in/api/register',
      {
        email,
        password
      }
    );
    dispatch(authSlice.actions.authFetchingSuccess({
     token: response.data.token,
     id: response.data.id
    } as IAuth));
    localStorage.setItem('authToken', JSON.stringify(response.data.token));
    localStorage.setItem('userId', JSON.stringify(response.data.id));
  } catch (e: any) {
    if (e.response?.status && e.response.status === 400) {
      dispatch(authSlice.actions.authFetchingError(e.response.data.error))
    } else {
      dispatch(authSlice.actions.authFetchingError(e.message));
    }
  }
}

export const fetchUsers = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(usersSlice.actions.usersFetching())
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        const users = response.data.data as IUser[];
        dispatch(usersSlice.actions.usersFetchingSuccess(users));
        if (users.length === 0) dispatch(usersSlice.actions.usersFetchingError('Информация отсутствует!'));
    } catch (e: any) {
        dispatch(usersSlice.actions.usersFetchingError(e.message))
    }
}

export const fetchUser = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        dispatch(userSlice.actions.userFetchingSuccess(response.data.data));
    } catch (e: any) {
        dispatch(userSlice.actions.userFetchingError(e.message))
    }
}

export const fetchUserAvatar = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userAvatarSlice.actions.userAvatarFetching())
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        dispatch(userAvatarSlice.actions.userAvatarFetchingSuccess(response.data.data.avatar));
    } catch (e: any) {
        dispatch(userAvatarSlice.actions.userAvatarFetchingError(e.message))
    }
}

