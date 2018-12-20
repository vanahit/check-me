import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import close from '../../images/buttonIcons/closeIcon.svg';
import {firebase} from '../../firebase/firebase';
 
const BlackDiv = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    background-color: rgba(20, 18, 24, 0.50);
`;
const Block = styled.div`
    position: absolute;
    top: calc(50% - 150px);
    padding: 16px;
    left: calc(50% - 300px);
    width: 600px;
    border-radius: 4px;
    background-color: white;
    text-align: center;
    box-sizing: border-box;
  
`;

const Error = styled.div`
    margin: 28px auto 16px auto;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid #E62416;
    text-align: center;
    line-height: 64px;
    color: #E62416;
`;

const TextSpan = styled.div`
    color: #100529;
    font-size: 24px;
    padding-bottom: 8px;
    border-bottom: 1px solid #D6D6D6;
`;

const Button = styled.div`
    display: inline-block;
    margin-top: 40px;
    width: ${props => props.width || '126px'}
    padding: 10px 0;
    margin: 40px 8px;
    border-radius: 4px;
    background-color: ${props => props.color || '#4F9DA6'} 
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

const CloseDiv = styled.div`
    text-align: right;
`;

class PopUpDelete extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
    deleteTest = testId => {
        let db = firebase.database();
        let deletedTest = db.ref(`tests/${testId}`);
        deletedTest.update({deleted: true});
        this.props.testDeletedClicked()
    }
    render() {
		return (
            <BlackDiv>
                <Block>
                    <CloseDiv>
                        <Close onClick={this.props.testDeletedClicked} />
                    </CloseDiv>
                    <Error>!</Error>
                    <TextSpan>Are You sure?</TextSpan>
                    <Button color={'#E62416'} width={'179px'}  onClick={()=> this.deleteTest(this.props.deletingTest)}>Yes, delete it</Button>
                    <Button onClick={this.props.testDeletedClicked}>Cancel</Button>
                </Block>
            </BlackDiv>
        );
	}
}

function mapStateToProps(state) {
	return {
        deletingTest: state.testCreator.deletingTest,
	}
}

export default connect(mapStateToProps, null)(PopUpDelete)
