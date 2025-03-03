import React, { useState } from 'react';
import VSkeleton from '../components/ui/Loader/VSkeleton';
import VideoCard from '../components/ui/VideoCard';
import Pangination from '../components/ui/Pangination';
import WatchMoreBtn from '../components/ui/WatchMoreBtn';
import ADSSlider from '../components/ui/ADSSlider';
import { GetServerSideProps } from 'next';
import { MovieResponseType } from '../types/MoviesType';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';


type ApiResponse = {
  currPage: number;
  featureVid: MovieResponseType[];
  lastPage: number;
};

const Trending = ({
  currPage,
  featureVid,
  lastPage,
}: ApiResponse) => {

  const [currentPage, setCurrentPage] = useState(currPage);
  const router = useRouter();




  /**
    * handle random video detail page navigation
    */
  const handleDetailNavigation = (page: number) => {
    setCurrentPage(page);
    router.push(`/trending-now?page=${page}`);
  };


  return (
    <Layout>
      <div className=" mx-1 lg:mx-4">
        <div className="grid grid-cols-12 gap-4">
          {
            /* ADS Slider  */
          }
          <div className="col-span-12 md:col-span-8">
            <ADSSlider />
          </div>
        </div>

        {
          /* Watch More button */
        }
        <div className="mt-10">
          <div className="flex flex-col justify-center px-2 mt-6 items-center">
            <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
              Watch More Videos
            </h1>
            <WatchMoreBtn />

          </div>

        </div>



        {/* Page Title */}
        <div className="flex justify-start px-2 mt-6 items-center">
          <h1 className="text-[var(--light-blue)] mb-6 text-2xl font-bold montserrat">
            Trending Now
          </h1>
        </div>

        {
          /* Video Cards */
        }
        <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {featureVid?.length < 0
            ? [...Array(20)].map((_, index) => (
              <VSkeleton key={index} />
            ))
            : featureVid?.map((item) => (
              <VideoCard
                key={item?.id}
                data={item}
                actData={ item?.actresses}
              />
            ))}
        </div>



        {
          /* Pagination */
        }
        <Pangination
          lastPage={lastPage}
          currentPage={currentPage}
          setCurrentPage={handleDetailNavigation}
        />
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

  const res = await fetch(`https://bluetv.x10.mx/api/v1/featured-videos?page=${page}`);
  const data = await res.json();

  return {
    props: {
      currPage,
      featureVid: data?.data || [],
      lastPage: data?.last_page || 1,
    },
  };
};

export default Trending;
