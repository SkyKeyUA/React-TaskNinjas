/** @format */

import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { useAppDispatch } from '../../redux/store';
import { fetchAuth } from '../../redux/auth/asyncActions';
import { useSelector } from 'react-redux';
import { selectAuthData } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useSelector(selectAuthData);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (user: { email: string; password: string }) => {
    dispatch(fetchAuth(user));
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Sign in to your account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'specify mail' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'specify your password' })}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Log in
        </Button>
      </form>
    </Paper>
  );
};
