import React from 'react';
import { NavLink, Route } from "react-router-dom";
import UserProfile from './UserProfile';
import UserTests from "./UserTests";
import { Redirect } from "react-router";
import styled from 'styled-components';

const Main = styled.div`
	box-sizing: border-box;
`;
export default function User(props) {
	return (
		(props.user && props.user.type === "user") ?
			<Main>
				<div className="containerUser">
					<nav className="tabBar">
						<NavLink exact activeClassName="active" to={`/${props.user.firstName}${props.user.lastName}/profile`}  >Profile</NavLink>
						<NavLink activeClassName="active" to={`/${props.user.firstName}${props.user.lastName}/tests`}  >My Tests</NavLink>
					</nav>
					<Route path="/:user/profile" component={() => <UserProfile user={props.user} />} />
					<Route path="/:user/tests" component={() => <UserTests user={props.user} />} />
					
				</div>
			</Main> 
			:
			<Redirect to='/authorization' />
	);
}
