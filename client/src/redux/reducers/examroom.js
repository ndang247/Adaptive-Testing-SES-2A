import { JOIN_EXAM } from "src/constants/actionType";

const examroomReducer = (state = { examData: null, loading: false, errors: null }, action) => {
    console.log(action.type);
    if (action.type == JOIN_EXAM) {
        console.log("TEST1");
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
        return { ...state, examData: action?.data, loading: false, errors: null };
    }
    return state;
}

export default examroomReducer;