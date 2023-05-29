/** @format */

import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export const Index: React.FC = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src="/img/users/1.png" />
        <div className={styles.form}>
          <TextField label="Write a comment" variant="outlined" maxRows={10} multiline fullWidth />
          <Button variant="contained">Send</Button>
        </div>
      </div>
    </>
  );
};
