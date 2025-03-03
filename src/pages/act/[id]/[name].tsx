import Layout from '@/src/components/layout/Layout';
import VSkeleton from '@/src/components/ui/Loader/VSkeleton';
import Pangination from '@/src/components/ui/Pangination';
import VideoCard from '@/src/components/ui/VideoCard';
import { ActressType } from '@/src/types/actressType';
import { PaginatedMovieResponse } from '@/src/types/MoviesType';
import { Avatar } from '@heroui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, {  useState } from 'react';


type ApiResponse = {
    actressData: ActressType;
    movies: PaginatedMovieResponse;
    lastPage: number;
    initPage: number;
};

const ActModelPage: React.FC<ApiResponse> = ({
    actressData,
    movies,
    lastPage,
    initPage,
}) => {
    const router = useRouter();
    // Initialize currentPage
    const [currentPage, setCurrentPage] = useState(initPage);

    // handle page change
    const handlePageChange = (page: number) => {
        router.push(`/act/${actressData?.id}/${actressData?.name}?page=${page}`);
        setCurrentPage(page);
    };

    /**
     * loading
     */
    if (!actressData) {
        return (
            <div className="flex-wrap grid mt-24 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {[...Array(10)].map((_, index) => (
                    <VSkeleton key={index} />
                ))}
            </div>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 mt-24">

                {/* Actress info */}
                <div className=' mt-5' >
                    <div className=' bg-black/30 p-10 rounded-lg shadow-md flex gap-x-6 md:justify-center' >
                        <Avatar
                            isBordered
                            color="success"
                            src={actressData?.image_url || undefined}
                            name={actressData?.name || undefined}
                            className="md:w-32 md:h-32 w-20 h-20"
                            style={{ objectPosition: 'top', objectFit: 'fill' }}
                        />
                        <h2 className=" text-[var(--light-blue)] mb-4 flex flex-col">
                            <span className="font-bold text-md md:text-xl montserrat ">{actressData?.name} - ( {actressData?.age} ) yrs</span>
                            {/* // For DD/MM/YYYY format */}
                            <span className=' roboto text-sm md:text-lg' >
                                {actressData?.birth_date ? new Date(actressData?.birth_date).toLocaleDateString('en-GB') : undefined}
                            </span>
                            <span className=' roboto text-sm md:text-lg' >
                                {actressData?.description}
                            </span>
                            <span className=' roboto text-sm md:text-lg' >
                                {actressData?.nationality}
                            </span>

                        </h2>
                    </div>

                    {/* // movies selection  */}
                    <div className="flex-wrap grid mt-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                        {movies?.data.map((movie) => (
                            <VideoCard key={movie.id} data={movie} actData={actressData} />
                        ))}
                    </div>
                    {movies?.data.length === 0 && (
                        <div className="text-center text-lg min-h-screen text-[var(--soft-blue)] py-8">
                            No movies found for this actress
                        </div>
                    )}
                </div>


                <Pangination
                    lastPage={lastPage}
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange} />
            </div>
        </Layout>
    );
};

/**
 * 
 * server side props
 */

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const page = context.query.page ? parseInt(context.query.page as string) : 1;

    // fetch each tags videos from API
    const res = await fetch(
        `https://bluetv.x10.mx/api/v1/actresses/${id}?page=${page}`
    );
    const data = await res.json();

    const actressData = data?.actress || null;
    const movies = data?.movies || [];
    const lastPage = data?.movies?.last_page || 1;

    return {
        props: {
            actressData,
            movies,
            lastPage,
            initPage: page,
        },
    };
};

export default ActModelPage;
