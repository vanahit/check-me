import styled from 'styled-components';
import React from 'react';

const RadioText = styled.div`
		position: absolute;
		padding: 5px 10px;
		left: 0px;
		top: 65px;
		color: rgba(185, 4, 46, 0.7);
		font-size: 14px;
		border: 1px solid rgba(185, 4, 46, 1);
		background-color: rgba(79, 157, 166, 0.2);
		border-radius: 4px;
		transition: top 0.5s ;

		@media screen and (max-width: 1188.5px) {
			font-size: 12px;
			left: 10px;
			top: 380px;
		}		
`;
const Trinagle = styled.div`
		position: absolute;
		top: 27px;
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 15px solid rgba(185, 4, 46, 1);

		@media screen and (max-width: 1190px) {
			left: 0px;
			top: 25px;
		}	
`;
export default function InvalidRadioFlag (props) {
    return (
		<RadioText>
				<Trinagle></Trinagle> 
				  choose right answer of question {props.count}
		</RadioText>
	)
}
