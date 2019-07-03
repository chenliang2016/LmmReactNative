import {REQUEST_START,REQUEST_END} from './constants';

export const requestStart = () => {
    return dispatch => {
        dispatch({
            type:REQUEST_START,
        })
    }
};

export const requestEnd =  () => {
    return dispatch => {
        dispatch({
            type:REQUEST_END,
        })
    }

};