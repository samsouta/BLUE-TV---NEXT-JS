// pages/tags/[tag].tsx
import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { MovieResponseType } from '@/src/types/MoviesType';
import VideoCard from '@/src/components/ui/VideoCard';
import Pangination from '@/src/components/ui/Pangination';
import Layout from '@/src/components/layout/Layout';


type TagsDetailProps = {
  tag: string;
  currentPage: number;
  TagsVideo: MovieResponseType[];
  lastPage: number;
};

const TagsDetail: React.FC<TagsDetailProps> = ({
  tag,
  currentPage,
  TagsVideo,
  lastPage,
}) => {
  const router = useRouter();

  // Pagination change URL && update 
  const onPageChange = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { tag, page },
    });
  };

  return (
    <Layout>
      <div className="mx-1 lg:mx-4">
        <div className="flex justify-center items-center">
          <h1 className="text-[var(--light-blue)] mb-6 text-2xl montserrat font-bold">
            {(tag || 'Unknown')}
          </h1>
        </div>

        {/* Video Content*/}
        {TagsVideo.length === 0 ? (
          <div className="text-center text-[var(--light-blue)]">No Video Found</div>
        ) : (
          <>
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {TagsVideo.map((item) => (
                <VideoCard key={item.id} data={item} />
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
  const { tag, page } = context.query;
  const currentPage = page ? parseInt(page.toString()) : 1;
  const tagStr = typeof tag === 'string' ? tag : '';

  // fetch each tags videos from API
  const res = await fetch(
    `https://bluetv.x10.mx/api/v1/mov/by-tag?tag=${encodeURIComponent(
      tagStr
    )}&page=${currentPage}`
  );
  const data = await res.json();

  return {
    props: {
      tag: tagStr,
      currentPage,
      TagsVideo: data?.data?.data || [],
      lastPage: data?.data?.last_page || 1,
    },
  };
};

export default TagsDetail;
