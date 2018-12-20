import styled from 'styled-components';
import React from 'react';

const DeleteQuestionText = styled.div`
		position: absolute;
		padding: 5px 10px;
		width: 200px;
		left: calc(50% - 40px );
		top: -30px;
		color: rgba(185, 4, 46, 0.7);
		font-size: 18px;
		border-radius: 4px;
		
`; 
const Trinagle = styled.div`
		position: absolute;
		left: -60px;
		bottom: 0px;
		width: 0;
		height: 0;
		border-left: 25px solid transparent;
		border-right: 25px solid transparent;
		border-top: 25px solid rgba(79, 157, 166, 0.5);
`;

export default function questionDeleteFlag (props) {
    return (
		<DeleteQuestionText >
				<Trinagle ></Trinagle> 
				  delete question {props.count}
		</DeleteQuestionText >
	)
}
