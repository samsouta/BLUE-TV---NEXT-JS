// pages/tags/[tag].tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { MovieResponseType } from '@/src/types/MoviesType';
import VideoCard from '@/src/components/ui/VideoCard';
import Pangination from '@/src/components/ui/Pangination';
import Layout from '@/src/components/layout/Layout';


type TagsDetailProps = {
  genre: string;
  currentPage: number;
  GenreVideo: MovieResponseType[];
  lastPage: number;
};

const GenreDetail: React.FC<TagsDetailProps> = ({
  currentPage,
  genre,
  GenreVideo,
  lastPage,
}) => {
  const router = useRouter();

  // Pagination change URL && update 
  const onPageChange = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { genre, page },
    });
  };

  return (
    <Layout>
      <div className="mx-1 lg:mx-4">
        <div className="flex justify-center items-center">
          <h1 className="text-[var(--light-blue)] mb-6 text-2xl montserrat font-bold">
            {(genre || 'Unknown')}
          </h1>
        </div>

        {/* Video Content*/}
        {GenreVideo?.length === 0 ? (
          <div className="text-center text-[var(--light-blue)]">No Video Found</div>
        ) : (
          <>
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {GenreVideo.map((item) => (
                <VideoCard key={item.id} data={item} actData={item?.actresses} />
              ))}
            </div>



            {/* Pagination component */}
            <Pangination
              lastPage={lastPage}
              currentPage={currentPage}
              setCurrentPage={onPageChange}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

/**
 * 
 * @param context 
 *  server side props
 * @returns 
 */

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get URL and page number
  const { genre, page } = context.query;
  const currentPage = page ? parseInt(page.toString()) : 1;
  const genStr = typeof genre === 'string' ? genre : '';

  // fetch each tags videos from API
  const res = await fetch(
    `https://bluetv.x10.mx/api/v1/mov/by-subgenre?sub_genre=${genre}&page=${currentPage}`
  );
  const data = await res.json();

  return {
    props: {
      genre: genStr,
      currentPage,
      GenreVideo: data?.data || [],
      lastPage: data?.last_page || 1,
    },
  };
};

export default GenreDetail;
