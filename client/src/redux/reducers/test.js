import { END_LOADING, FETCH_TESTS, START_LOADING } from "src/constants/actionType";

const testReducer = (state = { testData: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case FETCH_TESTS:
            return { ...state, testData: action?.data, loading: false, errors: null };
        default:
            return state;
    }
}

export default testReducer;