import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import close from '../../images/buttonIcons/closeIcon.svg';
import {NavLink} from 'react-router-dom';

const BlackDiv = styled.div`
    position: fixed;
    top: 50%
    left: 50%
    transform: translate(-50%, -50%);
    z-index: 5;
    width: 100vw;
    height: 100vh;
    background-color: rgba(20, 18, 24, 0.50);
`;
const Block = styled.div`
    position: absolute;
    padding: 16px;
    top: calc(50% - 150px);
    left: calc(50% - 300px);
    width: 600px;
    border-radius: 4px;
    background-color: white;
    text-align: center;
    box-sizing: border-box;
  
`;
const TextSpan = styled.div`
    margin-top: 74px;
    font-size: 24px;
    color: #100529;
    padding-bottom: 8px;
    border-bottom: 1px solid #D6D6D6;
`;

const Button = styled(NavLink)`
    display: inline-block; 
    font-size: 20px;
    margin-top: 71px;
    padding: 10px 32px;
    border-radius: 4px;
    border: 0;
    text-decoration: none;
    background-color: #FF5959;
    box-shadow: 0 3px 6px  rgba(0, 0, 0, 0.16);
    color: white;
`;

const Close = styled.button`
    width: 40px;
    height: 40px;
    border: 1px solid #E7E7E7;
    box-shadow: 0 3px 6px  rgba(0, 0, 0, 0.16);
    background-image:url(${close});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20px;
    background-color: transparent;
`;

const Right = styled.div`
    text-align: right;
`;

class PopUpLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

    render() {
		return (
            <BlackDiv>
                <Block>
                    <Right>
                        <Close onClick={this.props.testAddClicked}/>
                    </Right>
                    <TextSpan>{this.props.children}Please login before adding a test</TextSpan>
                    <Right>
                        <Button to='/authorization' onClick={this.props.testAddClicked}>Login</Button>
                    </Right>
                </Block>
            </BlackDiv>
        );
	}
}

function mapStateToProps(state) {
	return {
	
	}
}

export default connect(mapStateToProps, null)(PopUpLogin)
