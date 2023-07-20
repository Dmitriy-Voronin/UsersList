import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { nanoid } from 'nanoid';
import { saveLikeList } from '../../../utils/saveLikeList';
// import { IHandleBlur } from '../../components/Section/Todo/TodoList/TodoListItem';

export interface ILikeListItem {
  id: number
}

// Define the initial state using that type
const initialState: ILikeListItem[] = JSON.parse(localStorage.getItem('LikeList') || '[]');

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLike: (state, action: PayloadAction<ILikeListItem>) => {
      state.push(action.payload);
      saveLikeList(state);
    },
    delLike: (state, action: PayloadAction<number>) => {
     const index = state.findIndex(item => item.id === action.payload);
     state.splice(index, 1);
     saveLikeList(state);
    },
  },
})

// export const { increment, decrement, addTodo, upDateTodo, delTodo } = todoSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const like = (state: RootState) => state.like

export default likeSlice.reducer
