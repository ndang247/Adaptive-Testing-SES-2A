import { CREATE_QUERY, QUERY_ERROR } from "src/constants/actionType";

const queriesReducer = (state = { msg: '', loading: false, errors: null }, action) => {
    switch (action.type) {
        case CREATE_QUERY:
            return { ...state, msg: action?.data, loading: false, errors: null };
        case QUERY_ERROR:
            return { ...state, errors: action?.errors };
        default:
            return state;
    }
}

export default queriesReducer;