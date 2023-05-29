/** @format */

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Posts = {
  nickname: string;
  _id: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  viewsCount: number;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    _id: string;
  };
  imageUrl: string;
};

export interface PostsSliceState {
  posts: Posts[];
  statusPosts: Status;
  totalPages: number;
  currentPage: number;
}

export type SearchPostsParams = {
  currentPage: string;
};
export interface PostsPages {
  posts: Posts[];
  totalPages: number;
  currentPage: number;
}
