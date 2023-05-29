/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { useAppDispatch } from '../../redux/store';
import { fetchRemovePost } from '../../redux/posts/asyncActions';

interface PostProps {
  id: string;
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  createdAt: Date;
  imageUrl: string;
  user: {
    avatarUrl: string;
    fullName: string;
  };
  viewsCount: number;
  commentsCount: number;
  children?: React.ReactNode;
  isFullPost?: boolean;
  isEditable?: boolean;
}

export const Post: React.FC<PostProps> = ({
  id,
  nickname,
  realName,
  originDescription,
  superpowers,
  catchPhrase,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  children,
  isFullPost,
  isEditable,
}) => {
  const dispatch = useAppDispatch();
  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete the article?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <Link to={`/posts/${id}`}>
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            alt={nickname}
          />
        </Link>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt.toISOString()} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            Nickname:
            {isFullPost ? nickname : <Link to={`/posts/${id}`}> {nickname}</Link>}
          </h2>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            Real name:
            {isFullPost ? realName : <Link to={`/posts/${id}`}> {realName}</Link>}
          </h2>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            Description of origin:
            {isFullPost ? originDescription : <Link to={`/posts/${id}`}> {originDescription}</Link>}
          </h2>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            Superpowers:
            {isFullPost ? superpowers : <Link to={`/posts/${id}`}> {superpowers}</Link>}
          </h2>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            CatchPhrase:
            {isFullPost ? catchPhrase : <Link to={`/posts/${id}`}> {catchPhrase}</Link>}
          </h2>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
