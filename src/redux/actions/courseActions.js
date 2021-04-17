import * as actionTypes from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

// Load courses from db and dipatch the action to modify the store state.
export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall())
       return courseApi.getCourses().then((courses) => { // you should return 
            dispatch({ type: actionTypes.LOAD_COURSES_SUCCESS, courses })
        }).catch(error => {
            throw error;
        })
    }
}

// save course to db base on the course id to upload or create new.
export function updateCourseSuccess(course) {
    return {type: actionTypes.UPDATE_COURSE_SUCCESS, course}
}

export function createCourseSuccess(course) {
    return {type: actionTypes.CREATE_COURSE_SUCCESS, course}
}

export function saveCourse(course) {
    return function(dispatch, getState) {
      return courseApi
        .saveCourse(course)
        .then(savedCourse => {
          course.id
            ? dispatch(updateCourseSuccess(savedCourse))
            : dispatch(createCourseSuccess(savedCourse));
        })
        .catch(error => {
          console.log("!!!!!!!!!!!!!!!!!!!", error);
          throw error;
        });
    };
}
  

// delete course from db
export function deleteCourseOptimistic(course) {
  return { type: actionTypes.DELETE_COURSE_OPTIMISTIC, course };
}

export function deleteCourse(course) {
  return function(dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}