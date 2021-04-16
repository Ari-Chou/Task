import * as actionTypes from './actionTypes';
import * as courseApi from '../../api/courseApi';

// Load courses from db and dipatch the action to modify the store state.
export function loadCourses() {
    return function (dispatch) {
       return courseApi.getCourses().then((courses) => { // you should return 
            dispatch({ type: actionTypes.LOAD_COURSES_SUCCES, courses })
        }).catch(error => {
            throw error;
        })
    }
}

// save course to db base on the course id to upload or create new.
function uploadCourseSuccess(course) {
    return {type: actionTypes.UPLOAD_COURSES_SUCCESS, course}
}

function createCourseSuccess(course) {
    return {type: actionTypes.CREATE_COURSE_SUCCESS, course}
}
export function saveCourse(course) {
    return function (dispatch, getState) {
        return courseApi.saveCourse(course).then((savedCourse) => {
            course.id ? dispatch(uploadCourseSuccess(savedCourse)) :dispatch(createCourseSuccess(savedCourse)) 
        })
    }
}