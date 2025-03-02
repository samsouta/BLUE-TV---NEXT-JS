import RelatedVideo from '@/src/components/features/videos/RelatedVideo';
import Layout from '@/src/components/layout/Layout';
import VideoSelection from '@/src/components/ui/VideoSelection';
import { MovieDataType } from '@/src/types/MoviesType';
import { formatRelativeDate } from '@/src/utils/formatRelativeDate';
import { GetServerSideProps } from 'next';
import React from 'react';

type Props = {
    videos: MovieDataType;
    relatedVideos: MovieDataType[];
};

const VideoDetail: React.FC<Props> = ({
    videos,
    relatedVideos,
}) => {


    // const [incrementView] = useIncrementViewMutation();


    /**
     * Calculate relative date
     *  Parse the posted_date (assumes your backend now returns an ISO string)
     */
    const postedDateStr = videos?.posted_date;
    const parsedDate = postedDateStr ? new Date(postedDateStr) : new Date();
    const relativeDate = formatRelativeDate(parsedDate);

    /**
     * get view from iframe 
     */

    // const handleVideoPlayed = useCallback((videoId: number) => {
    //     if (videoId) {
    //         incrementView({ videoId });
    //     }
    // }, [incrementView]);

    // if (isLoading) return <TvLoader />;

    // if (error || !data) {
    //     return <div className="text-red-600 mt-28">Error fetching movie data</div>;
    // }

    return (
        <Layout>
            <div className="text-gray-100 mt-[80px] px-2 md:mt-36 ">
                {
                    /* Video player Section */
                }
                <div>
                    <div className="flex xl:justify-between">
                        <div className="w-full relative  grid grid-cols-12 overflow-hidden">
                            <div className=' lg:col-span-8 col-span-12' >
                                <div className="relative shadow-xl rounded-xl overflow-hidden w-full h-[250px] lg:h-[600px] lg:w-[900px] ">
                                    <iframe
                                        src={videos?.video_url}
                                        width="100%"
                                        height="100%"
                                        title="Video Player"
                                        loading="lazy"
                                        sandbox="allow-scripts allow-same-origin allow-presentation"
                                        allowFullScreen
                                    // onLoad={() => handleVideoPlayed(data?.movie.id)}
                                    />
                                    <div className="cursor-not-allowed absolute bottom-0 z-50 right-14 rounded-md bg-transparent w-8 h-8"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        /* // Video Info Section */
                    }
                    <VideoSelection
                        vidId={videos.id}
                        relativeDate={relativeDate}
                        data={videos}
                    />
                </div>

                {
                    /* // Related Videos Section */
                }
                <div className="mt-10 mx-auto mb-20 ">
                    <h2 className="text-xl md:text-2xl head-font ms-2 text-white mb-4">Related Videos</h2>
                        <RelatedVideo data ={relatedVideos}  />
                </div>

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
    const { id } = context.params as { id: string };
    
    // Fetch both movie and related videos
    const [movieRes, relatedRes] = await Promise.all([
        fetch(`https://bluetv.x10.mx/api/v1/movies/${id}`),
        fetch(`https://bluetv.x10.mx/api/v1/movie/${id}/related`)
    ]);

    const [movieData, relatedData] = await Promise.all([
        movieRes.json(),
        relatedRes.json()
    ]);

    return {
        props: {
            videos: movieData?.movie,
            relatedVideos: relatedData?.related_videos || []
        },
    };
};

export default VideoDetail;