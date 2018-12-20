import React from 'react';
import styled, {css} from 'styled-components'
import { connect } from 'react-redux';

const Description = styled.textarea`
	width: 100%;
	height: 120px;
	padding: 16px;
	color: #4F9DA6;
	font-size: 24px;
	border: 1px solid #4F9DA6;
	box-sizing: border-box;
	transition: font-size 0.5s ease-in-out;
	
	@media screen and (max-width: 1190px) {
		margin: 0 5px;
		max-width: 98%;
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
		transition: font-size 0.5s ease-in-out;
		color: rgba(185, 4, 46, 0.5);
		border-bottom: 1px solid rgba(185, 4, 46, 1);
		::-webkit-input-placeholder {color: rgba(185, 4, 46, 0.5)}
		::-moz-placeholder          {color: rgba(185, 4, 46, 0.5)}/* Firefox 19+ */
		:-moz-placeholder           {color: rgba(185, 4, 46, 0.5)}/* Firefox 18- */
		:-ms-input-placeholder      {color: rgba(185, 4, 46, 0.5)}
	`}
`;

const TestDescription = props => {

	const handleChange = (e) => {
		props.getInputValue(e, 'description');
	}

	return (
		<Description
			value={props.value}
			placeholder='Description' 
			onChange={handleChange} 
			invalid = {props.isFilled(props.value)}
		/>		
	);
}

function mapStateToProps(state) {
	return {
		submitted: state.testCreator.addQuestionSubmitted,
	}
}

export default connect(mapStateToProps, null)(TestDescription)