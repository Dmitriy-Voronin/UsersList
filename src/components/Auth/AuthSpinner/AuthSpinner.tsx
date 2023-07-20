import React from 'react';
import styles from './authspinner.css';

interface ISpinnerProps {
  className?: string
}

export function AuthSpinner({ className }: ISpinnerProps) {
  return (
    <span className={[styles.spinner, className].join(' ')}></span>
  );
}
