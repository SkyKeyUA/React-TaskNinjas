/** @format */

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { Post } from '../components/Post';

import { PostSkeleton } from '../components/Post/Skeleton';
import { useAppDispatch } from '../redux/store';

import { fetchPostsPages } from '../redux/posts/asyncActions';
import { selectPostsData } from '../redux/posts/selectors';

import { selectAuthData } from '../redux/auth/selectors';
import { Pagination } from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { SearchPostsParams } from '../redux/posts/type';
import { setCurrentPage } from '../redux/posts/slice';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useSelector(selectAuthData);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { posts, statusPosts, totalPages, currentPage } = useSelector(selectPostsData);

  console.log(data?.userData?._id);
  const getPosts = () => {
    const axiosItems = async () => {
      dispatch(
        fetchPostsPages({
          currentPage: String(currentPage),
        }),
      );
    };
    axiosItems();
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [currentPage]);
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPostsParams;
      const currentPage = Number(params.currentPage);
      dispatch(setCurrentPage(currentPage));
      isSearch.current = true;
    }
  }, []);
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPosts();
    }

    isSearch.current = false;
  }, [currentPage]);
  const skeletons = [...new Array(5)].map((_, index) => <PostSkeleton key={index} />);
  const onChagnePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  console.log(posts, currentPage, totalPages);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {statusPosts === 'loading'
            ? skeletons
            : posts.map((obj: any, index) => (
                <Post
                  key={index}
                  id={obj._id}
                  nickname={obj.nickname}
                  realName={obj.realName}
                  originDescription={obj.originDescription}
                  superpowers={obj.superpowers}
                  catchPhrase={obj.catchPhrase}
                  imageUrl={obj.imageUrl ? `http://localhost:7777${obj.imageUrl}` : ''}
                  user={obj.user}
                  createdAt={new Date(obj.createdAt)}
                  viewsCount={obj.viewsCount}
                  commentsCount={2}
                  isEditable={data?.userData?._id === obj.user._id}
                />
              ))}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChangePage={onChagnePage}
          />
        </Grid>
      </Grid>
    </>
  );
};
