/** @format */

import React from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { PostSkeleton } from '../components/Post/Skeleton';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type PostProps = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  _id: string;
  text: string;
  viewsCount: number;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
  };
  imageUrl: string;
};

export const FullPost: React.FC = () => {
  const [data, setData] = React.useState<PostProps>();
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Failed to get an article');
      });
  }, [id]);
  if (!data) {
    return <PostSkeleton />;
  }
  return (
    <>
      <Post
        id={data._id}
        nickname={data.nickname}
        realName={data.realName}
        originDescription={data.originDescription}
        superpowers={data.superpowers}
        catchPhrase={data.catchPhrase}
        imageUrl={data.imageUrl ? `http://localhost:7777${data.imageUrl}` : ''}
        user={data.user}
        createdAt={new Date(data.createdAt)}
        viewsCount={data.viewsCount}
        commentsCount={3}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Van Vong',
              avatarUrl: '/img/users/1.png',
            },
            text: 'This is a test commentary',
          },
          {
            user: {
              fullName: 'Ivan Ivanov',
              avatarUrl: '/img/users/2.png',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
