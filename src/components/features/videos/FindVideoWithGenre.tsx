import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import VSkeleton from '../../ui/Loader/VSkeleton';
import VideoCard from '../../ui/VideoCard';
import { MovieResponseType } from '@/src/types/MoviesType';

type FindVideoWithGenreProps = {
    isGenre: string;
    videos: MovieResponseType[];
};

const FindVideoWithGenres: React.FC<FindVideoWithGenreProps> = ({ isGenre, videos }) => {
    const router = useRouter();

    const handleMoreVid = () => {
        router.push(`/genres/${isGenre}`);
    };
    return (
        <div>
            {
            /* Header Section */
            }
            <div className="flex justify-between items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold poppins">
                    {isGenre}
                </h1>
                <span
                    onClick={handleMoreVid}
                    className="text-[var(--light-blue)] cursor-pointer hover:underline flex justify-around items-center"
                >
                    <span className="open-sans font-bold lg:text-xl text-md">More.</span>
                    <FaArrowRight className="text-sm md:text-lg" />
                </span>
            </div>

            {
            /* Video Grid Section */
            }
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
                {videos?.length > 0 ? (
                    // Render videos when data is available
                    videos.map((item) => (
                        <VideoCard actData={item?.actresses[0] || null} key={item?.id} data={item} />
                    ))

                ) : (
                    // Show skeleton loader when loading
                    <>
                        {[...Array(10)].map((_, index) => (
                            <VSkeleton key={index} />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default FindVideoWithGenres