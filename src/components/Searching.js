import React from 'react';

const Searching = ({searching, search, loadMore, data, type, dataPerPage, currentDataLength, selectSearchData}) => {
  return (
    <div className="searching">
			<select 
				className="searchingSelect" 
				onChange={e => searching(e,'type')} 
				value={type} >
				<option 
					className="hidden" 
					value="">
					All Types
				</option>
				{selectSearchData.map( (item,index) => <option key={index} value={item}>{item}</option> )}
			</select>
			<input type="text" 
				className="search" 
				placeholder="Search" 
				value={search} 
				onChange={e => searching(e,'search')} 
				/>
			<span>{currentDataLength}/{data.length}</span>
		</div>
  )
}

export default Searching;