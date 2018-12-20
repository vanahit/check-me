import React, { Component } from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';
import {changeTotalScore, questionValid, questionNotValid, answerNotValid} from '../../../store/actions/testCreator';
import DeleteQuestion from './QuestionComponents/DeleteQuestion';
import QuestionScore from './QuestionComponents/QuestionScore';
import QuestionTitle from './QuestionComponents/QuestionTitle';
import AnswersCounter from './QuestionComponents/AnswersCounter';
import QuestionRightAnswer from './QuestionComponents/QuestionRightAnswer';
import DeleteAnswer from '../AnswerCreator/DeleteAnswer';
import OneAnswer from '../AnswerCreator/OneAnswer';
import InvalidRadioFlag from './QuestionComponents/InvalidRadioFlag';

const Question = styled.div`
	margin: 30px 0;
	position: relative;
`;
const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	margin: 15px 0;
	width: ${props => props.width || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-wrap:  ${props => props.wrap || 'wrap'};
		min-width: 100%;
		max-width: 100%;
	}
`;
const FlexChild = styled.div`
	max-width:  ${props => props.maxWidth || '100%'};
	width: ${props => props.width || '100%'};
	box-sizing: border-box;
	@media screen and (max-width: 1190px) {
		min-width: 99%;
	}
`;

class QuestionEditor extends Component {
   	constructor(props) {
		super(props);
  		this.state = {
			id: this.props.id,
			answers: this.props.question.answers,
			isRight: this.props.question.isRight,
			questionTitle: this.props.question.questionTitle,
			score: this.props.question.score,
		}
	}

	isFilled = (inputValue) => {
        return !inputValue && this.props.submitted ? true : false;
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

	getAnswersValues = (id, title) => {
		let answers = this.state.answers.map(answer => {
			if (answer.id === id) {
				answer.title = this.props.clearWordFromSpaces(title);
			}
			return answer;
		})
		this.setState({ answers: answers });
	}

 	answersCountHandler =(actionName, id = '') => {
		if (actionName === 'minus') {
			if (this.state.answers.length > 2) {
				let answers = this.state.answers;
				answers.pop();
				this.setState({answers: answers});
			} 
		}
		if (actionName === 'plus') {
			this.props.ansnwerNotValid();
			let newAnswer = {id: Date.now(), title: ''};
			if (this.state.answers.length < 5) {
				this.setState({answers: this.state.answers.concat(newAnswer)});
			}
		}
		if (actionName === 'delete') {
			if (this.state.answers.length > 2) {
				this.setState( {answers: this.state.answers.filter(answer => answer.id !== id) });
				+this.state.isRight === id && this.setState({isRight: 0});
			}
		}
	}

	isQuestionValid = () => {
		if (this.state.isRight 
			&& this.state.questionTitle
			&& this.state.score
			&& this.props.submitted) {

			this.props.questionValid();
		} else {
			this.props.questionNotValid();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if ((this.props.submitted !== prevProps.submitted) || (this.props.submitted && ( 
			(this.state.questionTitle !== prevState.questionTitle)
			|| (this.state.isRight !== prevState.isRight)
			|| (this.state.score !== prevState.score)
			|| (this.state.answers.length !== prevState.answers.length)
			|| (this.props.questionsCount !== prevProps.questionsCount)))) {

			this.isQuestionValid();
			this.props.getQuestionValues(this.props.id,  this.state);
		}
	}
 	  
    render() {
		return (
			<Question>
				<FlexRow width={'98%'}>
					<FlexChild width={'1068px'}>
						<DeleteQuestion 
							score={this.state.score}
							id={this.state.id}
							count={this.props.count}
						/>
						<QuestionTitle
							count={this.props.count}
							getInputValue={this.getInputValue}
							value={this.state.questionTitle}
							isFilled={this.isFilled} 
						/>
					</FlexChild>
					<QuestionScore 
						getInputValue={this.getInputValue}
						value={this.state.score}
						isFilled={this.isFilled} 
					/>
				</FlexRow>
				<FlexRow width={'98%'} wrap={'wrap-reverse'}>
					<FlexChild maxWidth={'1060px'}>
							{/* answers list */}
						{!this.state.isRight && this.props.submitted && 
							<InvalidRadioFlag count={this.props.count}/>}
							
						{this.state.answers.map((input, index) => (
							<FlexRow key={input.id} width={'100%'}>
								<QuestionRightAnswer 
									getInputValue={this.getInputValue}
                                    id={input.id}
                                    value={input.isRight}
                                    checked={input.id === this.state.isRight ? true : false}
									name={this.state.id}
									count={index + 1}
								/>
								<OneAnswer
									count={index + 1}
                                    id={input.id}
                                    value={input.title}
									isFilled={this.isFilled}
									getAnswersValues={this.getAnswersValues}
								/>
								{this.state.answers.length > 2 
									?	<DeleteAnswer 
											answersCountHandler={this.answersCountHandler}
											id={input.id}	
										/>
									: ''
								}
							</FlexRow>
						))}     
					</FlexChild>
					<AnswersCounter 
						answersCountHandler={this.answersCountHandler}
						answersCount={this.state.answers.length}
					/>
				</FlexRow>			
			</Question>
	    );
  	}
}
function mapStateToProps(state) {
  return {
	 totalScore: state.testCreator.totalScore,
	 submitted: state.testCreator.submitted,
	 questionsCount: state.testCreator.questions.length,
  }
}
function mapDispatchToProps(dispatch) {
  return {
		changeTotalScore: (score) => dispatch(changeTotalScore(score)),
		questionValid: () => dispatch(questionValid()),
		questionNotValid: () => dispatch(questionNotValid()),
		ansnwerNotValid: () => dispatch(answerNotValid()),
		
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEditor)
