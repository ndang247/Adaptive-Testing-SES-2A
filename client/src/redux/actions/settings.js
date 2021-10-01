import { USER_SETTINGS } from "src/constants/actionType";
import * as api from 'src/api';

export const userSettings = (email) => async (dispatch) => {
    try {
        const { data } = await api.userSettings(email);

        dispatch({ type: USER_SETTINGS, data });

        //router.push('/user/dashboard');
    } catch (error) {
        console.log(error);
    }
};
