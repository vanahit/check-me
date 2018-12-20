import React, { Component } from 'react';
import styled from 'styled-components'
import Timer from './Timer';
import img from '../../images/testPassPanelBg.jpg'

const Main = styled.div`
	margin: auto;
	margin-top: 45px;
	margin-bottom: 45px;
	max-width: 1200px;
	font-size: 24px;
	color: white;
	overflow: none;
`;
const FlexRow = styled.div`
	display: flex;
	flex-direction: ${props => props.dir || 'row'};
	flex-wrap: wrap;
	margin: 16px 0;
	justify-content: space-between;
	align-items: center;
	width: ${props => props.width || '100%'};
	height: ${props => props.height || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
		min-width: 100%;
	}
`;
const FlexChild = styled.div`
	width:  ${props => props.width || '25%'};
	border-radius: 4px;
	box-sizing: border-box;
		   
	@media screen and (max-width: 1190px) {
		margin: 5px;
		min-width: 100%;
	}
`;
const FlexChildAnswer = styled.div`
	padding: 16px 32px;
	word-wrap: break-word;
	text-align: center;
	background-color: #4F9DA6;
	border-radius: 4px;
	width:  ${props => props.width || '25%'};
	min-height: 60px;
	box-sizing: border-box;
		   
	@media screen and (max-width: 1190px) {
		margin: 5px;
		min-width: 100%;
	}
	:hover {
		background-color: #3A7C84;
	}
`;
const QuestionNumber = styled.div`
	padding-left: 144px;
	font-size: 24px;
	color: rgba(16, 5, 41, 1);
	height: 44px;
	width: 100%;
	text-align: center;
	line-height: 44px;
	box-sizing: border-box;
`;
const AnswerTitle = styled.div`
	position: relative;		
	padding: 32px 16px;
	background-image: url(${img});
    background-position: center; 
 	background-repeat: no-repeat; 
	width: 100%;
	min-height: 200px;
	box-sizing: border-box;

	::before {
		position: absolute;
		left: 0px;
		top: 0px;
		background-color: rgba(20, 18, 24, 0.8);
		content: '';
		min-height: 200px;
		width: 100%;
	  }
`;

const AnswerText = styled.span`
	  position: absolute;
	  z-index: 1;
	  color: white;
`;

class TestPasser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			testData: this.props.test,
			currentQuesion: this.props.test.currentQuestionIndex && this.props.test.currentQuestionIndex
				? this.props.test.questions[this.props.test.currentQuestionIndex]
				: this.props.test.questions[0],
		}

		this.id = this.props.test.currentQuestionIndex ? this.props.test.currentQuestionIndex : 0;
	}

	changeCurrentQuesion = (id) => {
		this.setState({ currentQuesion: this.state.testData.questions[id] });
	}

	sortRandomAnswers = () => {
		function sortRandom(a, b) {
			return Math.random() - 0.5;
		}
		if (this.state.currentQuesion.answers) {
			let answers = this.state.currentQuesion.answers;
			return answers.sort(sortRandom);
		}
	}

	choosedAnswer = (e) => {
		if (+e.target.id === this.state.currentQuesion.isRight) {
			this.props.totalScore(this.state.currentQuesion.score);
		}

		if (this.id < this.state.testData.questions.length - 1) {
			this.id++;
			this.props.getCurrentIndex(this.id);
			this.changeCurrentQuesion(this.id);
			this.sortRandomAnswers();
		} else {
			this.props.testEnded();
			this.props.getCurrentIndex(this.id + 1);
		}
	}
	componentWillUnmount() {
		this.props.testEnded();
	}

	render() {

		let questions = this.state.testData.questions;
		let answers = this.state.currentQuesion.answers;

		return (
			<Main>
				{this.state.testData
					? <div>
						<FlexRow>
							<FlexChild width={'calc(100% - 144px)'}>
								<QuestionNumber>
									Question {this.id + 1}/{questions.length}
								</QuestionNumber>
							</FlexChild>
							<FlexChild width={'144px'}>
								<Timer
									time={this.props.time}
									testEnded={this.props.testEnded}
									getTime={this.props.getTime}
								/>
							</FlexChild>
						</FlexRow>
						<FlexRow >
							<FlexChild width={'100%'}>
								<AnswerTitle>
									<AnswerText>
										{questions.length && this.state.currentQuesion.questionTitle}
									</AnswerText>
								</AnswerTitle>
							</FlexChild>
						</FlexRow>
						{
							answers.map((answer, index) => (

								<FlexRow key={`answer${index}`}>
									<FlexChildAnswer
										width={'100%'}
										id={answer.id}
										onClick={this.choosedAnswer}
									>
										{answer.title}
									</FlexChildAnswer>
								</FlexRow>
							))
						}
					</div>

					: 'LOADER'
				}
			</Main>
		);
	}
}

export default TestPasser;

