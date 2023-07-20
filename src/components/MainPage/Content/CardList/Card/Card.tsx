import React from 'react';
import styles from './card.css';
import { IUser } from '../../../../../store/reducers/usersReducer';
import { Like } from './Like';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { likeSlice } from '../../../../../store/reducers/likeReducer';

interface ICardProps {
  user: IUser,
  id: number,
  onClick: (id: number) => void
}

export function Card({ user, id, onClick }: ICardProps) {
  const likeList = useAppSelector(state => state.like);
  const dispatch = useAppDispatch();

  function getLike() {
    const like = likeList.findIndex(item => item.id === id);

    if (like !== -1) {
      return true;
    } else {
      return false;
    }
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    const currentLike = likeList.findIndex(item => item.id === id);
    if (currentLike !== -1) {
      dispatch(likeSlice.actions.delLike(id));
    } else {
      dispatch(likeSlice.actions.addLike({id}));
    }
  }


  return (
    <li className={styles.users_list_item} onClick={() => onClick(id)}>
      <article className={styles.card}>
        <img src={user.avatar} className={styles.avatar} alt="avatar" />
        <h2 className={styles.card_title}>{`${user.first_name} ${user.last_name}`}</h2>
      </article>
      <Like like={getLike()} onClick={handleClick}/>
    </li>
  );
}
