import { CREATE_EXAM, EXAM_ERROR, GET_EXAMS, START_LOADING, END_LOADING } from "src/constants/actionType";

const examsReducer = (state = { exams: [], newExam: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };
        case END_LOADING:
            return { ...state, loading: false };
        case GET_EXAMS:
            return { ...state, exams: action?.data, newExam: null, loading: false, errors: null }
        case CREATE_EXAM:
            return { ...state, exams: [...state.exams], newExam: action?.data, loading: false, errors: null };
        case EXAM_ERROR:
            return { ...state, errors: action?.errors };
        default:
            return state;
    }
}

export default examsReducer;