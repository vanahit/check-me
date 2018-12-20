import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestRender from '../../OneTestComponent/TestRender';
import styled from 'styled-components'


let percent;
const styles = { transition: 'all 1s linear' }

function resp() {
	if (window.innerWidth <= 500) {
		percent = 3150
	} else {
		percent = 2450
	}
}

resp()

window.onresize = function () { resp() }


// styled carousel

const CarouselContainer = styled.div`
  width: 95%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 1199px){
	max-width: 80%;
}

`
const Arrow = styled.span`
  display: inline-block;
  margin: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  @media screen and (max-width: 500px){
	padding: 0;
}
`
const FlexRow = styled.div`
   	width: 100%;
	display: flex;
	margin: auto;
    flex-direction: row;
	justify-content: ${props => props.content || 'space-between'};
	align-items: center;
	flex-wrap: wrap;
    box-sizing: border-box;
`;

const FlexChild = styled.div`
	position: relative;
    width: ${props => props.width || ''};
    height: ${props => props.height || ''};    
    box-sizing: obrder-box; 
    
`;
const Test = styled.div`
	position: relative;
	display: flex;
	width: 3500px;
	max-width: 333.3%;
	box-sizing: border-box;
	@media screen and (max-width: 500px){
		max-width: unset;
		width: 1000%;
  }

`;
const Padding = styled.div`
  padding: 16px;

  @media screen and (max-width: 500px){
	max-width: unset;
	width: 1000%;
	padding: 0;
}
  
`;
const OneTestSize = styled.div`
	width: 320px;
`;

class TestSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			translate: 0,
			tests: this.props.tests,

		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.tests === true && this.props.tests !== prevProps.tests) {
			this.setState({ tests: this.props.tests });
		}
	}

	componentDidMount() {
		this.IntervalId = setInterval(() => {
			this.setState({ translate: this.state.translate === -percent ? 0 : this.state.translate - 350 })
		}, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.IntervalId);
	}

	ToLeft() {
		this.setState({ translate: this.state.translate === 0 ? -percent : this.state.translate + 350 })
	}

	ToRight() {
		this.setState({ translate: this.state.translate === -percent ? 0 : this.state.translate - 350 })
	}

	getTodayDate = () => {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}
		return today = yyyy + '-' + mm + '-' + dd;
	}

	compareDates = (stringDate) => {
		let today = new Date();
		today = this.getTodayDate(today);
		return Date.parse(stringDate) >= Date.parse(today);
	}
	checkIfAdded = (testId) => {
		if (this.props.user && this.props.user.tests) {
			for (let i = 0; i < this.props.user.tests.length; i++) {
				if (testId === this.props.user.tests[i].id) {
					return true;
				}
			}
			return false;
		}
	}

	render() {
		let fillteredTests = [];
		let tests = [];
		if (this.state.tests) {
			tests = this.state.tests;
			fillteredTests = tests.filter(item => this.compareDates(item.testDeadline));
		}
		fillteredTests = fillteredTests.slice(0, 10)
		return (
			<>
				<FlexRow>
					<FlexChild>
						<Arrow onClick={this.ToLeft.bind(this)}> {'<'} </Arrow>
					</FlexChild>
					<CarouselContainer>
						<Test
							style={{ ...styles, transform: `translateX(${this.state.translate}px)` }}
							count={fillteredTests.length}>
							{this.state.tests
								? fillteredTests.map((item) => {
									return (
										<Padding key={item.id}>
											<OneTestSize>

												<TestRender
													added={this.checkIfAdded(item.id)}
													test={item}
													user={this.props.user}
													testAddClicked={this.props.testAddClicked}
													userTestAdded={this.props.userTestAdded}
													addCurrentItem={this.props.addCurrentItem}
												/>
											</OneTestSize>
										</Padding>
									);
								})
								: ''
							}
						</Test>
					</CarouselContainer>
					<FlexChild>
						<Arrow onClick={this.ToRight.bind(this)}> {'>'} </Arrow>
					</FlexChild>
				</FlexRow>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		tests: state.appReducer.tests,
	}

}

export default connect(mapStateToProps, null)(TestSlider)