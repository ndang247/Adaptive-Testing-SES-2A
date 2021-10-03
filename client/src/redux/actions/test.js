import { CREATE_TEST } from "src/constants/actionType";
import * as api from 'src/api';

export const createTest = (form) => async (dispatch) => {
    try {
        const { data } = await api.createTest(form);

        dispatch({ type: CREATE_TEST, data });

    } catch (error) {
        console.log(error);
    }
};