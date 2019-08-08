import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
    //debugger;
    switch (action.type) {
        case types.CREATE_COURSE:
            //debugger;
            return [...state, { ...action.course }];
        default:
            return state;
    }
}