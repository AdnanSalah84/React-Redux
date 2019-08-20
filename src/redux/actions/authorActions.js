import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";



export function loadAuthorsSucess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
    return function (dispatch) {
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSucess(authors));
        }).catch(error => {
            throw error;
        })
    }
}