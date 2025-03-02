import React from 'react'
import { MovieDataType } from '@/src/types/MoviesType';
import VSkeleton from '../../ui/Loader/VSkeleton';
import VideoCard from '../../ui/VideoCard';

type RelatedVideoProps = {
    data: MovieDataType[];
}

const RelatedVideo: React.FC<RelatedVideoProps> = ({
    data,
}) => {

    const actress = data?.map((item) => item?.actresses?.map((item) => item)) || null;
    console.log('this is fuck you' , actress);


    return (
        <div className='flex-wrap grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2' >
            {
                data?.length < 0 ? (
                    <VSkeleton />
                ) : (
                    data?.map((vid) => (
                        <div key={vid?.id} >
                            <VideoCard
                            data={vid}
                            actData={vid?.actresses?.map((item)=> item) || null}
                            />
                        </div>
                    ))
                )
            }
        </div >
    )
}


export default React.memo(RelatedVideo);