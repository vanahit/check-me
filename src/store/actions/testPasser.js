import {DELETE_TEST, ADD_TEST, GET_TEST_SUCCESS} from './actionTypes'

export function deleteTest() {
    return {
        type: DELETE_TEST,
    }
}

export function addTest(test) {
    return {
        type: ADD_TEST,
        test
    }
}

export function getTestSuccess() {
    return {
        type: GET_TEST_SUCCESS,
        
    }
}
