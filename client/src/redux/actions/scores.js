import * as api from 'src/api';
import { GET_SCORE_BY_EXAM_ID, SCORE_ERROR, START_LOADING, END_LOADING } from 'src/constants/actionType';

export const getScoreByExamId = (testId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getScoreByExamId(testId);

        dispatch({ type: GET_SCORE_BY_EXAM_ID, data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: SCORE_ERROR, errors: error.response.data });
        console.log(error);
    }
}