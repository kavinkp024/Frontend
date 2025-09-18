import React from 'react';

const Pagination = ({ total, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className='button-style' >
      <button className='button-color' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      {pageNumbers?.map((pageNumber) => (
        <button 
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={pageNumber === currentPage ? 'active' : ''}
        >
          {pageNumber}
        </button>
      ))}
      <button  className='button-color'onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === total}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

