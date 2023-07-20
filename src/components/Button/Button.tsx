import React from 'react';
import styles from './button.css';

interface IButtonProps {
  text: string,
  classNameLocal?: string,
  onClick?: () => void,
}

export function Button({ text, classNameLocal, onClick }: IButtonProps) {
  return (
    <button
      className={[styles.button, classNameLocal].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
