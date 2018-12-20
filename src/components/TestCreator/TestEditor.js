import React, { Component } from 'react';
import styled  from 'styled-components'
import { connect } from 'react-redux';
import { addQuestion, addQuestionSubmitted, submittedTrue, updateQuestions, questionNotValid, answerNotValid, deleteStateData, testCreatedFalse, addEditingQuestions, changeTotalScore } from '../../store/actions/testCreator';
import { StickyContainer, Sticky } from 'react-sticky';
import { firebase } from '../../firebase/firebase';
import TestTitle from './TestComponents/TestTitle';
import TestCreatorCompany from './TestComponents/TestCreatorCompany';
import TestType from './TestComponents/TestType';
import TestDeadline from './TestComponents/TestDeadline';
import TestDuration from './TestComponents/TestDuration';
import TestDescription from './TestComponents/TestDescription';
import Button from './TestComponents/Button';
import QuestionEditor from './QuestionCreator/QuestionEditor';
import TestPassScore from './TestComponents/TestPassScore';
import TestTotalScore from './TestComponents/TestTotalScore';
import {Redirect} from "react-router";
import TestUpdateLink from './TestComponents/TestUpdatesLink';
import UpdateSuccessText from './TestComponents/TestUpdateSuccessText';



const Main = styled.div`
	margin: auto;
	max-width: 1200px;
	font-size: 24px;
	overflow: auto;
`;

const FlexRow = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 30px 0;
	justify-content: space-between;
	width: ${props => props.width || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
		min-width: 100%;
	}
`;

const QuestionsDiv = styled.div`
    border-bottom: 1px solid #D6D6D6;
`;

const TestHeader = styled.div`
    border-bottom: 1px solid #D6D6D6;
    
`;
const Stickyheader = styled.div`
	background-color: white;
	z-index:2;
