import { FETCH_USER_BY_ID, SETTING_ERROR, UPDATE_USER } from "src/constants/actionType";
import * as api from 'src/api';

export const getUserById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUserById(id);

        dispatch({ type: FETCH_USER_BY_ID, data });
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = (id, form) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, form);

        dispatch({ type: UPDATE_USER, data });
    } catch (error) {
        dispatch({ type: SETTING_ERROR, errors: error.response.data });
        console.log(error);
    }
}
