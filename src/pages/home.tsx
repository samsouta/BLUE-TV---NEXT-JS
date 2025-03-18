// pages/home.tsx
import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import HomeChild from '../components/features/Home/HomeChild';
import { GetServerSideProps } from 'next';
import { recommendation } from '@/server/recommendations';
import { MovieResponseType } from '../types/MoviesType';
import { actresses } from '@/server/actresses';
import { ActressType } from '../types/actressType';
import { fetchTags, TagVideosResponse } from '@/server/tags';
import FindVideoWithTags from '../components/features/videos/FindVideoWithTags';
import FindVideoWithGenres from '../components/features/videos/FindVideoWithGenre';
import { genres, GenreVideosResponse } from '@/server/genres';
import { randomVideo } from '@/server/video';
import VideoCard from '../components/ui/VideoCard';
import VSkeleton from '../components/ui/Loader/VSkeleton';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/router';


type ApiResponse = {
  movies: MovieResponseType[];
  currentPage: number;
  hasMore: boolean;
  actList: ActressType[];
  tagData: TagVideosResponse;
  genreData: GenreVideosResponse;
  randomVideos: MovieResponseType[];
};

const Home: React.FC<ApiResponse> = ({
  movies,
  currentPage,
  hasMore,
  actList,
  tagData,
  genreData,
  randomVideos,
}) => {

  const router = useRouter();
  const handleRandomDetail = () => {
    router.push(`/random-video`);
};

  return (
    <Layout>
      <Head>
        <title>Blue TV</title>
        <meta name="description" content="Welcome to Blue TV" />
      </Head>

      {
        /* Home content */
      }
      <div className='w-full'>
        <HomeChild
          data={movies}
          currentPage={currentPage}
          hasMore={hasMore}
          actList={actList}
        />
        {
          /* Tags Section */
        }
        <section className="space-y-12 md:space-y-16">
          <FindVideoWithTags isTag="tight pussy" videos={tagData['tight pussy'] || []} />
          <FindVideoWithTags isTag="creampie" videos={tagData['creampie'] || []} />
          <FindVideoWithTags isTag="Bondage" videos={tagData['Bondage'] || []} />
          <FindVideoWithTags isTag="Cosplay" videos={tagData['Cosplay'] || []} />
          <FindVideoWithTags isTag="Big ass" videos={tagData['Big ass'] || []} />
          <FindVideoWithTags isTag="Romantic" videos={tagData['Romantic'] || []} />
        </section>

        {
          /* Genres Section */
        }
        <section className="space-y-12 md:space-y-16 mt-10">
          <FindVideoWithGenres isGenre="censored" videos={genreData['censored'] || []} />
          <FindVideoWithGenres isGenre="Uncensored" videos={genreData['Uncensored'] || []} />
        </section>


        {
          /* Random Section - All Video */
        }
        <section className='space-y-12 md:space-y-16 mt-10' >
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-[var(--light-blue)] text-2xl font-bold montserrat">
              All Video / Random
            </h1>
            <span
              onClick={handleRandomDetail}
              className="text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center"
            >
              <span className="montserrat font-bold lg:text-xl text-md">More.</span>
              <FaArrowRight className="text-sm md:text-lg" />
            </span>
          </div>

          {/* Video Grid Section */}
          <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
            {randomVideo?.length < 0 ? (
              // Show skeleton loader when loading
              <>
                {[...Array(10)].map((_, index) => (
                  <VSkeleton key={index} />
                ))}
              </>
            ) : (
              // Render videos when data is available
              randomVideos.map((item) => (
                <div key={item.id}>
                  <VideoCard data={item} actData={item?.actresses} />
                </div>
              ))
            )}
          </div>
        </section>

      </div>

    </Layout>
  );
};

/**
 * @serverSideProps fetch data from server
 */

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [data, act, tagData, genreData, random] = await Promise.all([
      recommendation(),
      actresses(),
      fetchTags(),
      genres(),
      randomVideo()
    ]);

    // recommendation data
    const movies = data?.data || [];
    const currentPage = data?.current_page || 1;
    const hasMore = !!data?.next_page_url;

    // actress data
    const actList = act?.data || [];

    const randomVideos = random?.data || [];

    return {
      props: {
        movies,
        currentPage,
        hasMore,
        actList,
        tagData,
        genreData,
        randomVideos,

      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        movies: [],
        currentPage: 1,
        hasMore: false,
        actList: [],
        tagData: {},
        genreData: {},
        randomVideos: [],
      },
    };
  }
};

export default Home;