`;

class TestEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
            editingTest: this.props.editingTest,
           	testTitle: '',
			description: '',
			testDeadline: '',
            testType: '',
            passScore: '',
            testDuration: '',
            unmounted: false
        }
     
    }

    getInputValue = (e, field) => {
        let value = e.target.value;
        if (e.target.type === 'number') {
            if (value < 0) {
                value = +value * (-1);
            } else if (value > 0) {
                value = +value;
            } else {
                value = '';
            }
        }
        this.setState({ [field]: value });
    }

    clearWordFromSpaces = (word) => {
		return word.replace(/^[ ]+/g, '').replace(/\s*$/, '');
    }

    isFilled = (inputValue) => {
        return !inputValue && this.props.submitted ? true : false;
    }
    
    addQuestion = () => {
		this.props.addQuestionSubmitted();
	    if (this.testHeaderValidation()) {
           this.props.addQuestion();
           this.props.questionNotValid();
		   this.props.ansnwerNotValid();
		   this.props.testCreatedFalse();
        }
    }

    getQuestionValues = (id, state) => {
		let questions = this.props.questions.map(question => {
			if (question.id === id) {
				question.questionTitle = this.clearWordFromSpaces(state.questionTitle);
				question.isRight = +state.isRight; 
				question.score = state.score;
				question.answers = state.answers;
			}
			return question;
		})
		this.props.updateQuestions(questions);
	}

	testHeaderValidation = () => {
		let state = this.state;
		return state.testTitle 
			&& state.description
			&& state.testDeadline 
			&& state.description 
			&& state.testDuration 
			&& state.testType 
		}
	
    
    postData = () => {
		let db = firebase.database();
		let test = {
				testTitle: this.clearWordFromSpaces(this.state.testTitle),
				description: this.clearWordFromSpaces(this.state.description),
				company: this.props.user.name.toUpperCase(),
				questions: this.props.questions,
                isEditing: false,
                isPassing: false,
                companyId: this.props.user.id,
                totalScore: this.props.totalScore,
                testDeadline: this.state.testDeadline,
                testType: this.state.testType,
                passScore: this.state.passScore,
                testDuration: this.state.testDuration,
                testCreateDate: Date.now(),
                deleted: false,
		};
		let updatedTest = db.ref(`tests`).child(`${this.props.editingTest.id}`);
        updatedTest.set({ ...test });
	}

    submitHandler = () => {
        return new Promise ((resolve, reject) => {
			this.props.submittedTrue();
			resolve(this.props.submitted)
		}).then (() => {
			if (this.testHeaderValidation()
				&& this.state.passScore
				&& (this.state.passScore <= this.props.totalScore)
				&& this.props.isAnswerValid 
				&& this.props.isQuestionValid)  {

				this.postData();
				this.props.deleteStateData();
                if (!this.state.unmounted) {
                    return this.setState({
                            testTitle: '',
                            description: '',
                            testDeadline: '',
                            testType: '',
                            passScore: '',
                            testDuration: '',
                            
                        })
                }
            }
		})
    }
    componentDidMount() {
        if (this.props.editingTest !== null) {
            this.setState({ 
                editingTest: this.props.editingTest,
                testTitle: this.props.editingTest.testTitle,
                description: this.props.editingTest.description,
                testDeadline: this.props.editingTest.testDeadline,
                testType: this.props.editingTest.testType,
                passScore: this.props.editingTest.passScore,
                testDuration: this.props.editingTest.testDuration,
        })
        this.props.addEditingQuestions(this.state.editingTest.questions);
        this.props.changeTotalScore(this.state.editingTest.totalScore)
        }
    }

    componentWillUnmount () {
        this.props.deleteStateData();
        this.props.testCreatedFalse();
        this.setState({unmounted: true});
    }

	render() {
		return (
			(this.props.user && this.props.user.type === "company" ) ?
			  <Main>
                {this.state.editingTest ? 
                <div>
                    <TestUpdateLink user={this.props.user} />
                    <StickyContainer>
                        {!this.props.testCreated ?
                        <div>
                            <TestHeader>
                                <FlexRow>
                                    <TestTitle
                                        getInputValue={this.getInputValue}
                                        value={this.state.testTitle}
                                        isFilled={this.isFilled}
                                    />
                                    <TestCreatorCompany 
                                        value={this.props.user && this.props.user.name}
                                    />
                                    <TestType 
                                        getInputValue={this.getInputValue}
                                        value={this.state.testType}
                                        isFilled={this.isFilled} 
                                    />
                                </FlexRow>
                                <FlexRow>
                                    <TestDescription 
                                        getInputValue={this.getInputValue}
                                        value={this.state.description}
                                        isFilled={this.isFilled}
                                    />
                                </FlexRow>
                                <Sticky>
                                    {({	style, }) => (
                                    <Stickyheader style={style} isSticky={true} bottomOffset={200}>
                                    <FlexRow >	
                                        <TestDeadline 
                                            getInputValue={this.getInputValue}
                                            value={this.state.testDeadline}
                                            isFilled={this.isFilled} 
                                        />
                                        <TestDuration
                                            getInputValue={this.getInputValue}
                                            value={this.state.testDuration}
                                            isFilled={this.isFilled}  
                                        />
                                    
                                        <Button onClick={this.addQuestion} >ADD QUESTION</Button>
                                    </FlexRow>
                                    </Stickyheader>
                                )}
                                </Sticky>
                                </TestHeader>
                                {this.props.questions.length > 0 && 
                                    <div>
                                        <QuestionsDiv>
                                            {this.props.questions.map((question, index) =>
                                                <QuestionEditor
                                                    key={question.id + index}
                                                    id={question.id}
                                                    question={question}
                                                    count={index + 1}
                                                    isFilled={this.isFilled}
                                                    clearWordFromSpaces={this.clearWordFromSpaces}
                                                    getQuestionValues={this.getQuestionValues}  
                                                />
                                            )}
                                        </QuestionsDiv>
                                        <FlexRow>
                                            <TestTotalScore />
                                            <TestPassScore
                                                getInputValue={this.getInputValue}
                                                value={this.state.passScore}
                                            />
                                            <Button onClick={this.submitHandler}>
                                                UPDATE TEST
                                            </Button>
                                        </FlexRow>
                                    </div>
                                }
                        </div> 
                        :  <FlexRow> <UpdateSuccessText /> </FlexRow> 
                        }
                    </StickyContainer>
                </div> 
                : "Loader" 
               }
			</Main>
			: <Redirect to='/authorization'/>
		);
	}
}

function mapStateToProps(state) {
	return {
        totalScore: state.testCreator.totalScore,
        submitted: state.testCreator.addQuestionSubmitted,
		questions: state.testCreator.questions,
		isAnswerValid: state.testCreator.isAnswerValid,
		isQuestionValid: state.testCreator.isQuestionValid,
		testCreated: state.testCreator.testCreated,
		editingTest: state.testCreator.editingTest,
	}
}
function mapDispatchToProps(dispatch) {
	return {
        changeTotalScore: (score) => dispatch(changeTotalScore(score)),
        addQuestion: () => dispatch(addQuestion()),
        addEditingQuestions: (questions) => dispatch(addEditingQuestions(questions)),
        addQuestionSubmitted: () => dispatch(addQuestionSubmitted()),
        submittedTrue : () => dispatch(submittedTrue()),
        updateQuestions: (questions) => dispatch(updateQuestions(questions)),
        questionNotValid: () => dispatch(questionNotValid()),
        ansnwerNotValid: () => dispatch(answerNotValid()),
		deleteStateData: () => dispatch(deleteStateData()),
		testCreatedFalse: () => dispatch(testCreatedFalse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestEditor)



