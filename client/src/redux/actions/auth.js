import { LOGIN, REGISTER } from "src/constants/actionType";
import * as api from 'src/api';

export const login = (form, router) => async (dispatch) => {
    try {
        const { data } = await api.login(form);

        dispatch({ type: LOGIN, data });

        router.push('/user/dashboard');
    } catch (error) {
        console.log(error);
    }
};

export const register = (form, router) => async (dispatch) => {
    try {
        const { data } = await api.register(form);

        dispatch({ type: REGISTER, data });

        router.push('/user/dashboard');
    } catch (error) {
        console.log(error);
    }
};

export const hostLogin = (form, router) => async (dispatch) => {
    try {
        const { data } = await api.hostLogin(form);

        dispatch({ type: LOGIN, data });

        router.push('/host/dashboard');
    } catch (error) {
        console.log(error);
    }
};

export const hostRegister = (form, router) => async (dispatch) => {
    try {
        const { data } = await api.hostRegister(form);

        dispatch({ type: REGISTER, data });

        router.push('/host/dashboard');
    } catch (error) {
        console.log(error);
    }
};