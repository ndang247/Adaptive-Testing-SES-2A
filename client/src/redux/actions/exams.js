import * as api from 'src/api';
import { CREATE_EXAM, EXAM_ERROR, GET_EXAMS, START_LOADING, END_LOADING } from 'src/constants/actionType';

export const getExams = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getExams();

        dispatch({ type: GET_EXAMS, data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: EXAM_ERROR, errors: error.response.data });
        console.log(error);
    }
}

export const createExam = (newExam) => async (dispatch) => {
    try {
        const { data } = await api.createExam(newExam);

        dispatch({ type: CREATE_EXAM, data });
    } catch (error) {
        dispatch({ type: EXAM_ERROR, errors: error.response.data });
        console.log(error);
    }
}