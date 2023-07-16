import React from 'react'
import style from './Pagination.module.css'
import { BiSolidLeftArrowSquare, BiSolidRightArrowSquare } from 'react-icons/bi'

function Pagination({ currentPage, totalPages, handlePageChange }) {

    const isLeftButtonDisabled = currentPage === 0;
  const isRightButtonDisabled = currentPage === totalPages - 1;

  return (
    <div className={style.pageNavigation}>
        <button
        className={`${style.navigationButton} ${isLeftButtonDisabled ? style.disabledButton : ''}`}
        disabled={isLeftButtonDisabled}
        onClick={() => handlePageChange(currentPage - 1)}
        >
            <BiSolidLeftArrowSquare />
        </button>
        <span style={{transform: 'translateY(-1.5px)',color:"var(--primary-light)", fontSize: '.8rem', userSelect:"none"}}>{`Page ${currentPage + 1} ${
            totalPages === 1 ? "of 1" : `of ${totalPages}`
        }`}</span>
        <button
        className={`${style.navigationButton} ${isRightButtonDisabled ? style.disabledButton : ''}`}
        disabled={isRightButtonDisabled}
        onClick={() => handlePageChange(currentPage + 1)}
        >
            <BiSolidRightArrowSquare />
        </button>
    </div>
  )
}

export default Pagination