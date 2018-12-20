
import { GET_TESTS_STARTED, 
  GET_TESTS_SUCCESS, 
  GET_USERS_STARTED, 
  GET_USERS_SUCCESS, 
  GET_COMPANIES_STARTED, 
  GET_COMPANIES_SUCCESS, 
  ADD_USER_TEST,
  DELETE_USER_TEST,
  ADD_PASSING_TEST,


} from '../actions/actionTypes';
  
  const initialState = {
    testsLoaded: false,
    usersLoaded: false,
    companiesLoaded: false,
    tests: [],
    companies: [],
    users: [],
    userLogin: false,
    userType: '',
    addedTest: null,
    passingTest: null,
  };
  
  export default function appReducer(state = initialState, action) {
    switch (action.type) {
      
      case GET_TESTS_STARTED:
        return {
          ...state,
          testsLoaded: false,
        };

      case GET_TESTS_SUCCESS:
        return {
          ...state,
          testsLoaded: true,
          tests: action.payload
        };
      case GET_USERS_STARTED:
        return {
          ...state,
          usersLoaded: false,
        };

      case GET_USERS_SUCCESS:
        return {
          ...state,
          usersLoaded: true,
          users: action.payload
        };
      case GET_COMPANIES_STARTED:
        return {
          ...state,
          companiesLoaded: false
        };

      case GET_COMPANIES_SUCCESS:
        return {
          ...state,
          companiesLoaded: true,
          companies: action.payload
        };
      case ADD_USER_TEST:
        return {
          ...state,
          addedTest: action.test
        }
      case DELETE_USER_TEST:
        return {
          ...state,
          addedTest: null,
        }
      case ADD_PASSING_TEST:
        return {
          ...state,
          passingTest: action.test,
        }
  
      default:
        return state;
    }
  }