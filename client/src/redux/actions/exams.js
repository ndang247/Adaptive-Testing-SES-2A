import * as api from 'src/api';
import { CREATE_EXAM, EXAM_ERROR, START_LOADING, END_LOADING, VALIDATE_EXAM_PIN, VALIDATION_ERROR, GET_EXAMS_BY_CREATOR, GET_EXAM_BY_ID, GET_PAST_EXAMS, NEXT_QUESTION } from 'src/constants/actionType';

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

export const getExamById = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getExamById(id);

        dispatch({ type: GET_EXAM_BY_ID, data });
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
        dispatch({ type: START_LOADING });

        const { data } = await api.validateExamPin(form);

        dispatch({ type: VALIDATE_EXAM_PIN, data });
        dispatch({ type: END_LOADING });

        router.push(`/user/exam/${form.pin}/${data.nextQuestion._id}`);
    } catch (error) {
        dispatch({ type: VALIDATION_ERROR, errors: error.response.data });
        console.log(error);
    }
}

export const getPastExams = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.getPastExams();

        dispatch({ type: GET_PAST_EXAMS, data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: EXAM_ERROR, errors: error.response.data });
        console.log(error);
    }
}

export const getNextQuestion = (testId, questionId, answer, router) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.updateScore(testId, questionId, answer);

        dispatch({ type: NEXT_QUESTION, data });
        dispatch({ type: END_LOADING });

        router.push(`/user/exam/${testId}/${data ? data?.nextQuestion?._id : questionId}`);
    } catch (error) {
        dispatch({ type: EXAM_ERROR, errors: error.response.data });
        console.log(error);
    }
}