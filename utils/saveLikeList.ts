import { ILikeListItem } from "../src/store/reducers/likeReducer";

export function saveLikeList(list: ILikeListItem[]) {
  localStorage.setItem('LikeList', JSON.stringify(list));
}
