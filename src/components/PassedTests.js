import React, { Component } from 'react';
import Searching from './Searching';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import Loader from './Loader';

const Main = styled.div`
	box-sizing: border-box;
`;

const NoTests = styled.div`
	padding: 30px 0;
	font-size: 28px;
	color: #141218;
	box-sizing: border-box;
`;

const TestsLink = styled(NavLink)`
	display: inline-block;
	text-decoration: none;
	paddin-bottom: 5px;
	border-bottom: 1px solid black;
	color: black;
	:hover {
		cursor: pointer;
	}
`;

const LoaderDiv = styled.div`
	margin: auto;
`;
const Tr = styled.tr`
	background-color: ${props => props.color === 'true' ? 'rgba(79, 157, 166, 0.3)' : ''};
	font-weight:  ${props => props.color === 'true' ? 'bold' : ''};
`;

class PassedTests extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.tests,
			tests: this.props.user.tests,
			search: "",
			type: "",
			currentPage: 1,
			dataPerPage: 4,
			loadMore: 0,
			sortType: !this.props.currentUser || (this.props.currentUser &&  this.props.currentUser.type === 'user') ? 'testTitle' : "" ,
			orderAscanding: true
		}
	}
	searching(e, searchProp) {
		this.setState({
			[searchProp]: e.target.value,
			currentPage: 1
		})
	}

	sorting(sortType) {
		this.setState({
			orderAscanding: this.state.sortType !== sortType ? true : !this.state.orderAscanding,
			sortType,
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

	deadline = (date) => {
		let today = new Date(date);
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}
		return today = dd + '/' + mm + '/' + yyyy;
	}

	componentDidUpdate(prevProps) {
		if (this.props.testsLoaded !== prevProps.testsLoaded) {
			this.setState({ data: this.props.tests });
		}
	}
	render() {
		let tests = [];
		let companyTests = [];
		let otherTests = [];
		if (this.state.tests) {
			tests = this.state.tests.filter(test => test.userScore >= 0);
			if (this.props.currentUser && this.props.currentUser.type === 'company') {
				tests.forEach(test => {
					if (test.companyId === this.props.currentUser.id) {
						companyTests.push(test);
					} else {
						otherTests.push(test);
					}
				})
				tests = companyTests.concat(otherTests);
			}
		}
		const selectSearchData = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#', 'Ruby', 'Swift', 'React', 'Redux', 'C++', 'PHP', 'MySQL'];
		const { search, type, currentPage, dataPerPage, loadMore, sortType, orderAscanding } = this.state;
		let filterData = tests.filter(item => {
			return item.testTitle && item.testTitle.toLowerCase().substr(0, search.length) === search.toLowerCase()
		})

		if (type !== "") {
			filterData = filterData.filter(item => item.testType === type)
		}

		if (this.state.sortType) {
			filterData.sort((a, b) => {
				let nameA = a[sortType].toUpperCase();
				let nameB = b[sortType].toUpperCase();
				if (orderAscanding) {
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
				} else {
					if (nameA < nameB) {
						return 1;
					}
					if (nameA > nameB) {
						return -1;
					}
				}
				return 0;
			});
		}



		const indexOfLastData = currentPage * dataPerPage;
		const indexOfFirstData = indexOfLastData - dataPerPage;
		const currentData = filterData.slice(indexOfFirstData, indexOfLastData + loadMore * dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(filterData.length / dataPerPage); i++) {
			pages.push(i);
		}

		return (
			tests.length ?
				<Main className="container-table">
					<Searching
						{...this.state}
						data={tests}
						searching={this.searching.bind(this)}
						currentDataLength={currentData.length}
						selectSearchData={selectSearchData}
					/>
					{tests ?
						filterData.length ?
							<>
								<table className="dataTable">
									<thead>
										<tr>
											<th onClick={this.sorting.bind(this, "testTitle")}>
												{sortType === "testTitle" && orderAscanding &&
													<span className="sortArrowBottom"></span>}
												{sortType === "testTitle" && !orderAscanding &&
													<span className="sortArrowTop"></span>}
												Title
										</th>
											<th onClick={this.sorting.bind(this, "testType")}>
												{sortType === "testType" && orderAscanding &&
													<span className="sortArrowBottom"></span>}
												{sortType === "testType" && !orderAscanding &&
													<span className="sortArrowTop"></span>}
												Type
										</th>
											<th onClick={this.sorting.bind(this, "company")}>
												{sortType === "company" && orderAscanding &&
													<span className="sortArrowBottom"></span>}
												{sortType === "company" && !orderAscanding &&
													<span className="sortArrowTop"></span>}
												Company
										</th>
											<th>Score</th>
										</tr>
									</thead>
									<tbody>
										{currentData.map((item, index) => {
											return (
												<Tr key={item.id} color={this.props.currentUser && item.companyId === this.props.currentUser.id ? 'true' : 'false'} >
													<td>{item.testTitle}</td>
													<td>{item.testType}</td>
													<td>{item.company}</td>
													<td>{item.userScore}/{item.totalScore}</td>
												</Tr>
											)
										})
										}
									</tbody>

								</table>

								<Pagination
									load_More={loadMore}
									loadMore={this.loadMore.bind(this)}
									currentPage={currentPage}
									prev={this.prev.bind(this)}
									pageClick={this.pageClick.bind(this)}
									next={this.next.bind(this)}
									pages={pages}
								/>
							</>
							: <NoTests>Sorry, nothing was found!</NoTests>

						: <LoaderDiv><Loader /></LoaderDiv>

					}
				</Main>
				: <NoTests> There is no passed tests yet {' '}
					{((this.props.userId && (this.props.user.id === this.props.userId)) || !this.props.userId) &&
						<>
							{this.props.user.tests && this.props.user.tests.length
								? <TestsLink to={`/${this.props.user.firstName}${this.props.user.lastName}/tests`} >  pass test </TestsLink>
								: <TestsLink to={`/tests`} >  add test </TestsLink>
							}
						</>
					}
				</NoTests>
		);
	}
}

function mapStateToProps(state) {
	return {
		tests: state.appReducer.tests,
		testsLoaded: state.appReducer.testsLoaded,
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PassedTests)