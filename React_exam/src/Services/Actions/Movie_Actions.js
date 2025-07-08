import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../Firebase';
import generateUniqueId from 'generate-unique-id';

export const addMovieAsync = (movieData) => async (dispatch) => {
  try {
    const generatedId = generateUniqueId({ length: 16, useLetters: true });
    const docRef = doc(db, 'movies', generatedId);
    await setDoc(docRef, movieData);
    dispatch({
      type: 'ADD_MOVIE_SUCCESS',
      payload: { id: generatedId, ...movieData }
    });
  } catch (error) {
    console.error('Error adding movie:', error);
  }
};

export const getMoviesAsync = () => async (dispatch) => {
  dispatch({
    type: 'GET_MOVIES_REQUEST'
  });
  try {
    const snapshot = await getDocs(collection(db, 'movies'));
    const movieList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({
      type: 'GET_MOVIES_SUCCESS',
      payload: movieList
    });
  } catch (error) {
    dispatch({
      type: 'GET_MOVIES_FAILURE'
    });
    console.error('Error fetching movies:', error);
  }
};

export const editMovieAsync = (id, updatedData) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'movies', id), updatedData);
    dispatch({
      type: 'EDIT_MOVIE_SUCCESS',
      payload: { id, ...updatedData }
    });
  } catch (error) {
    console.error('Error editing movie:', error);
  }
};

export const deleteMovieAsync = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'movies', id));
    dispatch({
      type: 'DELETE_MOVIE_SUCCESS',
      payload: id
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
};

export const filterMovies = (searchText) => (dispatch, getState) => {
  const allMovies = getState().Movie_Reducers.movies;
  const filtered = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );
  dispatch({
    type: "SET_FILTERED_MOVIES",
    payload: filtered
  });
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch({
      type: "LOGOUT_USER"
    });
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};