const initialState = {
  user: null,
  movies: [],
  filteredMovies: [],
  loading: false
};

const Movie_Reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MOVIES_REQUEST':
      return {
        ...state,
        loading: true
      };
      
    case 'GET_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
        filteredMovies: action.payload
      };

    case 'GET_MOVIES_FAILURE':
      return {
        ...state,
        loading: false
      };

    case 'ADD_MOVIE_SUCCESS':
      return {
        ...state, movies:
          [...state.movies,
          action.payload]
      };

    case 'EDIT_MOVIE_SUCCESS':
      return {
        ...state,
        movies: state.movies.map(movie =>
          movie.id === action.payload.id ? action.payload : movie
        )
      };

    case 'DELETE_MOVIE_SUCCESS':
      const updatedMovies = state.movies.filter((movie) => movie.id !== action.payload);
      return {
        ...state,
        movies: updatedMovies,
        filteredMovies: updatedMovies,
      };

    case 'SET_FILTERED_MOVIES':
      return {
        ...state,
        filteredMovies: action.payload
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};

export default Movie_Reducers;