import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import mainBackground from '../../images/home-page-bg.jpg';
import BecomeCompany from './components/BecomeCompany';
import BecomeUser from './components/BecomeUser';
import ForOurUser from './components/ForOurUser'
import ForOurCompany from './components/ForOurCompany'
import TestSlider from './components/TestsSlider';
import { NavLink } from 'react-router-dom';
import Loader from '../Loader';
import PopUpLogin from '../PopUps/PopUpLogin';



const Main = styled.div`
    margin: auto;
 	max-width: 100%;
    font-size: 24px;
    position:relative;
    overflow: auto;
    @media screen and (max-width: 1190px) {
		padding: 0 20px;
    }
`;

const Header = styled.div`
    position: relative;
    width: 100%;   
    height: 700px;		
    background-image: url(${mainBackground});
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    box-sizing: border-box;
`;

const GetStartedDiv = styled.div`
    position: absolute;
    display: inline-block;
    bottom: 0;
    padding: 18px;
    color: white;
    width: 100%;   
    min-height: 100px;  
    z-index: 1;
    background-color: rgba(20, 18, 24, 0.75);
    font-size: 24px;
    box-sizing: border-box;	
`;

const FlexRow = styled.div`
    display: flex;
    margin: 0px auto;
    max-width: 1200px;
    flex-direction: row;
    justify-content: ${props => props.content || 'space-between'};  ;
	flex-wrap: wrap;
    box-sizing: border-box;

	@media screen and (max-width: 1190px) {
		flex-direction: column;
        min-width: 100%;
    }
`;


const GetsStartedText = styled.div`
    display: inline-block;
    vertical-align: middle;
    max-width: 1018px;
    margin: 0 0;
    word-wrap: break-word;
    @media screen and (max-width: 1000px) {
        padding: 0 10px
        text-align: center;
    }
`;

const Button = styled(NavLink)`
    display: inline-block;
    border: 0;
    border-radius: 4px;
    padding: 15px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 24px;
    background-color:rgba(255, 89, 89, 1);
    box-sizing: border-box;

    @media screen and (max-width: 1190px) {
		text-align: center;
    }
`;
const Title = styled.div`
    width: 100%;
    margin-top: 76px;
    margin-bottom: 30px;
    font-size: ${props => props.size || '34px'};  
    font-weight: bold;
    color:rgba(79, 157, 166, 1);
    border-bottom: 1px solid rgba(220, 220, 220, 1);
`;
const AllTestsDiv = styled.div`
    width: 100%;
    text-align: right;
    margin-top: 16px;
    margin-right: 16px;
    margin-bottom: 76px;
`;
const AllTestsSpan = styled.span`
    color: #0286CD;
    font-size: 20px;
    text-decoration: underline;
    
`;
const Body = styled.div`
    max-width: 1200px;
    margin: auto;
   
`;
const LoaderDiv = styled.div`
    max-width: 1200px;
    text-align: center;
    margin: auto;
   
`;

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testsLoaded: this.props.testsLoaded,
            testAddClicked: false
        };

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.testsLoaded === true && this.props.testsLoaded !== prevProps.testsLoaded) {
            this.setState({ testsLoaded: this.props.testsLoaded });
        }
    }
    testAddClicked = () => {
        this.setState({ testAddClicked: !this.state.testAddClicked });
    };
    render() {
        return (
            <div>
            {this.state.testAddClicked && <PopUpLogin testAddClicked={this.testAddClicked} />}
            <Main>
                <Header>

                    <GetStartedDiv>
                        <FlexRow>

                            <GetsStartedText>
                                DigiLearn is an all-in-one platform that makes it easy to create online tests, launch programming
                                companies, build landing pages, and design the perfect website.
                                </GetsStartedText>

                            <Button to="/authorization">
                                GET STARTED
                            </Button>

                        </FlexRow>
                    </GetStartedDiv>
                </Header>
                <Body>
                    <FlexRow>
                        <Title>
                            YOUR FIRST DESTINATION
                        </Title>

                        <BecomeCompany />
                        <BecomeUser />
                        <ForOurUser />
                        <ForOurCompany />

                        <Title>
                            MOST POPULAR TESTS
                        </Title>

                    </FlexRow>

                    <FlexRow>
                        {
                            this.state.testsLoaded
                                ? <TestSlider
                                    user={this.props.user}
                                    testAddClicked={this.testAddClicked}
                                    userTestAdded={this.props.userTestAdded}
                                    addCurrentItem={this.props.addCurrentItem}
                                />
                                : <LoaderDiv><Loader /></LoaderDiv>
                        }
                    </FlexRow>
                    <AllTestsDiv>
                        <NavLink to='/tests'> <AllTestsSpan>View All Tests</AllTestsSpan></NavLink>
                    </AllTestsDiv>
                </Body>
            </Main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tests: state.appReducer.test,
        testsLoaded: state.appReducer.testsLoaded
    }
}

export default connect(mapStateToProps, null)(HomePage)

