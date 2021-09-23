import { LOGIN, REGISTER } from "src/constants/actionType";

const authReducer = (state = { authData: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, loading: false, errors: null };
        case REGISTER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, loading: false, errors: null };
        default:
            return state;
    }
}

export default authReducer;