import React, {Component} from 'react';
import CompanyTests from './CompanyTests';
import styled from 'styled-components';
import CompanySvg from '../CompanyProfile/CompanySvg';
import PopUpLogin from '../PopUps/PopUpLogin';

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

export default class CompaniesInUser extends Component {
	constructor(props){
		super(props)
		this.state={
			testAddClicked: false
		}
	}
	testAddClicked = () => {
        this.setState({ testAddClicked: !this.state.testAddClicked });
    };
	render(){
		return(
			<Main>
			{this.state.testAddClicked && <PopUpLogin testAddClicked={this.testAddClicked} />}
			{this.props.item && <div className="containerUser">
				<nav className="bar">
					<span>Profile</span>
				</nav>
				<div className="userContent">
				<FlexContainer>
					<div className="imgDiv image-content image-contentCompany">
						<UserSvgDiv className="image-content">
							{this.props.item.image ? <img src={this.props.item.image} alt="User" /> : <CompanySvg />}
						</UserSvgDiv>
					</div>
					<div className="infoUser">
						<h2>{this.props.item.name}</h2>
						<div className="desc">
							{this.props.item.description}
						</div>
					</div>
				</FlexContainer>
				</div>
				<div className="labelHeader">Company Tests</div>
		 <CompanyTests 
					 testAddClicked={this.testAddClicked}
					 userTestAdded={this.props.userTestAdded}
					 user={this.props.user} 
					 item={this.props.item}
					/> 
			</div>
			}
			</Main>
			
		);	
	}

}