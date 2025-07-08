const initialState = {
  movies: [],
  loading: false
};

const Movie_Reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MOVIES_REQUEST':
      return { ...state, loading: true };

    case 'GET_MOVIES_SUCCESS':
      return { ...state, loading: false, movies: action.payload };

    case 'GET_MOVIES_FAILURE':
      return { ...state, loading: false };

    case 'ADD_MOVIE_SUCCESS':
      return { ...state, movies: [...state.movies, action.payload] };

    case 'EDIT_MOVIE_SUCCESS':
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        )
      };

    case 'DELETE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload)
      };

    default:
      return state;
  }
};

export default Movie_Reducers;