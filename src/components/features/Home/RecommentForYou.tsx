import React, { useState} from "react";
import { FaCaretDown } from "react-icons/fa";
import { Loader } from "lucide-react";
import VideoCard from "../../ui/VideoCard";
import VSkeleton from "../../ui/Loader/VSkeleton";
import {  MovieDataType, PaginatedMovieResponse } from "@/src/types/MoviesType";

type ApiResponse = {
    data: MovieDataType[];
    currPage: number;
    has_More: boolean;
}

const RecommentForYou: React.FC<ApiResponse> = ({
    data,
    currPage,
    has_More
}) => {
    
    const [movies, setMovies] = useState<MovieDataType[]>(data || []);
    const [currentPage, setCurrentPage] = useState<number>(currPage || 1);
    const [hasMore, setHasMore] = useState<boolean>(has_More || false);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Loads more videos when the user scrolls to the bottom of the page.
     */
    const loadMore = async () => {
        try {
            setIsLoader(true);
            setError(null);
            const nextPage = currentPage + 1;
            const response = await fetch(`https://bluetv.x10.mx/api/v1/recommendations?page=${nextPage}`);

            if (!response.ok) {
                throw new Error("Failed to load more videos");
            }

            const newData: PaginatedMovieResponse = await response.json();
            const mainData = newData?.data || [];

            if (!mainData) {
                throw new Error("Invalid data structure received from API");
            }

            setMovies(prevMovies => [...prevMovies, ...mainData]);
            setCurrentPage(nextPage);
            setHasMore(!!newData?.next_page_url);
        } catch (err) {
            setError('Failed to load more videos');
            console.error('Error loading more videos:', err);
        } finally {
            setIsLoader(false);
        }
    };
    /**
     * Handles the scroll event to load more videos when the user scrolls to the bottom of the page.
     */

    return (
        <div>
            <div className="flex justify-start items-center">
                <h1 className="text-[var(--light-blue)] my-2 text-2xl font-bold poppins ">
                    Recommend For You
                </h1>
            </div>

            {/* /** Video Cards */ }
            <div className="flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-2">
                {movies?.length > 0
                    ? movies.map((item) => (
                        <div key={item.id} >
                            <VideoCard actData={item?.actresses[0] || null}  data={item} />
                        </div>
                    ))
                    : [...Array(4)].map((_, index) => (
                        <VSkeleton key={index} />
                    ))}

            </div>
            
            {/* /* Load More */ }
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {hasMore && !isLoader && (
                <span
                    className="text-[var(--light-blue)] mt-4 cursor-pointer hover:underline flex justify-center items-center"
                    onClick={loadMore}
                >
                    <span className="montserrat font-bold lg:text-lg text-md">
                        Load More
                    </span>
                    <FaCaretDown className="text-lg" />
                </span>
            )}
            {isLoader && (
                <div className="flex justify-center items-center mt-4">
                    <Loader className="animate-spin text-[var(--light-blue)]" size={24} />
                </div>
            )}
            {!hasMore && movies.length > 0 && <p className="text-center mt-4">No more videos to load.</p>}
        </div>
    );
};

export default RecommentForYou;






