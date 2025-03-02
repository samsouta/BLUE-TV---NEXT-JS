import React from 'react'
import GenreButton from '../../ui/GenreButton';
import { useGetAllgenreQuery } from '@/src/services/api/genres';
import { GenreDataType } from '@/src/types/genreType';

const NavLinks: React.FC = () => {
  // Fetch genres using the query hook
  const { data, isLoading } = useGetAllgenreQuery();
  const genreList = data?.data as GenreDataType[];

  return (
    <div className="flex items-center gap-4 lg:gap-6">
      {isLoading ? (
        // Loading skeleton placeholders
        [...Array(5)].map((_, index) => (
          <div key={index} className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
        ))
      ) : (
        genreList?.map((gen) => (
          <GenreButton
            key={gen?.id}
            name={gen?.name}
            tag={gen?.sub_genres}
          />
        ))
      )}
    </div>
  )
}

export default NavLinks
