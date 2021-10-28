import { GET_SCORE_BY_EXAM_ID, SCORE_ERROR, START_LOADING, END_LOADING } from "src/constants/actionType";

const scoresReducer = (state = { scores: [], score: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };
        case END_LOADING:
            return { ...state, loading: false };
        case GET_SCORE_BY_EXAM_ID:
            return {
                ...state,
                scores: [...state.scores],
                score: action?.data,
                loading: false,
                errors: null
            };
        case SCORE_ERROR:
            return { ...state, errors: action?.errors };
        default:
            return state;
    }
}

export default scoresReducer;