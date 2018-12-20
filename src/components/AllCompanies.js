import React, { Component } from 'react';
import Searching from './Searching';
import Pagination from './Pagination';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled  from 'styled-components';
import Loader from './Loader';
import CompanySvg from './CompanyProfile/CompanySvg';

const CompanySvgDiv = styled.div`
	margin: 8px auto;
	width: 150px;
	height: 150px;
	fill: rgba(16, 5, 41, 1);
	:hover {
		fill: #FF5959;
	}
`;

const NoTests = styled.div`
	width: 1200px;
	margin: auto;
	padding-top: 100px;
	font-size: 28px;
	color: #141218;
	box-sizing: border-box;
`;

const UserImg = styled.img`
	height: 110px;
`;
const LoaderDiv = styled.div`
	text-align: center;
	margin: 200px 0;
`;
const NavLinkDiv = styled(NavLink)`
	color: #100529;
	text-decoration: none;
`;
const CompanyName = styled.div`
	font-size: 18px;
	color: #4F9DA6;
	text-align: center;
	font-weight: bold;
	text-transform: uppercase;
`;
const TestsCount = styled.span`
	text-decoration: underline;
	color: #100529;
	font-size: 24px;
`;
const InfoDiv = styled.div`
	padding: 0 8px;
`;

class AllCompanies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.companies,
			search: "",
			type: "",
			currentPage: 1,
			dataPerPage: 8,
			loadMore: 0,
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.companiesLoaded !== prevProps.companiesLoaded) {
			this.setState({ data: this.props.companies });
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
	getTests = (companyId) => {
		if (this.props.tests) {
			let tests = this.props.tests.filter(test => test.companyId === companyId);
			return tests.length;
		}
	}
	description = (description) => {
		let newDescription = description.split(' ');
		let newDescriptionString = newDescription.filter((word, index) => index < 10);
		return newDescriptionString.join(' ');
	}

	render() {
		let selectSearchData = [];
		let filterData = [];
		let companies = [];

		const { search, type, currentPage, dataPerPage, loadMore } = this.state;

		if (this.state.data) {
			companies = this.state.data;
		}

		companies.reduce((acc, item) => {
			acc.push(item.name);
			return acc
		}, selectSearchData)

		filterData = companies.filter(item => {
			return item.name.toLowerCase().substr(0, search.length) === search.toLowerCase()
		})

		if (type !== "") {
			filterData = filterData.filter(item => item.name === type)
		}

		const indexOfLastData = currentPage * dataPerPage;
		const indexOfFirstData = indexOfLastData - dataPerPage;
		const currentData = filterData.slice(indexOfFirstData, indexOfLastData + loadMore * dataPerPage);

		const pages = [];
		for (let i = 1; i <= Math.ceil(filterData.length / dataPerPage); i++) {
			pages.push(i);

		}
		return (
			this.props.companies ?
				<div className="container-fluid">
					<Searching
						{...this.state}
						data={companies}
						searching={this.searching.bind(this)}
						currentDataLength={currentData.length}
						selectSearchData={selectSearchData}
					/>
					{companies.length ?
						filterData.length ?
							<div className="content-grid">
								{currentData.map(item => {
									return (
										<TransitionGroup className="grid" key={item.id}>
									<CSSTransition
										in={true}
										appear={true}
										timeout={450}
										classNames="slide"
									>
										<div className="companyUser" onClick={() => this.props.addCurrentItem(item)} >
											<CompanySvgDiv className="image-content image-contentCompany"> 
												{item.image ? <UserImg src={item.image} alt="Company"  /> : <CompanySvg />}
											</CompanySvgDiv>
											<div className="grid-info">
											<InfoDiv>
												<CompanyName>{item.name}</CompanyName>
												<p>
													{this.description(item.description)}{'...'}
												</p>
												<div className="testsDiv">
													<NavLinkDiv to={{
														pathname: `/company-info-page/${item.id}-${item.name}`,

													}}  >
														<TestsCount>{this.getTests(item.id)} Tests</TestsCount>
													</NavLinkDiv >
												</div>
												</InfoDiv>
											</div>
										</div>

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
						: <LoaderDiv><Loader /></LoaderDiv>
					}
				</div>
				: <NoTests>THERE IS NO COMPANIES YET</NoTests>
		);
	}
}

function mapStateToProps(state) {
	return {
		companies: state.appReducer.companies,
		companiesLoaded: state.appReducer.companiesLoaded,
		tests: state.appReducer.tests,
	}

}

export default connect(mapStateToProps, null)(AllCompanies)