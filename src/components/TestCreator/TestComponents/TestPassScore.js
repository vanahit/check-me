import React from 'react';
import styled, {css} from 'styled-components'
import { connect } from 'react-redux';
import InvalidScoreFlag from '../TestComponents/InvalidScoreFlag';

const FlexChild = styled.div`
	position: relative;
	box-sizing: border-box;
	width: ${props => props.width || ''};   
	@media screen and (max-width: 1190px) {
		margin: 20px 5px;
		min-width: 98%;
	}
`;
const TestDetails = styled.input`
	width: ${props => props.width || '292px'};
	height: 60px;
	padding-left: 16px;
	color: rgba(79, 157, 166, ${props => props.opacity || '1'});
	font-size: 24px;
	overflow: hidden; 
	border: 1px solid #4F9DA6;
	box-sizing: border-box;
	transition: font-size 0.5s ease-in-out;

	:disabled {
		background-color: white;
	}
	@media screen and (max-width: 1190px) {
		min-width: 100%;
	}
	@media screen and (max-width: 580px) {
		font-size: 16px;
	}
	::-webkit-input-placeholder {color: rgba(79, 157, 166, 0.5)}
	::-moz-placeholder          {color:rgba(79, 157, 166, 0.5)}/* Firefox 19+ */
	:-moz-placeholder           {color:rgba(79, 157, 166, 0.5)}/* Firefox 18- */
	:-ms-input-placeholder      {color:rgba(79, 157, 166, 0.5)}

	${props => props.invalid && css`
		font-size: 22px;
		color: rgba(185, 4, 46, 0.5);
		border-bottom: 1px solid rgba(185, 4, 46, 1);
		::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
		::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
		:-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
		:-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
	`}
`;

const TestPassScore = props => {
	
	const handleChange = (e) => {
        props.getInputValue(e, 'passScore');
    }
    
    const isFilled = (inputValue) => {
        return !inputValue && props.submitted ? true : false;
	}
	
	return (
		<>
			{props.value > props.totalScore && <InvalidScoreFlag />}
			<FlexChild width={'300px'}>
				<TestDetails
					type='number'
					value={props.value}
					placeholder={'Passing Score'}
					onChange={handleChange}
					invalid = {isFilled(props.value)}  
				/>
			</FlexChild >
	 </>					       
	);
}


function mapStateToProps(state) {
	return {
		submitted: state.testCreator.submitted,
		totalScore: state.testCreator.totalScore,
		questionsCount: state.testCreator.questions.length,
    }
}

export default connect(mapStateToProps, null)(TestPassScore)