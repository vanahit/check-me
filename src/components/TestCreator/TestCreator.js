import React, { Component } from 'react';
import styled  from 'styled-components'
import { connect } from 'react-redux';
import { addQuestion, addQuestionSubmitted, submittedTrue, updateQuestions, questionNotValid, answerNotValid, deleteStateData, testCreatedFalse } from '../../store/actions/testCreator';
import { StickyContainer, Sticky } from 'react-sticky';
import { firebase } from '../../firebase/firebase';
import TestTitle from './TestComponents/TestTitle';
import TestCreatorCompany from './TestComponents/TestCreatorCompany';
import TestType from './TestComponents/TestType';
import TestDeadline from './TestComponents/TestDeadline';
import TestDuration from './TestComponents/TestDuration';
import TestDescription from './TestComponents/TestDescription';
import Button from './TestComponents/Button';
import QuestionCreator from './QuestionCreator/QuestionCreator';
import TestPassScore from './TestComponents/TestPassScore';
import TestTotalScore from './TestComponents/TestTotalScore';
import SuccessText from './TestComponents/TestCreateSuccessText';
import {Redirect} from "react-router";
import TestCreateLink from './TestComponents/TestCreatorLink';

const Main = styled.div`
	margin: auto;
	max-width: 1200px;
	font-size: 24px;
	overflow: auto;
	margin-top: 100px;
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

class TestCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			testTitle: '',
			description: '',
			testDeadline: '',
            testType: '',
            passScore: '',
			testDuration: '',

		}
		this.unmounted = false;
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
				...this.state,
				testTitle: this.clearWordFromSpaces(this.state.testTitle),
				description: this.clearWordFromSpaces(this.state.description),
				company: this.props.user.name.toUpperCase(),
				questions: this.props.questions,
				isEditing: false,
				totalScore: this.props.totalScore,
				companyId: this.props.user.id,
				isPassing: false,
				testCreateDate: Date.now(),
                deleted: false,
		};
		
		db.ref('tests').push({...test })
	}

    submitHandler = () => {
		this.unmounted = false;
		return new Promise ((resolve, reject) => {
			this.props.submittedTrue();
			resolve(this.props.submitted)
		}).then(() => {
			if (this.testHeaderValidation()
				&& this.state.passScore
				&& (this.state.passScore <= this.props.totalScore)
				&& this.props.isAnswerValid 
				&& this.props.isQuestionValid) {

				this.postData();
				this.props.deleteStateData();
				if (!this.unmounted) {
					this.setState({
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
	
	componentWillUnmount () {
        this.props.deleteStateData();
		this.props.testCreatedFalse();
		this.unmounted = true;
    }
	
    render() {
		return (
			(this.props.user && this.props.user.type === "company") ?
			  <Main>
				<TestCreateLink  user={this.props.user} />
				<StickyContainer>
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
						<Stickyheader style={style} isSticky={true} bottomOffset={50}>
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
				{!this.props.testCreated && this.props.questions.length > 0 && 
					<>
						<QuestionsDiv>
							{this.props.questions.map((question, index) =>
								<QuestionCreator
									key={question.id + index}
									id={question.id}
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
								CREATE TEST
							</Button>
						</FlexRow>
						</> 
                }

                <FlexRow>
                   {this.props.testCreated && <SuccessText/>} 
                </FlexRow>
				</StickyContainer>
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
	}
}
function mapDispatchToProps(dispatch) {
	return {
		
        addQuestion: () => dispatch(addQuestion()),
        addQuestionSubmitted: () => dispatch(addQuestionSubmitted()),
        submittedTrue : () => dispatch(submittedTrue()),
        updateQuestions: (questions) => dispatch(updateQuestions(questions)),
        questionNotValid: () => dispatch(questionNotValid()),
        ansnwerNotValid: () => dispatch(answerNotValid()),
		deleteStateData: () => dispatch(deleteStateData()),
		testCreatedFalse: () => dispatch(testCreatedFalse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestCreator)



