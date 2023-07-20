import React, { ChangeEvent } from 'react';
import styles from './input.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { InputIcon } from './InputIcon';

interface IInputProps {
  type: string,
  name: string,
  id: string,
  label: string,
  value: string,
  isValid: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export function Input({ type, name, id, label, value, isValid, onChange }: IInputProps) {
  const [visible, setVisible] = React.useState(false);
  const [inputType, setInputType] = React.useState(type);

  React.useEffect(() => {
    if (type === 'password' && inputType === 'password' && visible) setInputType('text');
    if (type === 'password' && inputType === 'text' && !visible) setInputType('password');
  }, [visible])

  function hendleToggleVisible() {
    if (type === 'password') setVisible(!visible);
  }

  return (
    <>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          type={inputType}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          aria-invalid={isValid ? undefined : true}
        />
        {type === 'password' && <InputIcon
          toggleVisible={hendleToggleVisible}
          isVisible={visible}
          localClassName={styles.inputIcon}
        />}
      </div>
    </>

  );
}
