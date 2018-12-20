import React from 'react';
import styled from 'styled-components'
import forUserImg from '../../../images/for-user-bg.jpg';
import CheckBox from './CheckBox';
import { NavLink } from 'react-router-dom';

const GetStartedDiv = styled.div`
    color: white;
    width: 100%;   
    text-align: right;
    margin-top: 115px;
    padding: 16px;
    background-color: rgba(20, 18, 24, 0.75);
    font-size: 24px;
    box-sizing: border-box;	
`;

const FlexChild = styled.div`
    position: relative;
    width: 49%;
	width: ${props => props.width || ''};  
    box-sizing: border-box; 
    
	@media screen and (max-width: 1190px) {
		margin: 20px 5px;
		min-width: 100%;
	}
`;


const Button = styled(NavLink)`
    display: inline-block; 
    padding: 16px 42px;
    border: 0;
    border-radius: 4px;
    background-color:rgba(255, 89, 89, 1);
    color: white;
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
`;

const TitleWhite = styled.div`
    padding: 100px 16px 16px 16px;
    color: white;
    font-size: 48px;
    font-weight: bold;
    box-sizing: border-box;
   
`;
const BlackShadow = styled.div`
    width: 100%;
    background-color: rgba(20, 18, 24, 0.5);
`;
const Block = styled.div`
    position: relative;
    width: 100%;
    background-image: url(${forUserImg});
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    box-sizing: border-box;
`;

const BecomeUser = () => {
    return (
        <FlexChild>
            <Block>
                <BlackShadow>
                    <TitleWhite>
                        FOR USER
                            </TitleWhite>
                    <CheckBox>Register</CheckBox>
                    <CheckBox>Complete Tests</CheckBox>
                    <CheckBox>Recieve Invitations from Leading Companies</CheckBox>

                    <GetStartedDiv>
                        <Button width={'228px'} to='/autorization-user'>
                            BECOME USER
                                </Button>
                    </GetStartedDiv>
                </BlackShadow>
            </Block>
        </FlexChild>

    );

}

export default BecomeUser;
