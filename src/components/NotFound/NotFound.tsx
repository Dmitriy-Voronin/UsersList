import React from 'react';
import styles from './notfound.css';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux';
import { usersSlice } from '../../store/reducers/usersReducer';




export function NotFound() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClick() {
    navigate('/');
    dispatch(usersSlice.actions.usersFetchingError(''))
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>СТРАНИЦА НЕ НАЙДЕНА</h1>
      <Button classNameLocal={styles.btn} text='На главную' onClick={handleClick}/>
    </div>
  );
}
