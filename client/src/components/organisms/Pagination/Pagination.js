import React from "react";
import ReactPaginate from "react-paginate";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Pagination = ({
  total = 10,
  pagePerView = 5,
  currentPage = 0,
  onHandlePageChange,
}) => (
  <ReactPaginate
    containerClassName="pagination"
    pageClassName="pagination__pages"
    pageLinkClassName="pagination__pages--link"
    activeClassName="pagination__pages--active"
    pageRangeDisplayed={5}
    marginPagesDisplayed={5}
    pageCount={Math.ceil(total / pagePerView)}
    previousLabel={<IoMdArrowDropleft color="#323232" />}
    previousClassName="pagination__pages--action"
    nextLabel={<IoMdArrowDropright color="#323232" />}
    nextClassName="pagination__pages--action"
    initialPage={0}
    forcePage={currentPage}
    disabledClassName="pagination__pages--disabled"
    onPageChange={onHandlePageChange}
  />
);

export default Pagination;
