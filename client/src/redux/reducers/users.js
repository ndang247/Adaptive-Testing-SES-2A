import { FETCH_USER_BY_ID, SETTING_ERROR, UPDATE_USER } from "src/constants/actionType";

const usersReducer = (state = { userData: null, settingData: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case FETCH_USER_BY_ID:
            return { ...state, userData: action?.data, loading: false, errors: null };
        case UPDATE_USER:
            localStorage.removeItem('profile');
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, settingData: action?.data, loading: false, errors: null };
        case SETTING_ERROR:
            return { ...state, errors: action?.errors };
        default:
            return state;
    }
}

export default usersReducer;