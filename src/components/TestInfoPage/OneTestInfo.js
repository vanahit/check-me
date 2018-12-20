import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/firebase';
import { addUserTest } from '../../store/actions/appAction';
import { NavLink } from "react-router-dom";
import TestPassPanel from '../TestPassPanel/TestPassPanel';
import { addTest } from '../../store/actions/testPasser';
import PopUpLogin from '../PopUps/PopUpLogin';

const Main = styled.div`
    margin: auto;
    padding-top: 130px;
    max-width: 1200px;
    color: rgba(16, 5, 41, 1);
    overflow: auto;
    box-sizing: border-box;	   
	@media screen and (max-width: 1190px) {
		padding: 0 20px;
        min-width: 100%;
    
	}
`;
const Link = styled(NavLink) `
    text-decoration: none;
`;
const FlexRow = styled.div`
    display: flex;
    width: 100%;
   	flex-direction: ${props => props.dir || 'row'};
	flex-wrap: wrap;
	box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
		min-width: 100%;
	}
`;

const FlexChild = styled.div`
	width:  ${props => props.width || ''};
	box-sizing: border-box;
		   
	@media screen and (max-width: 1190px) {
		margin: 5px;
        min-width: 100%;
        max-width: 100%;
	}
`;

const TestTitle = styled.div`
    font-size: 34px;
    color: #4F9DA6;
    font-weight: bold;
    margin-bottom: 16px;
`;

const Title = styled.div`
    width: 100%;
    margin: 30px 0;
    font-size: ${props => props.size || '34px'};  
    color:rgba(79, 157, 166, 1);
`;

const TitleStart = styled.div`
    width: 100%;
    margin: 60px 0;
    font-size: ${props => props.size || '34px'};  
    color:rgba(79, 157, 166, 1);
    border-bottom: 1px solid rgba(220, 220, 220, 1);
`;
const Square = styled.span`
    display: inline-block;
    width: 18px;
    height: 18px;
    background-color: #4F9DA6;

`;
const TestDescription = styled.div`
    font-size: 24px;
    color: #FFAD5A;
    margin-bottom: 16px;

`;
const PassingDescription = styled.div`
    font-size: 24px;
    color: #141218;
    margin-bottom: 16px;

`;
const TestDetails = styled.span`
    display: inline-block;
    margin-left: 8px;
    font-size: 20px;
`;
const TestDetailsValue = styled.span`
    display: inline-block;
    margin-left: 8px;
    margin-right:30px;
    font-size: 20px;
    color:#FFAD5A; 
`;

const Button = styled.button`
    display: block;
    margin: 30px 26px 26px 0;
    padding: 15px 20px;
    border: 0;
    border-radius: 4px;
    background-color: ${props => props.color || 'rgba(255, 89, 89, 1)'};
	color: white;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    font-weight: bold;
    font-size: 20px;
	box-sizing: border-box;
	: hover {
		cursor: ${props => props.disabled ? '' : 'pointer'}
	}
`;
const AllDiv = styled.div`
	margin-top: 30px;
	font-size: 20px;
    padding-bottom: 10px;
`;

const LinkDiv = styled(NavLink)`
    display: inline-block;
    text-decoration: none;
    color: #141218;
    :hover, :active {
        text-decoration: underline;
        cursor: pointer;
    }
`;

class OneTestInfo extends Component {
    state = {
        test: this.props.test,
        user: this.props.user,
        started: false,
        testAddClicked: false
    }

