import { CREATE_EXAM, EXAM_ERROR } from "src/constants/actionType";

const examsReducer = (state = { exams: [], loading: false, errors: null }, action) => {
    switch (action.type) {
        case CREATE_EXAM:
            return { ...state, exams: [...state.exams, action?.data] };
        case EXAM_ERROR:
            return { ...state, errors: action?.errors };
        default:
            return state;
    }
}

export default examsReducer;