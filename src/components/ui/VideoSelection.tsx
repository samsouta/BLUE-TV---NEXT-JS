import React from 'react'
import { Eye } from 'lucide-react';
import { FaHeart } from 'react-icons/fa';
import { formatDuration } from '../../utils/formatDuration';
import { MovieDataType } from '@/src/types/MoviesType';
import { useRouter } from 'next/router';
import { formatViews } from '@/src/utils/formatViews';
import VotingUI from './VotingUI';
import { useGetLikeCountQuery } from '@/src/services/api/voting';


interface CommentUIProps {
    vidId: number;
    relativeDate: string;
    data: MovieDataType;
}

const VideoSelection: React.FC<CommentUIProps> = ({
    vidId,
    relativeDate,
    data }) => {

    const router = useRouter();
    /**
     * Get Like Count
     */
    const { data: likeCount } = useGetLikeCountQuery(vidId)
    const totalLike = likeCount?.like_count

    /**
     * Get Actress
     */
    const actresses = data?.actresses;

    /**
     * Handle Click
     */
    const handleTagClick = (tagName: string) => {
        router.push(`/tags/${tagName}`);
    };
    /**
     * Handle Actress Click
     */
    const handleActressClick = (actress: { id: number; name: string }) => {
        const formattedName = actress.name.toLowerCase().replace(/\s+/g, '');
        router.push(`/act/${actress.id}/${formattedName}`);
    };

    return (
        <div className="text-neutral-light ">
            <div className="max-w-4xl mx-auto lg:mx-0 py-2">
                {/* Video Info Section */}
                <div className="bg-white/20 backdrop-blur-xl rounded-xl p-6 mb-6 shadow-lg ring-1 ring-white/10">
                    <h1 className="text-md xl:text-2xl text-[var(--light-blue)]  mb-2 open-sans">
                        {data?.description}
                    </h1>
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-[var(--soft-blue)]" />
                                <span className="text-[var(--soft-blue)]">
                                    {formatViews({ views: data?.view_count })}
                                </span>
                            </div>
                            <span className="text-[var(--dark-blue)]">•</span>
                            <span className="text-[var(--soft-blue)]">{relativeDate}</span>
                            <span className="text-[var(--dark-blue)]">•</span>
                            <span className="flex items-center text-[var(--soft-blue)] montserrat">
                                <FaHeart className="text-2xl text-[var(--soft-blue)] mr-2" />
                                {totalLike}
                            </span>
                        </div>
                        {
                        /* /** Voting & share component **/
                        }
                        <VotingUI id={data?.id}/>
                    </div>
                </div>

                {/* Detail Section */}
                <div className="bg-white/20 max-h-[300px] overflow-y-scroll backdrop-blur-xl rounded-xl p-6 shadow-lg ring-1 ring-white/10">
                    <h2 className="text-lg montserrat font-bold text-[var(--soft-blue)] mb-4">
                        Code : <span className=' font-normal text-[var(--light-blue)] open-sans font-serif text-md' >{data?.title}</span>
                    </h2>

                    <div className="grid gap-4 text-[var(--soft-blue)]">
                        <div className="flex items-center gap-2">
                            <span className="text-lg montserrat font-bold text-[var(--soft-blue)]">Released : </span>
                            <span className='font-normal text-[var(--light-blue)] open-sans font-serif text-md' >{data?.released_year}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-lg montserrat font-bold text-[var(--soft-blue)]">Duration : </span>
                            <span className='font-normal text-[var(--light-blue)] open-sans font-serif text-md' >{formatDuration(data?.duration)}</span>
                        </div>

                        {actresses && actresses.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-lg montserrat font-bold text-[var(--soft-blue)] ">Model : </span>
                                <div className="flex gap-2 flex-wrap">
                                    {actresses.map((actress, index) => (
                                        <React.Fragment key={actress.id}>
                                            <button
                                                onClick={() => handleActressClick(actress)}
                                                className="hover:text-[var(--light-blue)] transition-colors"
                                            >

                                                <span className=' font-normal text-[var(--light-blue)] open-sans font-serif text-md' >{actress?.name}</span>

                                            </button>
                                            {index < actresses.length - 1 && (
                                                <span className="text-[var(--dark-blue)]">•</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* /// tags *************** */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-lg montserrat font-bold text-[var(--soft-blue)]">Tags : </span>
                            {data?.tags?.map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => handleTagClick(tag.name)}
                                    className="px-2 py-1 rounded-full bg-[var(--dark-blue)] 
                                             hover:bg-[var(--light-blue)] transition-colors text-sm"
                                >
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default React.memo(VideoSelection);