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


type ApiResponse = {
  movies: MovieResponseType[];
  currentPage: number;
  hasMore: boolean;
  actList: ActressType[];
  tagData: TagVideosResponse
};

const Home: React.FC<ApiResponse> = ({
  movies,
  currentPage,
  hasMore,
  actList,
  tagData,
}) => {

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
        {/* Tags Section */}
        <section className="space-y-12 md:space-y-16">
          <FindVideoWithTags isTag="tight pussy" videos={tagData['tight pussy'] || []} />
          <FindVideoWithTags isTag="creampie" videos={tagData['creampie'] || []} />
          <FindVideoWithTags isTag="Bondage" videos={tagData['Bondage'] || []} />
          <FindVideoWithTags isTag="Cosplay" videos={tagData['Cosplay'] || []} />
          <FindVideoWithTags isTag="Big ass" videos={tagData['Big ass'] || []} />
          <FindVideoWithTags isTag="Romantic" videos={tagData['Romantic'] || []} />
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
    const [data, act, tagData] = await Promise.all([
      recommendation(),
      actresses(),
      fetchTags()
    ]);

    // recommendation data
    const movies = data?.data || [];
    const currentPage = data?.current_page || 1;
    const hasMore = !!data?.next_page_url;

    // actress data
    const actList = act?.data || [];

    return {
      props: {
        movies,
        currentPage,
        hasMore,
        actList,
        tagData,
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
      },
    };
  }
};

export default Home;
