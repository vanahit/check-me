import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';

const Radio = styled.input`
	margin: 16px 5px;
	width: 22px;
	height: 22px;

	:before {
		width: 21px;
		height: 21px;
		border-radius: 15px;
		top: -1px;
		left: -1px;
		position: relative;
		background-color: white;
		content: '';
		display: inline-block;
		visibility: visible;
		border: 1px solid rgba(79, 157, 166, 1);
	}
	:checked:after {
		width: 11px;
		height: 11px;
		border-radius: 15px;
		top: -22px;
		left: 4px;
		position: relative;
		background-color: rgba(79, 157, 166, 1);
		content: '';
		display: inline-block;
		visibility: visible;
		border: 1px solid rgba(79, 157, 166, 1);
	}
`;

const QuestionRightAnswer = props => {
   const handleChange = (e) => {
     props.getInputValue(e, 'isRight');
		}
		
    return ( 
        <>
          <Radio
            type='radio'
            name={props.name} 
						value={props.id}
						defaultChecked={props.checked} 
            onClick={handleChange}
          />
        </>
      );
  }

function mapStateToProps(state) {
  return {
	 submitted: state.testCreator.submitted,
  }
}

export default connect(mapStateToProps, null)(QuestionRightAnswer)