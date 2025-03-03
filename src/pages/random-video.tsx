import React, { useState } from 'react';
import Pangination from '../components/ui/Pangination';
import { GetServerSideProps } from 'next';
import { MovieResponseType } from '../types/MoviesType';
import VSkeleton from '../components/ui/Loader/VSkeleton';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import dynamic from 'next/dynamic';

// Lazy-load with SSR enabled
const VideoCard = dynamic(() => import('../components/ui/VideoCard'), {
    ssr: true, // For SEO support
});

type ApiResponse = {
    currPage: number;
    RandomVid: MovieResponseType[];
    lastPage: number;
};

const RandomVideo = ({ currPage, RandomVid, lastPage }: ApiResponse) => {
    const [currentPage, setCurrentPage] = useState(currPage);
    const router = useRouter();

    /**
     * handle random video detail page navigation
     */
    const handleDetailNavigation = (page: number) => {
        setCurrentPage(page);
        router.push(`/random-video?page=${page}`);
    };

    return (
        <Layout>
            <div className="mx-1 lg:mx-4">
                <div className="flex justify-center items-center">
                    <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold montserrat">
                        All Videos
                    </h1>
                </div>
                {RandomVid?.length === 0 ? (
                    [...Array(10)].map((_, index) => <VSkeleton key={index} />)
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                        {RandomVid?.map((item) => (
                            <VideoCard key={item?.id} data={item} actData={item?.actresses} />
                        ))}
                    </div>
                )}

                <Pangination lastPage={lastPage} currentPage={currentPage} setCurrentPage={handleDetailNavigation} />
            </div>
        </Layout>
    );
};

/**
 * 
 * server side props
 * @param context 
 * @returns 
 */

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { page } = context.query;
    const currPage = page ? parseInt(page.toString()) : 1;

    const res = await fetch(`https://bluetv.x10.mx/api/v1/movies?page=${page}`);
    const data = await res.json();

    return {
        props: {
            currPage,
            RandomVid: data?.data || [],
            lastPage: data?.last_page || 1,
        },
    };
};

export default RandomVideo;
