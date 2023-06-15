/** @format */

import React from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
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
  const imageUrl = `${process.env.REACT_APP_API_URL}${data?.imageUrl}`;
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
        imageUrl={data.imageUrl ? imageUrl : ''}
        user={data.user}
        createdAt={new Date(data.createdAt)}
        viewsCount={data.viewsCount}
        commentsCount={0}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
