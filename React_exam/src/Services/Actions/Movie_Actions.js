import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import generateUniqueId from 'generate-unique-id';

export const addMovieAsync = (movieData) => async (dispatch) => {
    try {
        const generatedId = generateUniqueId({ length: 16, useLetters: true });
        const docRef = doc(db, 'movies', generatedId);
        await setDoc(docRef, movieData);
        const movieWithId = { id: generatedId, ...movieData };
        dispatch({ type: 'ADD_MOVIE_SUCCESS', payload: movieWithId });
    } catch (error) {
        console.error('Error adding movie:', error);
    }
};

export const getMoviesAsync = () => async (dispatch) => {
    dispatch({ type: 'GET_MOVIES_REQUEST' });
    try {
        const querySnapshot = await getDocs(collection(db, 'movies'));
        const movieList = [];
        querySnapshot.forEach((docSnap) => {
            movieList.push({ id: docSnap.id, ...docSnap.data() });
        });
        dispatch({ type: 'GET_MOVIES_SUCCESS', payload: movieList });
    } catch (error) {
        dispatch({ type: 'GET_MOVIES_FAILURE' });
        console.error('Error fetching movies:', error);
    }
};

export const editMovieAsync = (id, updatedData) => async (dispatch) => {
    try {
        const docRef = doc(db, 'movies', id);
        await updateDoc(docRef, updatedData);
        dispatch({ type: 'EDIT_MOVIE_SUCCESS', payload: { id, ...updatedData } });
    } catch (error) {
        console.error('Error editing movie:', error);
    }
};

export const deleteMovieAsync = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, 'movies', id));
        dispatch({ type: 'DELETE_MOVIE_SUCCESS', payload: id });
    } catch (error) {
        console.error('Error deleting movie:', error);
    }
};