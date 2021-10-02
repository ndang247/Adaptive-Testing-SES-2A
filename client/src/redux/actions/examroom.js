import { JOIN_EXAM } from 'src/constants/actionType';
import * as api from 'src/api';

export const joinExam = (form, router) => async (dispatch) => {
    try {
        console.log("TEST3");
        const { data } = await api.joinexam(form);

        dispatch({ type: JOIN_EXAM, data });

        router.push('/user/dashboard');
    } catch (error) {
        console.log(error);
        console.log("TEST4");
    }
};
