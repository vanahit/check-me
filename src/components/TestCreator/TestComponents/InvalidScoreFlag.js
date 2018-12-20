import styled  from 'styled-components';
import React from 'react';

const InvalidScoreText = styled.div`
		position: absolute;
		padding: 5px 10px;
		left: 310px;
		bottom: 62px;
		border: 1px solid rgba(185, 4, 46, 1);
		color: rgba(185, 4, 46, 0.7);
		font-size: 14px;
		background-color: rgba(79, 157, 166, 0.2);
		border-radius: 4px;
		z-index: 1;

		@media screen and (max-width: 1188.5px) {
			font-size: 12px;
			left: 10px;
			bottom: 160px;
		}
`;
const Trinagle = styled.div`
		position: absolute;
		top: 26px;
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 15px solid rgba(185, 4, 46, 1);

		@media screen and (max-width: 1188.5px) {
			font-size: 12px;
			top: 24px;
		}
`;
export default function invalidScoreFlag (props) {
    return (
		<InvalidScoreText>
				<Trinagle ></Trinagle> 
				   must be less then total score
		</InvalidScoreText>
	)
}