    componentDidUpdate(prevProps) {
        if (this.props.test !== prevProps.test) {
            this.setState({ test: this.props.test });
            console.log(this.state.test)
        }
        if (this.props.user !== prevProps.user) {
            this.setState({ user: this.props.user });
        }
    }
    add = (test) => {

        if (this.props.user && this.props.user.type === 'user') {
            let userUrl = this.props.user.id;
            firebase.database().ref(`user/${this.props.user.id}/tests`).once('value', (snapshot) => {
                if (snapshot.hasChild(`${test.id}`)) {

                } else {
                    this.props.userTestAdded();
                    this.props.addUserTest(test);
                    let userRef = firebase.database().ref(`user/${userUrl}`);
                    userRef.child('tests').child(`${test.id}`).set({ ...test, userScore: -1 });
                }
            });
        } else {
            this.testAddClicked();
        }
    }
    checkIfAdded = (test) => {
		if (this.props.user && this.props.user.tests) {
			for (let i = 0; i < this.props.user.tests.length; i++) {
				if (test.id === this.props.user.tests[i].id) {
                    if (this.props.user.tests[i].userScore < 0 && !this.props.user.tests[i].currentTime)  {
                        return 'added';
                    } else if (this.props.user.tests[i].currentTime){
                        return 'continue';
                    } else {
						return 'passed';
					}
				} 
            }
            
			return false;
		}
	}
    testAddClicked = () => {
        this.setState({ testAddClicked: !this.state.testAddClicked });
    };
    render() {
        return (
            !this.state.started && this.state.test ?
            <div>
                {this.state.testAddClicked && <PopUpLogin testAddClicked={this.testAddClicked} />}
                <Main>
                    {this.props.user && this.props.user.type === 'user' && this.checkIfAdded(this.props.item) === 'added' &&
                        <>
                            <AllDiv>
                                <LinkDiv to={`/${this.props.user.firstName}${this.props.user.lastName}/tests`}> My Account </LinkDiv>
                                /{' '}
                                Start tests
                             </AllDiv>
                            <TitleStart> Start Test</ TitleStart>
                        </>
                    }
                    <Title>{this.props.item.title}</ Title>
                    <FlexRow>
                        <FlexChild >
                            <TestTitle>{this.props.item.company}</TestTitle>
                            <TestDescription>{this.props.item.testTitle}</TestDescription>
                            <PassingDescription>
                                {this.props.item.description}.
                        </PassingDescription>
                            <FlexRow>
                                <FlexChild >
                                    < Square />
                                    <TestDetails>Test type : </TestDetails>
                                    <TestDetailsValue>{this.props.item.testType}{''}</TestDetailsValue>
                                </FlexChild>
                                <FlexChild >
                                    < Square />
                                    <TestDetails>Number of questions : </TestDetails>
                                    <TestDetailsValue>{this.props.item.questions.length}{''}</TestDetailsValue>
                                </FlexChild>
                                <FlexChild>
                                    < Square />
                                    <TestDetails>Time : </TestDetails>
                                    <TestDetailsValue>{this.props.item.testDuration} minutes</TestDetailsValue>
                                </FlexChild>
                                <FlexChild>
                                    < Square />
                                    <TestDetails>Score : </TestDetails>
                                    <TestDetailsValue>{this.props.item.totalScore} points</TestDetailsValue>
                                </FlexChild>
                            </FlexRow>

                            {
                                (this.props.user && this.props.user.type !== 'company') || !this.props.user ?
                                    <>
                                        {!this.checkIfAdded(this.props.item) &&
                                            <Button
                                                onClick={() => this.add(this.props.item)}>
                                                Add test >
                                            </Button>
                                        }
                                        {
                                        this.checkIfAdded(this.props.item) === 'added' &&
                                            <Link to = {`/passing-test/${this.props.item.id}`} >
                                                <Button 
                                                    color={'#FFAD5A'}>
                                                
                                                    Start test > 
                                                </Button>
                                            </Link>
										}
										{ this.checkIfAdded(this.props.item) === 'continue' &&
                                        <Link to = {`/passing-test/${this.props.item.id}`} >
                                            <Button 
                                                color={'#FFAD5A'}>
                                              
											  Continue test > 
                                            </Button>
										</Link>
                                        }
                                        {
                                            this.checkIfAdded(this.props.item) === 'passed' &&
                                            <Button
                                                color={'#4F9DA6'}
                                                disabled
                                              >

                                                Passed
                                            </Button>
                                        }
                                    </>
                                    : ""
                            }

                        </FlexChild>
                    </FlexRow>
                </Main>
                </div>
                : <TestPassPanel test={this.props.test} user={this.props.user} />
        );
    }
}

function mapStateToProps(state) {
    return {
        test: state.testPasser.testDetails,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addUserTest: test => dispatch(addUserTest(test)),
        addTest: test => dispatch(addTest(test)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneTestInfo)