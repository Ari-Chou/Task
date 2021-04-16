import * as actionTypes from './actionTypes';
import * as authorApi from '../../api/authorApi';


export function loadAuthors() {
    return function (dispatch) {
        return authorApi.getAuthors().then(authors => {
            dispatch({ type: actionTypes.LOAD_AUTHORS_SUCCESS, authors })
        }).catch(error => {
            throw error;
        })
    }
}
