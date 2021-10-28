import { AUTH_ERROR, LOGIN, LOGOUT, REGISTER } from "src/constants/actionType";

const authReducer = (state = { authData: null, loading: false, authErrors: null }, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, loading: false, authErrors: null };
        case REGISTER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, loading: false, authErrors: null };
        case LOGOUT:
            localStorage.clear();
            return { authData: null, loading: false, authErrors: null };
        case AUTH_ERROR:
            return { ...state, authErrors: action?.errors };
        default:
            return state;
    }
}

export default authReducer;