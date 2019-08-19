import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
    //debugger;
    switch (action.type) {
        case types.CREATE_COURSE:
            //debugger;
            return [...state, { ...action.course }];
        case types.LOAD_COURSES_SUCCESS:
            return action.courses
        default:
            return state;
    }
}