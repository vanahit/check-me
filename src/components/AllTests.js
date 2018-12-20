import React, { Component } from 'react';
import Searching from './Searching';
import Pagination from './Pagination';
import TestComponent from '../components/OneTestComponent/TestRender';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loader from './Loader';
import PopUpLogin from '../components/PopUps/PopUpLogin';

const LoaderDiv = styled.div`
	text-align: center;
	margin: 200px 0;
	
`;
const NoTests = styled.div`
	width: 1200px;
	margin: auto;
	padding-top: 200px;
	font-size: 28px;
	color: #141218;
	box-sizing: border-box;
`;

class AllTests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.tests,
			search: "",
			type: "",
			currentPage: 1,
			dataPerPage: 8,
			loadMore: 0,
			unMounted: false,
			testAddClicked: false
		}
	}
	searching(e, searchProp) {
		this.setState({
			[searchProp]: e.target.value,
			currentPage: 1
		})
	}

	pageClick(e) {
		this.setState({
			currentPage: Number(e.target.id),
			loadMore: 0
		})
	}

	loadMore(e) {
		this.setState({ loadMore: this.state.loadMore + 1 })
	}

	prev() {
		this.setState({
			currentPage: this.state.currentPage + this.state.loadMore - 1,
			loadMore: 0
		})
	}

	next() {
		this.setState({
			currentPage: this.state.currentPage + this.state.loadMore + 1,
			loadMore: 0
		})
	}
	compareDates = (stringDate) => {
		return Date.parse(stringDate) >= Date.now();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.testsLoaded !== prevProps.testsLoaded) {
			this.setState({ data: this.props.tests });
		}

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

	testAddClicked = () => {
		this.setState({ testAddClicked: !this.state.testAddClicked });
	};
	render() {
		let fillteredTests = [];
		let tests = [];
		let passedTests = [];
		let otherTests = [];
		if (this.state.data) {
			if (this.props.user && this.props.user.type === 'user') {
				forOfTets: for (let i = 0; i < this.state.data.length; i++) {
					for (let j = 0; j < this.props.user.tests.length; j++) {
						if (this.props.user.tests[j].id === this.state.data[i].id && this.props.user.tests[j].userScore >= 0) {
							passedTests.push(this.state.data[i]);
							continue forOfTets;
						}
					}
					otherTests.push(this.state.data[i]);
				}
				tests = otherTests.concat(passedTests);
			} else {
				tests = this.state.data;
			}
			fillteredTests = tests.filter(item => this.compareDates(item.testDeadline));
		}

		const selectSearchData = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#', 'Ruby', 'Swift', 'React', 'Redux', 'C++', 'PHP', 'MySQL'];
		const { search, type, currentPage, dataPerPage, loadMore } = this.state;
		let filterData = fillteredTests.filter(item => {
			return item.testTitle.toLowerCase().substr(0, search.length) === search.toLowerCase()
		})

		if (type !== "") {
			filterData = filterData.filter(item => item.testType === type)
		}

		const indexOfLastData = currentPage * dataPerPage;
		const indexOfFirstData = indexOfLastData - dataPerPage;
		const currentData = filterData.slice(indexOfFirstData, indexOfLastData + loadMore * dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(filterData.length / dataPerPage); i++) {
			pages.push(i);
		}

		return (
			<div>
				{this.state.testAddClicked && <PopUpLogin testAddClicked={this.testAddClicked} />}
				{this.props.tests ?
					<div className="container-fluid">
						<Searching
							{...this.state}
							data={fillteredTests}
							searching={this.searching.bind(this)}
							currentDataLength={currentData.length}
							selectSearchData={selectSearchData}
						/>
						{tests.length ?
							filterData.length ?
								<div className="content-grid-tests">
									{currentData.map(item => {
										return (
											<TransitionGroup className="test-grid" key={item.id}>
												<CSSTransition
													in={this.state.unMounted ? false : true}
													appear={this.state.unMounted ? false : true}
													timeout={450}
													classNames="slide"
												>
													<TestComponent
														added={this.checkIfAdded(item.id)}
														test={item}
														user={this.props.user}
														testAddClicked={this.testAddClicked}
														userTestAdded={this.props.userTestAdded}
													/>

												</CSSTransition>
											</TransitionGroup>
										)
									})
									}
									<Pagination
										load_More={loadMore}
										loadMore={this.loadMore.bind(this)}
										currentPage={currentPage}
										prev={this.prev.bind(this)}
										pageClick={this.pageClick.bind(this)}
										next={this.next.bind(this)}
										pages={pages}
									/>
								</div>
								: <NoTests>Sorry, nothing was found!</NoTests>

							: <LoaderDiv>  <Loader /> </LoaderDiv>

						}


					</div>


					: <NoTests> There is no tests yet </NoTests>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tests: state.appReducer.tests,
		testsLoaded: state.appReducer.testsLoaded,
	}

}

export default connect(mapStateToProps, null)(AllTests)