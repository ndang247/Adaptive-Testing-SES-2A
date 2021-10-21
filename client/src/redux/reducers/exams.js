import { CREATE_EXAM, EXAM_ERROR, GET_EXAMS_BY_CREATOR, GET_PAST_EXAMS_BY_ID, START_LOADING, END_LOADING, VALIDATE_EXAM_PIN, VALIDATION_ERROR, GET_EXAM_BY_ID } from "src/constants/actionType";

const examsReducer = (state = { exams: [], exam: null, newExam: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };
        case END_LOADING:
            return { ...state, loading: false };
        case GET_EXAMS_BY_CREATOR:
            return {
                ...state,
                exams: action?.data,
                exam: null,
                newExam: null,
                loading: false,
                errors: null
            }
        case GET_EXAM_BY_ID:
            return {
                ...state,
                exams: [...state.exams],
                exam: action?.data,
                newExam: null,
                loading: false,
                errors: null
            };
        case GET_PAST_EXAMS_BY_ID:
            return {
                ...state,
                exams: action?.data,
                exam: null,
                newExam: null,
                loading: false,
                errors: null
            }
        case CREATE_EXAM:
            return {
                ...state,
                exams: [...state.exams],
                exam: null,
                newExam: action?.data,
                loading: false,
                errors: null
            };
        case VALIDATE_EXAM_PIN:
            return {
                ...state,
                exams: [...state.exams],
                exam: action?.data,
                newExam: null,
                loading: false,
                errors: null
            };
        case VALIDATION_ERROR:
            return { ...state, validationErrors: action?.errors };
        case EXAM_ERROR:
            return { ...state, errors: action?.errors };
        default:
            return state;
    }
}

export default examsReducer;