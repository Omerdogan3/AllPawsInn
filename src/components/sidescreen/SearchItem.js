import React from 'react';

const SearchItem = ({
	selected,
	FirstName,
	LastName,
	AnimalName,
	Breed
}) => {
	const classes = selected ? 'item selected' : 'item';
	return (
		<div className = {classes}>
			<span ><b>{FirstName} {LastName}</b>/<b>{AnimalName}</b><br></br></span>
		</div>
	)
};

export default SearchItem;