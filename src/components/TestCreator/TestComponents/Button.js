import styled  from 'styled-components';
import React from 'react';

const AddButton = styled.button`
	width: 234px;
	height: 60px;
	border-radius: 4px;
	border: 0px;
	background-color: #4F9DA6;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
	color: white;
	font-size: 24px;

	transition: width 2s, height 2s, font-size 1s ease-in-out;
	
	@media screen and (max-width: 580px) {
		font-size: 12px;
		width: 120px;
		height: 20x;
	}
`;

const ButtonDiv = styled.div`
	width: 100%;
	text-align: right;
`;
const FlexChild = styled.div`
	position: relative;
	box-sizing: border-box;
	width: ${props => props.width || ''};   
	@media screen and (max-width: 1190px) {
		margin: 10px 5px;
		min-width: 98%;
	}
`;

export default function Button (props) {
	return (
		<FlexChild width={'48%'}>
			<ButtonDiv>
				<AddButton 
					type='button' 
					onClick={props.onClick}
				>
					{props.children}
				</AddButton>
			</ButtonDiv>
		</FlexChild>							
	);
}
