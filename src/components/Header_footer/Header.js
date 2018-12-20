import React from 'react';
import {NavLink} from "react-router-dom";
import styled from 'styled-components';
import * as firebase from "firebase";
import UserIcon from './UserSvg';
import CompanyIcon from './CompanySvg';
import Logo from './LogoSvg';


const LogoDiv = styled.div`
    width: 195px;
    fill: #FFFFFF;
    : hover {
        fill :  #FFAD5A;
    } 
`;

const FlexRow = styled.div`
    display: flex;
    margin: 0 auto;
    min-height: 100px;
    max-width: 1200px;
    align-items: center;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	width: ${props => props.width || '100%'};
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
        flex-direction: column;
        text-align: center;
        min-width: 100%;
    }
   
`;

const LoginLogout = styled(NavLink)`
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 15px 40px;
    border: 1px solid #FFFFFF;  
    text-decoration: none;
     cursor: pointer;

    :active, :hover, :focus {
        border-color: #FFAD5A;
        color: #FFAD5A;
        text-decoration: underline;
    }
    @media screen and (max-width: 1198px) {
        flex-direction: column;
        border: 0;
	}
 `;

const MyAccount = styled(NavLink)`
    margin: 0;
    display: inline-block;
    text-decoration: none;
    fill: white;
    margin-right: 20px;
    color: white; 
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    text-transform: uppercase;

    :active, :hover, :focus {
        color: #FFAD5A;
        fill: #FFAD5A;
        text-decoration: underline;
    }
   
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
const IconSizes = styled.span`
    display: inline-block;
    margin-left: 10px;
    width: 25px;
`;
const Navigation = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    : hover {
        color: #FFAD5A;
        text-decoration: underline;
    }
    &.active{
        color: #FFAD5A;
        fill: #FFAD5A;
        text-decoration: underline;
    }
`;
const Header = (props) => {

    const logOut = () => {
        firebase.auth().signOut().then(function () {
            localStorage.removeItem("current")
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    };

    return (

        <header style={{
            backgroundColor: '#141218',
            width: '100%',
            margin: 0, 
            position: 'fixed',
            zIndex: 4,
            top: 0,
            left: 0       }}>

            <FlexRow>
                <FlexChild width={'200px'}>
                    <NavLink to={'/'}>
                        <LogoDiv ><Logo /></LogoDiv>
                    </NavLink>
                </FlexChild>

                <FlexChild width={'467px'}>
                    <FlexRow>
                        <FlexChild><Navigation exact activeClassName="active"  to={'/tests'}>TESTS</Navigation></FlexChild>
                        <FlexChild><Navigation activeClassName="active"  to={'/companies'}>COMPANIES</Navigation></FlexChild>
                        <FlexChild><Navigation activeClassName="active" to={'/users'}>USERS</Navigation></FlexChild>
                        <FlexChild><Navigation activeClassName="active" to={'/AboutUs'}>ABOUT US</Navigation></FlexChild>
                    </FlexRow>
                </FlexChild>

                {props.user ?
                    <FlexChild >
                         {props.user.type === "company" 
                            ? 

                                <MyAccount  to={`/${props.user.name}/profile`}> 
                                    {props.user.name}
                                    <IconSizes><CompanyIcon /></IconSizes>
                                </MyAccount> 
                            : 
                                <MyAccount to={`/${props.user.firstName}${props.user.lastName}/profile`}> 
                                    {`${props.user.firstName} ${props.user.lastName}`}
                                    <IconSizes><UserIcon /></IconSizes>
                                </MyAccount>
                            }

                            <LoginLogout to={'/authorization'} onClick={() => logOut()}>LOG OUT</LoginLogout>
                        </FlexChild> 
                    : <FlexChild>
                        <LoginLogout to={'/authorization'}>
                            LOG IN
                        </LoginLogout> 
                    </FlexChild>
                } 
            </FlexRow>
            
        </header>
    )
};


export default Header;
