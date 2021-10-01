import { END_LOADING, FETCH_QUESTIONS, START_LOADING } from "src/constants/actionType";

const questionReducer = (state = { questionData: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return { ...state, questionData: action?.data, loading: false, errors: null };
        default:
            return state;
    }
}

export default questionReducer;