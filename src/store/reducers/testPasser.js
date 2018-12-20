import {DELETE_TEST, ADD_TEST, GET_TEST_SUCCESS} from '../actions/actionTypes';

const initialState = {
    testDetails: 'no',
    testLoaded: false,
}

export default function testPasser(state = initialState, action) {
    switch (action.type) {
        case DELETE_TEST:
            return {
                ...state,
                testDetails: {},
            }
        case ADD_TEST:
            return {
                ...state,
                testDetails: action.test,
            }
        case GET_TEST_SUCCESS:
            return {
            testLoaded: true,
        }
        default:
            return state
    }
}
  