import React from 'react';
import PassedTests from '../PassedTests';
import styled from 'styled-components';
import UserSvg from '../UserProfile/UserSvg';

const UserSvgDiv = styled.div`
	margin: 0px auto;
	margin-right: 20px;
	width: 250px;
	:hover {
		fill: #FF5959;
	}
`;
const Main = styled.div`
	padding-top: 77px;
	box-sizing: border-box;
`;

const FlexContainer = styled.div`
	display: flex;
	
	@media screen and (max-width: 1190px) {
		flex-direction: column;
		align-items: center;
        min-width: 100%;
    }

`;

export default function UserInCompany(props) {

	function skills(arr) {
		return arr.join(', ')
	}
	return (
		<Main>
			{props.item && <div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<FlexContainer className="userContent">
					<UserSvgDiv className="image-content">
						{props.item.image ? <img src={props.item.image} alt="User" /> : <UserSvg />}
					</UserSvgDiv>
					<div className="infoUser">
						<h2>{props.item.firstName} {props.item.lastName} </h2>

						
						<div className="skillsDivUser">
							<span className="gray">Skills: </span>
							<span className="orange"> {skills(props.item.languages)} </span>
						</div>

						<div className="skillsDivUser">
							{props.currentUser && props.currentUser.type === 'company' &&
								<>
									<span className="gray">E-mail: </span>
									<span className="orange"> {props.item.email} </span>
								</>
							}


						</div>
						<div className="desc">
							{props.item.description}
						</div>
					</div>
				</FlexContainer>
				<div className="labelHeader">Companies Tests</div>
				<PassedTests user={props.item} userId={props.userId} currentUser={props.currentUser} />
			</div>}
		</Main>
	);
}
