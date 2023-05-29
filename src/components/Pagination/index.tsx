/** @format */

import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};
export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      previousLabel="<"
    />
  );
};
