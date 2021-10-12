import * as api from 'src/api';
import { CREATE_QUERY, QUERY_ERROR } from 'src/constants/actionType';

export const createQuery = (newQuery) => async (dispatch) => {
    try {
        const { data } = await api.createQuery(newQuery);
        dispatch({ type: CREATE_QUERY, data });
    } catch (error) {
        dispatch({ type: QUERY_ERROR, errors: error.response.data });
        console.log(error);
    }
}