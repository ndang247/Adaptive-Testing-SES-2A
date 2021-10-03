import { CREATE_TEST } from "src/constants/actionType";

const testReducer = (state = { testData: null, loading: false, errors: null }, action) => {
    switch (action.type) {
        case CREATE_TEST:
            return { ...state, testData: action?.data, loading: false, errors: null };
        default:
            return state;
    }
}

export default testReducer;