import { FETCH_USER_BY_ID } from "src/constants/actionType";

const usersReducer = (state = { userData: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case FETCH_USER_BY_ID:
            return { ...state, userData: action?.data, loading: false, errors: null };
        default:
            return state;
    }
}

export default usersReducer;