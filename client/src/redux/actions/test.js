import { END_LOADING, FETCH_TESTS, START_LOADING } from 'src/constants/actionType';
import * as api from 'src/api';

export const getTests = (testId) => async (dispatch) => {
    try {
        const { data } = await api.tests(testId);

        dispatch({ type: FETCH_TESTS, data });
    } catch (error) {
        console.log(error);
    }
};