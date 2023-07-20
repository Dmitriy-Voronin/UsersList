import React from 'react';
import styles from './notfoundauth.css';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom'




export function NotFoundAuth() {

  const navigate = useNavigate();

  function handleClick() {
    navigate('/auth', { replace: true });
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ПРОСМАТРИВАТЬ СПИСОК МОГУТ ТОЛЬКО ЗАРЕГЕСТРИРОВАННЫЕ ПОЛЬЗОВАТЕЛИ</h1>
      <Button classNameLocal={styles.btn} text='ЗАРЕГЕСТРИРОВАТЬСЯ' onClick={handleClick}/>
    </div>
  );
}
