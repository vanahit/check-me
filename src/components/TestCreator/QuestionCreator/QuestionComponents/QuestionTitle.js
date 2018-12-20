import React from 'react';
import styled, {css} from 'styled-components'
import { connect } from 'react-redux';

const FlexChild = styled.div`
	position: relative;
	box-sizing: border-box;
	width: ${props => props.width || ''};   
	@media screen and (max-width: 1190px) {
		margin: 10px 5px;
		min-width: 98%;
	}
`;
const QuestionDetails = styled.textarea`
	padding: 16px 16px;
	width: ${props => props.width  || 'calc(100% - 16px)'};
	height: 60px;
	padding-left: 16px;
	color: #4F9DA6;
	font-size: 24px;
	overflow: hidden; 
	border: 1px solid #4F9DA6;
	box-sizing: border-box; 
	transition: font-size 0.5s ease-in-out;
	
	@media screen and (max-width: 1190px) {
		margin: 10px 5px;
		max-width: 99%;
	}
	@media screen and (max-width: 580px) {
		font-size: 12px;
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

const QuestionTitle = props => {

	const handleChange = (e) => {
      props.getInputValue(e, 'questionTitle');
	}
	
	return (
		<FlexChild>
			<QuestionDetails
				type='text' 
				value={props.value}
				placeholder={`${props.count}. Question title`} 
				onChange={handleChange} 
				invalid = {props.isFilled(props.value)}
			/>
		</FlexChild>					
	);
}


function mapStateToProps(state) {
	return {
		submitted: state.testCreator.submitted,
	}
}

export default connect(mapStateToProps, null)(QuestionTitle)