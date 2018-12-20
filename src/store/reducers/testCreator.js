import {CHANGE_TOTAL_SCORE, SUBMITTED_TRUE, SUBMITTED_FALSE, ADD_QUESTION, DELETE_QUESTION, 
    ANSWER_VALID, ADD_QUESTION_SUBMITTED, QUESTION_VALID, ANSWER_NOT_VALID, QUESTION_NOT_VALID, 
    TEST_NOT_VALID, TEST_VALID, UPDATE_QUESTIONS, DELETE_STATE_DATA, TEST_CREATED_FALSE, ADD_EDITING_QUESTIONS, EDITING_TEST, DELETE_TEST} from '../actions/actionTypes';

const initialState = {
   questions: [],
   totalScore: 0,
   testCreated: false,
   editingTest: null,
   deletingTest: '',
}

export default function testCreator(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TOTAL_SCORE:
      return {
        ...state,
        totalScore: state.totalScore + action.score,
      }
    case SUBMITTED_TRUE:
      return {
        ...state,
        submitted: true,
    }
    case SUBMITTED_FALSE:
    return {
      ...state,
      submitted: false,
  }
    case ANSWER_VALID:
      return {
        ...state,
        isAnswerValid: true,
    }
    case ANSWER_NOT_VALID:
      return {
        ...state,
        isAnswerValid: false,
      }
    case QUESTION_VALID:
      return {
        ...state,
        isQuestionValid: true,
    }
    case QUESTION_NOT_VALID:
      return {
        ...state,
        isQuestionValid: false,
      }
    case ADD_QUESTION:
      let oneQuestion = {
        id: Date.now(),
        answers: [{ id: Date.now(), title: ''}, { id: Date.now() + 1, title: ''}],
        isRight: 0,
        questionTitle: '',
        score: '',
      }
      return {
        ...state,
        questions: state.questions.concat(oneQuestion),
      }
      case ADD_EDITING_QUESTIONS:
        return {
          ...state,
          questions: action.questions,
      }
      case DELETE_QUESTION:
        return {
          ...state,
          questions: state.questions.filter(question => question.id !== action.id),
          totalScore: state.totalScore - action.score,
        }
      case ADD_QUESTION_SUBMITTED:
        return {
          ...state,
          addQuestionSubmitted: true,
        }
     
      case TEST_NOT_VALID:
        return {
          ...state,
          testValid: false,
      }

      case TEST_VALID:
        return {
          ...state,
          testValid: true,
      }

      case UPDATE_QUESTIONS:
        return {
          ...state,
          questions: action.questions,
        }

      case DELETE_STATE_DATA:
        return {
          questions: [],
          totalScore: 0,
          editingTest: null,
          deletingTest: null,
          testCreated: true
      }
      case TEST_CREATED_FALSE:
        return {
          ...state,
          testCreated: false,
      }
      case EDITING_TEST:
        return {
          ...state,
          editingTest: action.test
        }
      case DELETE_TEST:
        return {
          ...state,
          deletingTest: action.testId
        }
      default:
        return state
    }
} 
