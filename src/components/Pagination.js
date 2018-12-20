import React from 'react';
import styled from 'styled-components';

const PaginationDiv = styled.div`
	width: 100%;
	margin-bottom: 80px;
`;

const Pagination = ({ load_More, loadMore, currentPage, prev, pageClick, next, pages }) => {
	return (
		<PaginationDiv>
			{((load_More + currentPage) !== pages.length && pages.length !== 1)
				? <div className="loadMore"><button className="viewMore" onClick={() => loadMore()}>Load More</button></div> : <div className="loadMore"></div>}
			{pages.length > 1 && <div className="pagination">
				<div className="paginationContent">
					{load_More + currentPage !== 1 ? <span onClick={() => prev()}> Previous </span> : <span></span>}
					<div className="pages">
						
						<ul>
							<span style={{ lineHeight: 2, marginRight: 10 }}>Pages:</span>
							{
								pages.map(page => {
									return (
										<li
											className={`${page === (currentPage + load_More) ? 'active' : ""}`}
											key={page}
											id={page}
											onClick={e => pageClick(e)}>
											{page}
										</li>
									)
								})
							}
						</ul>
					</div>
					{load_More + currentPage !== pages.length ? <span onClick={() => next()}> Next </span> : <span></span>}
				</div>
			</div>}
		</PaginationDiv>
	)
}

export default Pagination;