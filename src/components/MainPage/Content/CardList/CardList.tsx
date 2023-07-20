import React from 'react';
import styles from './cardlist.css';
import { useAppSelector, useAppDispatch } from '../../../../hooks/redux';
import { fetchUser, fetchUsers } from '../../../../store/reducers/ActionCreators';
import { nanoid } from 'nanoid';
import { AuthSpinner } from '../../../Auth/AuthSpinner';
import { Card } from './Card';
import { useNavigate, useParams } from "react-router-dom";
import { IUser, usersSlice } from '../../../../store/reducers/usersReducer';


export function CardList() {
  const { num } = useParams();
  const { users, loading, error } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(Number(num));


  React.useEffect(() => {
    dispatch(fetchUsers(Number(num)));
    return () => {
      dispatch(usersSlice.actions.usersClean());
    };
  }, []);
  React.useEffect(() => {
    if (!loading) {
      if (error) navigate('/not-found');
    }
  }, [loading, error]);

  function handleClick(id: number) {
    navigate(`/users/${id}`);
  }

  function handleMore() {
    if (page === 2) {
      return;
    }
    setPage(Number(num) + 1);
    dispatch(fetchUsers(Number(num) + 1));
  }

  return (
    <div className={styles.users_list_wrap}>
      {loading &&
        <div className={styles.spinner_wrap}>
          <AuthSpinner className={styles.spinner} />
        </div>
      }
      {users &&
        <>
          <ul className={styles.users_list}>
            {users.map(user => (<Card onClick={handleClick} id={user.id} user={user} key={nanoid()} />))}
          </ul>
          <button onClick={handleMore} className={styles.btn}>
            Показать ещё
          </button>
        </>
      }
    </div>

  );
}

