import {
    SET_CAR,
} from './actionTypes';

export const setCar = payload => ({ type: SET_CAR, ...payload });