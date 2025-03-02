// Ensure react-lazyload is installed
// npm install react-lazyload
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GoDotFill } from 'react-icons/go';
import { Card, CardFooter } from '@heroui/react';
import { MovieDataType } from '@/src/types/MoviesType';
import { formatDuration } from '@/src/utils/formatDuration';
import { ActressType } from '@/src/types/actressType';

type HomeVideoPageChildProps = {
    data: MovieDataType;
    actData: ActressType | ActressType[];
};

const VideoCard: React.FC<HomeVideoPageChildProps> = ({ data, actData }) => {
    const router = useRouter();
    
    /**
     * 
     * @returns get actress name
     */
    const getActressName = () => {
        if (!actData) return null;
        if (Array.isArray(actData)) {
            return actData.length > 0 ? actData[0].name : null;
        }
        return actData.name;
    };
    const actress = getActressName();

    /**
     *
     * @returns handle detail navigation
     */
    const handleDetailNavigation = useCallback((id: number) => {
        router.push(`/videos/${id}`);
    }, [router]);

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none rounded-lg bg-transparent w-full h-[250px] overflow-hidden"
        >
            <Image
                src={data?.thumbnail_url}
                alt={data?.title}
                quality={75} // optimize image quality
                fill
                priority={true} // prioritize image loading
            />

            <CardFooter className="before:bg-white/10 bg-black/30 border-white/10 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-xs ml-1 z-10">
                <div className="w-full h-full">
                    <div className="flex justify-between">
                        <h5 className="text-sm roboto font-normal text-[var(--white)]">{formatDuration(data?.duration)}</h5>
                        {actress === null  ? (
                            <span className="flex items-center gap-x-1">
                                <GoDotFill className="text-red-500" />
                                <span className="text-xs text-[var(--white)] open-sans font-bold">unknown</span>
                            </span>
                        

                        ) : (
                            <span className="flex items-center gap-x-1">
                                <GoDotFill className="text-green-400" />
                                <span className="text-xs text-[var(--white)] open-sans font-bold">{actress}</span>
                            </span>
                        )}
                    </div>
                    <p className="text-xs poppins font-normal text-white line-clamp-1">{data?.description}</p>
                </div>
            </CardFooter>

            <div
                onClick={() => handleDetailNavigation(data?.id)}
                className="absolute inset-0 cursor-pointer"
                aria-label={`Go to detail page for ${data?.title}`}
            ></div>
        </Card>
    );
};

export default React.memo(VideoCard);
