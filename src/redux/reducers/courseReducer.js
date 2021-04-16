import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';


export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case actionTypes.CREATE_COURSE_SUCCESS:
            return [...state, { ...action.course }];
        case actionTypes.UPLOAD_COURSES_SUCCESS:
            return state.map(course => { // return a new array. we replace the element with the matching course.id.
                course.id === action.course.id ? action.course : course
            })
        case actionTypes.LOAD_COURSES_SUCCES:
            return action.courses;
        default:
            return state;
    }
}