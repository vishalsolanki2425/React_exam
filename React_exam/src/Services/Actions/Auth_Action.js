import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase";

export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        dispatch({ type: "LOGIN_SUCCESS", payload: userCredential.user });
    } catch (error) {
        dispatch({ type: "AUTH_ERROR", payload: error.message });
    }
};

export const loginWithGoogle = () => async (dispatch) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        dispatch({ type: "LOGIN_SUCCESS", payload: result.user });
    } catch (error) {
        dispatch({ type: "AUTH_ERROR", payload: error.message });
    }
};

export const signUpUser = (email, password) => async (dispatch) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        dispatch({ type: "LOGIN_SUCCESS", payload: result.user });
    } catch (error) {
        dispatch({ type: "AUTH_ERROR", payload: error.message });
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
    } catch (error) {
        console.error("Logout error:", error.message);
    }
};

export const checkAuthStatus = () => (dispatch) => {
    dispatch({ type: "AUTH_LOADING" });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
        } else {
            dispatch({ type: "LOGOUT" });
        }
    });
};