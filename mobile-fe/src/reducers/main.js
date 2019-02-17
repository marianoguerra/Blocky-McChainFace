import { SET_CAR } from '../actions/actionTypes';

const initialState = {
    car: null,
}

export default function main(state = initialState, action) {
    switch (action.type) {
        case SET_CAR:
            return {
                ...state,
                car: action.car
            }

        default:
            return state;
    }
}
