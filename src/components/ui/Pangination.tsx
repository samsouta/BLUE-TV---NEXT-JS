import { Pagination } from '@heroui/react';
import React, { useCallback } from 'react'

type DataType = {
    lastPage: number | undefined;
    currentPage: number | undefined;
    setCurrentPage: (page: number) => void
}

const Pangination: React.FC<DataType> = ({ lastPage, currentPage, setCurrentPage }) => {

    const handlePageChange = useCallback((newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    }, [setCurrentPage]);


    return (
        <>
            {/* // Pagination */}
            <div className={`
                my-10 flex justify-center w-full`
            }>
                <Pagination
                    showControls
                    total={lastPage || 0}
                    initialPage={currentPage}
                    page={currentPage}
                    onChange={(page) => handlePageChange(page)}
                    classNames={{
                        cursor: 'text-[#ffffff]  bg-[var(--dark-blue)]',
                        item: " text-[var(--white)] bg-[var(--medium-blue)]  border-[var(--light-blue)]",
                        next: " bg-[var(--dark-blue)] text-[var(--white)]",
                        prev: " bg-[var(--dark-blue)] text-[var(--white)]",
                    }}
                />
            </div>
        </>
    )
}

export default React.memo(Pangination)