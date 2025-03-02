import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const VSkeleton: React.FC = () => {
  return (
    <div className=' bottom-1 rounded-md overflow-hidden' >
      <Box className='border-none rounded-lg w-full h-[150px] sm:h-[200px] lg:h-[250px]' sx={{ marginRight: 0.5, bgcolor: '#7FADE0' }} >
        <Skeleton animation="wave" variant="rectangular" width={'100%'} height={"250px"} />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" width="60%" />
        </Box>
      </Box>
    </div>
  )
}

export default VSkeleton