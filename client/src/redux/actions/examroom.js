import { JOIN_EXAM } from 'src/constants/actionType';
import * as api from 'src/api';

export const joinExam = (form, router) => async (dispatch) => {
    try {
        const { data } = await api.joinexam(form);
        dispatch({ type: JOIN_EXAM, data });

        router.push('/user/exam');
    } catch (error) {
        console.log(error);
    }
};
