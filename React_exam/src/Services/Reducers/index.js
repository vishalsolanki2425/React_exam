import { combineReducers } from "redux";
import Movie_Reducers from "./Movie_Reducers";
import AuthReducer from "./Auth_Reducers";

const rootReducer = combineReducers({
    Movie_Reducers,
    AuthReducer,
});

export default rootReducer;