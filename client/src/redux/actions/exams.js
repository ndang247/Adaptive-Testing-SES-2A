import * as api from 'src/api';
import { CREATE_EXAM, EXAM_ERROR } from 'src/constants/actionType';

export const createExam = (newExam) => async (dispatch) => {
    try {
        const { data } = api.createExam(newExam);

        // dispatch({ type: CREATE_EXAM, data });
    } catch (error) {
        dispatch({ type: EXAM_ERROR, errors: error.response.data });
        console.log(error);
    }
}