import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ActressSwipper from '../../ui/ActressSwipper';
import TrendingBtn from '../../ui/TrendingBtn';
import RecommentForYou from './RecommentForYou';
import { useRouter } from 'next/router';
import { MovieDataType } from '@/src/types/MoviesType';
import { ActressType } from '@/src/types/actressType';
import GoUpBtn from '../../ui/GoUpBtn';

type ApiResponse = {
  data: MovieDataType[];
  currentPage: number;
  hasMore: boolean;
  actList: ActressType[];
}

const HomeChild: React.FC<ApiResponse> = ({ 
  data,
  currentPage,
  hasMore,
  actList
 }) => {

  const router = useRouter();

  /**
   * Scroll to top when page load
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [])

  /**
   * Scroll to top when click to top button
   */
  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className=' flex flex-col mx-1 lg:mx-4 gap-y-8'>
        <div className='' >
          {/* Popular Actress */}
          <div className=' mb-9' >
            <div className=" flex justify-between items-center">
              <span className='text-[var(--light-blue)] ps-1 my-2 text-2xl poppins font-bold' > Popular Actress</span>
              <Link href={`/act-list`} ><div className=' flex px-2 items-center cursor-pointer' >
                <span className=" text-[var(--light-blue)] open-sans font-bold lg:text-xl text-md">See All</span>
                <FaArrowRight className="text-sm text-[var(--light-blue)] md:text-lg" />
              </div></Link>
            </div>
            <ActressSwipper data={actList} />
          </div>

          {/* trendingBtn */}
          <div className=' mb-9 flex flex-col justify-start items-center' >
            <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold poppins">
              Trending Video
            </h1>
            <TrendingBtn />
          </div>

          {/* Recommended Section */}
          <section className="space-y-4 md:space-y-8">
            <RecommentForYou 
            data={data} 
            currPage={currentPage} 
            has_More={hasMore} />
          </section>


          {/* Mobile Go To Top Button */}
          {router.asPath === '/home' && (
            <div
              className="md:hidden fixed bottom-8 right-8 flex flex-col items-center cursor-pointer z-50"
              onClick={handleToTop}
            >
              <GoUpBtn />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeChild;
