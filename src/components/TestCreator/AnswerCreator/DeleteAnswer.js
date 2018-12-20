import React from 'react';
import styled from 'styled-components'
import {connect} from 'react-redux';

const DeleteAnswerButton = styled.button`
		margin: 8px 8px;
		width: 40px;
		height: 40px;
		color:rgba(230, 36, 22, 1);
		font-size: 24px;
		background-color: white;
		border: 1px solid rgba(231, 231, 231, 1);
`;

const DeleteAnswer = props => {
    return ( 
      <DeleteAnswerButton 
          type='button'
          onClick={() => props.answersCountHandler('delete', props.id)}
      >
      X 
      </DeleteAnswerButton> 
    );
}

function mapStateToProps(state) {
  return {
	 submitted: state.testCreator.submitted,
  }
}

export default connect(mapStateToProps, null)(DeleteAnswer)