import { USER_SETTINGS } from "src/constants/actionType";

const settingsReducer = (state = { userData: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case USER_SETTINGS:
            return { ...state, userData: action?.data, loading: false, errors: null };
        default:
            return state;
    }
}

export default settingsReducer;