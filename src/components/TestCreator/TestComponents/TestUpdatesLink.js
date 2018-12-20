import styled  from 'styled-components';
import React from 'react';
import {NavLink} from "react-router-dom";

const AllDiv = styled.div`
	margin-top: 130px;
	font-size: 24px;
	padding-bottom: 30px;
	border-bottom: 1px solid #D6D6D6;
`;
const LinkDiv = styled(NavLink)`
	background-color: white;
	z-index: 2;
	top: 0px;
	overflow: hidden;
	width: 1200px;
	text-decoration: none;
	color: #201C16; 

	:hover, :active {
		text-decoration: underline;
	}
`;

export default function TestUpdateLink (props) {
    return (
		<AllDiv>
			<LinkDiv to={`/${props.user.name}/profile`}> My Account </LinkDiv> 
				/ {' '}
			<LinkDiv to={`/${props.user.name}/tests`}> My Tests </LinkDiv> 
				/ {' '}	
			<LinkDiv to={`/${props.user.name}/edit-test`}> Test Update  </LinkDiv>
		</AllDiv>
				
	);
}
