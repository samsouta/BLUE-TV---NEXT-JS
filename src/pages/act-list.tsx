import React, { useState } from 'react'
import ModelLoader from '@/src/components/ui/Loader/ModelLoader';
import Pangination from '@/src/components/ui/Pangination';
import { ActressType } from '@/src/types/actressType';
import { Avatar } from '@heroui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

type ActressProps = {
    currPage: number;
    Model: ActressType[];
    lastPage: number;
};

const ActressPage: React.FC<ActressProps> = ({
    currPage,
    Model,
    lastPage,
}) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(currPage);

    //// handle actress click
    const handleActressClick = (actress: { id: number; name: string }) => {
        const formattedName = actress.name.toLowerCase().replace(/\s+/g, '');
        router.push(`/act/${actress.id}/${formattedName}`);
    };

    // Handle page changes
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        router.push(`/act-list?page=${newPage}`);
    };

    // if model is empty show loader
    if (Model?.length === 0) {
        return (
            <div className="container mx-auto px-4 mt-24">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, index) => (
                        <ModelLoader key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 mt-24">
                <h2 className="text-2xl montserrat font-bold text-center text-[var(--light-blue)] mb-8">
                    All Model
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Model?.map((actress) => (
                        <div
                            key={actress.id}
                            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => handleActressClick(actress)}
                        >
                            <Avatar
                                isBordered
                                color="success"
                                src={actress.image_url || undefined}
                                name={actress.name || undefined}
                                className="w-32 h-32"
                                style={{ objectPosition: 'top', objectFit: 'fill' }}
                            />
                            <p className="mt-2 text-[var(--light-blue)] merriweather-regular text-center">
                                {actress.name}
                            </p>
                        </div>
                    ))}
                </div>


                <Pangination
                    lastPage={lastPage ? Number(lastPage) : undefined}
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange}
                />

            </div>
        </Layout>
    )
}

/**
 * 
 * server side props
 *
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    // get URL and page number
    const { page } = context.query;
    const currPage = page ? parseInt(page.toString()) : 1;

    // fetch each tags videos from API
    const res = await fetch(
        `https://bluetv.x10.mx/api/v1/actresses?page=${page}`
    );
    const data = await res.json();

    return {
        props: {
            currPage,
            Model: data?.data || [],
            lastPage: data?.last_page || 1,
        },
    };
};

export default ActressPage