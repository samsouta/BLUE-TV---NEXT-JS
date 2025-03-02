import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const TvLoader: React.FC = () => {
  return (
    <>
            <div className='flex justify-center items-center fixed backdrop-blur-sm bg-black/30 inset-0 z-50'>
                <div className='flex justify-center items-center'>
                    
                    <RotatingLines
                        visible={true}
                        height="30"
                        width="30"
                        strokeColor="#e7efff"
                        strokeWidth="4"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </>
  )
}

export default TvLoader