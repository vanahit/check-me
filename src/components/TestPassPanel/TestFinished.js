import React, { Component } from 'react';
import styled from 'styled-components'
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import CompanySvg from '../CompanyProfile/CompanySvg';

const Main = styled.div`
    margin: auto;
    max-width: 1200px;
    min-height: 260px;
    background-color: #F5F5F5;
    color: rgba(16, 5, 41, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    overflow: auto;
    box-sizing: border-box;
`;
const FlexRow = styled.div`
	display: flex;
	flex-direction: ${props => props.dir || 'row'};
	flex-wrap: wrap;
	padding: 30px 16px;
	width: ${props => props.width || '100%'};
	height: ${props => props.height || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
		min-width: 100%;
	}
`;
const FlexChild = styled.div`
	width:  ${props => props.width || '25%'};
	box-sizing: border-box;
		   
	@media screen and (max-width: 1190px) {
		margin: 5px;
		min-width: 100%;
	}
`;

const TestTitle = styled.div`
    font-size: 34px;
    color: #4F9DA6;
`;

const Score = styled.div`
    width: 100%;
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #DCDCDC;
    font-size: 48px;
    color: #4F9DA6;
    box-sizing: border-box;

    @media screen and (max-width: 1190px) {
		margin: 5px;
		min-width: 100%;
	}
`;
const FinishedText = styled.div`
    width: 100%;
    font-size: 24px;
    text-align: center;
`;
const RouterLink = styled.span`
	color: #4F9DA6;
	text-decoration: underline;
`;
const ImageDiv = styled.div`
    width: 150px;
    height: 150px;
`;
class TestFinished extends Component {
    
    render() {
        let company = this.props.companies.filter(company => company.id === this.props.test.companyId);
        console.log(company.image)
		return (
			<Main>
                <FlexRow>
                    <ImageDiv className="image-content image-contentCompany">
					
							{company.image ? <img src={company.image} alt={company.name} /> : <CompanySvg />}
					
					</ImageDiv>
                    <FlexChild width={'calc(100% - 354px)'}>
                       <TestTitle>JS Foundation</TestTitle>
                       <Score>
                           Your Score: {this.props.totalScore}/{this.props.test.totalScore}
                        </Score>
                    </FlexChild>
                    <FlexChild width={'100%'}>
                        <FinishedText>
                            Test finished.{' '}
                            <Link to={`/${this.props.user.firstName}${this.props.user.lastName}/profile`}>
                                <RouterLink>Back to Tests.</RouterLink>
                            </Link>
                        </FinishedText>
                    </FlexChild>
                </FlexRow>
			</Main>
		);
	}
}

function mapStateToProps(state) {
	return {
        companies: state.appReducer.companies,
	}
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestFinished)

