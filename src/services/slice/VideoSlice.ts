import { MovieDataType } from '@/src/types/MoviesType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the state
interface VideoState {
  movies: MovieDataType[];
  currentPage: number;
  hasMore: boolean;
}

const initialState: VideoState = {
  movies: [],
  currentPage: 1,
  hasMore: true,
};

export const VideoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {


    /// add movies to state
    addMovies: (state, action: PayloadAction<{ movies: MovieDataType[], hasMore: boolean }>) => {
      const newMovies = action.payload.movies.filter(
        (newMovie) => !state.movies.some((existingMovie) => existingMovie.id === newMovie.id)
      );
      state.movies = [...state.movies, ...newMovies];
      state.hasMore = action.payload.hasMore;
    },

    /// set current page number
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },


    //remove all movies from state
    resetMovies: (state) => {
      state.movies = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
});

export const {  addMovies, setCurrentPage, resetMovies } = VideoSlice.actions;
export default VideoSlice.reducer;
