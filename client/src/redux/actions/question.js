import { END_LOADING, FETCH_QUESTIONS, START_LOADING } from 'src/constants/actionType';
import * as api from 'src/api';

export const getQuestions = (testId, questionId) => async (dispatch) => {
    try {
        const { data } = await api.questions(testId, questionId);

        // action -> { type: FETCH_QUESTIONS, data }
        dispatch({ type: FETCH_QUESTIONS, data });
    } catch (error) {
        console.log(error);
    }
};
