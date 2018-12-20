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
    padding-bottom: 20px;
    margin: auto;
    font-size: 24px;
    color: #100529;
    padding-bottom: 8px;
    border-bottom: 1px solid #D6D6D6;
`;

const LinkToTests = styled(NavLink)`
    display: inline-block;
    padding: 10px 0 5px 0;
    text-decoration: none;
    text-weight: bold;
    border: 0;
    font-size: 20px;
    color: #FF5959;

    :hover {
        border-bottom: 1px solid #FF5959;
    }
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

const CloseDiv = styled.div`
    text-align: right;
`;

class PopUpTestAdded extends Component {
    state = {
        addedTest: this.props.addedTest,
    }

    closePopUp = () => {
        if (this.props.exists) {
            this.props.userTestExists(); 
        } else {
            this.props.userTestAdded();
        }
    }
    componendDidMount = (prevProps) => {
        if (prevProps.addedTest !== this.props.addedTest ) {
            this.setState({addedTest: this.props.addedTest});
            console.log(this.props.addedTest)
        }
    }
    render() {
       	return (
            this.state.addedTest ?
            <BlackDiv>
                <Block>
                    <CloseDiv>
                        <Close onClick={this.closePopUp} />
                    </CloseDiv>
                    <TextSpan>Test <b><i>{this.state.addedTest.testTitle}</i></b> {this.props.children}</TextSpan>
                    <LinkToTests to={`/${this.props.user.firstName}${this.props.user.lastName}/tests`}>
                        <span onClick={this.closePopUp}>Go to profile tests</span>
                    </LinkToTests>
                </Block>
            </BlackDiv>
            : 'Loader'
        );
	}
}

function mapStateToProps(state) {
	return {
        addedTest: state.appReducer.addedTest,
	}
}

export default connect(mapStateToProps, null)(PopUpTestAdded)
