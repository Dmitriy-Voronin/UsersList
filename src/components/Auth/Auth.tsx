import React, { ChangeEvent, FormEvent } from 'react';
import styles from './auth.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Input } from './Input';
import { authSlice } from '../../store/reducers/authSlice';
import { fetchAuth } from '../../store/reducers/ActionCreators';
import { AuthSpinner } from './AuthSpinner';
import { useNavigate } from 'react-router-dom';
import { usersSlice } from '../../store/reducers/usersReducer';

export interface IFormValues {
  username?: string,
  email: string,
  password: string,
  confirm_password?: string
}

export interface IFormErrors {
  username: string,
  email: string,
  password: string,
  confirm_password: string
}

const initialFormValue = {
  username: '',
  email: '',
  password: '',
  confirm_password: ''
}

export function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, authError } = useAppSelector(state => state.auth);
  const [formValues, setFormValues] = React.useState(initialFormValue);
  const [formErrors, setFormErrors] = React.useState<IFormErrors>({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [isSubmit, setIsSubmit] = React.useState(false);

  React.useEffect(() => {
    console.log((Object.values(formErrors).every(value => value === '')));
    if (Object.values(formErrors).every(value => value === '') && isSubmit) {
      setFormValues(initialFormValue);
      setIsSubmit(false);
      const authData = {
        email: formValues.email,
        password: formValues.password
      };
      dispatch(usersSlice.actions.usersClean());
        dispatch(fetchAuth(authData)).then(e => navigate('/users/page/1', {replace: true}));

    } else return;
  }, [isSubmit]);

  function btnClassName() {
    if (loading && Object.values(formErrors).every(value => value === '')) {
      return [styles.btn, styles.btn_loading].join(' ');
    }
      return styles.btn
    }


  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
    setIsSubmit(false);
    dispatch(authSlice.actions.authFetchingError(''))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formValues));
  }

  const validate = (values: IFormValues) => {
    const errors = formErrors;
    const regex = /[\w\d]+@[\w\d]+\.\w+/;

    if (!values.username) {
      errors.username = "Поле обязательно для заполнения!";
    } else if (values.username.length < 3) {
      errors.username = 'Имя должно быть не короче 3 символов!'
    }

    if (!values.email) {
      errors.email = "Поле обязательно для заполнения!";
    } else if (!regex.test(values.email)) {
      errors.email = "Неверный формат!";
    }

    if (!values.password) {
      errors.password = "Поле обязательно для заполнения!";
    } else if (values.password.length < 4) {
      errors.password = "Пароль должен быть не короче 4 символов";
    } else if (values.password.length > 16) {
      errors.password = "Пароль должен быть не длиннее 16 символов";
    }

    if (values.password && !formErrors.password && !values.confirm_password) {
      errors.confirm_password = "Поле обязательно для заполнения!";
    } else if (values.password && !formErrors.password && values.password !== values.confirm_password) {
      errors.confirm_password = "Пароли не совпадают!";
    }
    return errors;
  }

  return (
    <div className={styles.auth_container}>
      <div className={styles.authWrap}>
        <div className={styles.auth}>
          <form action="" className={styles.form} onSubmit={handleSubmit}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Регистрация</legend>
              <Input
                type={'text'}
                name={'username'}
                id={'username'}
                label={'Имя'}
                onChange={handleChange}
                value={formValues.username}
                isValid={formErrors.username ? false : true}
              />
              {formErrors.username && <span className={styles.error}>{formErrors.username}</span>}
              <Input
                type={'text'}
                name={'email'}
                id={'email'}
                label={'Электронная почта'}
                onChange={handleChange}
                value={formValues.email}
                isValid={formErrors.email ? false : true}
              />
              {formErrors.email && <span className={styles.error}>{formErrors.email}</span>}
              <Input
                type={'password'}
                name={'password'}
                id={'password'} label={'Пароль'}
                onChange={handleChange}
                value={formValues.password}
                isValid={formErrors.password ? false : true}
              />
              {formErrors.password && <span className={styles.error}>{formErrors.password}</span>}
              <Input
                type={'password'}
                name={'confirm_password'}
                id={'confirm_password'}
                label={'Подтвердите пароль'}
                onChange={handleChange}
                value={formValues.confirm_password}
                isValid={formErrors.confirm_password ? false : true}
              />
              {formErrors.confirm_password && <span className={styles.error}>{formErrors.confirm_password}</span>}
            </fieldset>
            <div className={styles.btnWrap}>
              <button type="submit" disabled={loading} className={btnClassName()}>
                {loading && (Object.values(formErrors).every(value => value === ''))
                  ?
                  <AuthSpinner className={styles.spinner}/>
                  :
                  'Зарегистрироваться'
                }
              </button>
              {authError && <span className={styles.error}>{authError}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
