import { FETCH_USER_BY_ID } from "src/constants/actionType";
import * as api from 'src/api';

export const getUserById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUserById(id);

        dispatch({ type: FETCH_USER_BY_ID, data });
    } catch (error) {
        console.log(error);
    }
};
