const initialState = {
  user: null,
  loading: false,
  error: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOADING":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "AUTH_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

export default AuthReducer;