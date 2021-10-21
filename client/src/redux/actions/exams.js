import * as api from 'src/api';
import { CREATE_EXAM, EXAM_ERROR, START_LOADING, END_LOADING, VALIDATE_EXAM_PIN, VALIDATION_ERROR, GET_EXAMS_BY_CREATOR, GET_PAST_EXAMS_BY_ID } from 'src/constants/actionType';

export const getExamsByCreator = (creatorId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getExamsByCreator(creatorId);

        dispatch({ type: GET_EXAMS_BY_CREATOR, data });
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

export const validateExamPin = (form, router) => async (dispatch) => {
    try {
        const { data } = await api.validateExamPin(form);

        dispatch({ type: VALIDATE_EXAM_PIN, data });

        router.push(`/user/exam/${form.pin}`);
    } catch (error) {
        dispatch({ type: VALIDATION_ERROR, errors: error.response.data });
        console.log(error);
    }
}

export const getPastExamsByID = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPastExamsByID(id);

        dispatch({ type: GET_PAST_EXAMS_BY_ID, data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: EXAM_ERROR, errors: error.response.data });
        console.log(error);
    }
}