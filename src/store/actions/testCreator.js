import {CHANGE_TOTAL_SCORE, SUBMITTED_TRUE, SUBMITTED_FALSE, DELETE_QUESTION, ADD_QUESTION, ADD_QUESTION_SUBMITTED,
   ANSWER_VALID, ANSWER_NOT_VALID, QUESTION_VALID, QUESTION_NOT_VALID, 
   TEST_VALID, TEST_NOT_VALID, UPDATE_QUESTIONS, DELETE_STATE_DATA, TEST_CREATED_FALSE, ADD_EDITING_QUESTIONS, EDITING_TEST, DELETE_TEST} from './actionTypes'

export function changeTotalScore(score) {
  return {
    type: CHANGE_TOTAL_SCORE,
    score
   }
}

export function submittedTrue() {
  return {
    type: SUBMITTED_TRUE,
   
  }
}
export function submittedFalse() {
  return {
    type: SUBMITTED_FALSE,
   
  }
}

export function addQuestion() {
  return {
    type: ADD_QUESTION,
  }
}

export function addEditingQuestions(questions) {
  return {
    type: ADD_EDITING_QUESTIONS,
    questions
  }
}

export function deleteQuestion(id, score) {
  return {
    type: DELETE_QUESTION,
    id,
    score,
  }
}

export function addQuestionSubmitted() {
  return {
    type: ADD_QUESTION_SUBMITTED,
    
  }
}

export function answerValid() {
  return {
    type: ANSWER_VALID,
  }
}
export function answerNotValid() {
  return {
    type: ANSWER_NOT_VALID,
  }
}

export function questionValid() {
  return {
    type: QUESTION_VALID,
  }
}

export function questionNotValid() {
  return {
    type: QUESTION_NOT_VALID,
  }
}

export function testValid() {
  return {
      type: TEST_VALID,
     
  }
}

export function testNotValid() {
  return {
      type: TEST_NOT_VALID,
     
  }
}
export function updateQuestions(questions) {
  return {
      type: UPDATE_QUESTIONS,
      questions
     
  }
}

export function deleteStateData() {
  return {
    type: DELETE_STATE_DATA,
   
  }
}

export function testCreatedFalse() {
  return {
    type: TEST_CREATED_FALSE,
   
  }
}

export function editingTest(test) {
  return {
    type: EDITING_TEST,
    test
  }
};


export function deleteTest(testId) {
  return {
    type: DELETE_TEST,
    testId
  }
};



