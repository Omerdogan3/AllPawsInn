'use babel';

import React, { Component } from 'react';

export default class Admin extends React.Component {
	constructor(props) {
		super(props)
	}

	render(){
		return (
			<div className = "box cal">
				<h3>Admin</h3>
				<div className = "box" id = "Help">
					<h4>User Manual</h4>
					<hr/>
					<b>New Boarding Booking (Existing Client):</b> <span>Search Client or Dog Name <b>>></b> Click New Reservation on Animal Details</span>
					<hr/>
					<b>New Boarding Booking (New Client):</b> <span>Add the client from New Client page <b>>></b> Rest is the same with the existing client</span>
					<hr/>
					<b>New Daycare Booking (Existing Client):</b> <span>Search Client or Dog Name <b>>></b> Click New Daycare on Animal Details</span>
					<hr/>
					<b>New Daycare Booking (New Client):</b> <span>Add the client from New Client page <b>>></b> Rest is the same with the existing client</span>
					<hr/>
					<b>Multiple Boarding Booking:</b> <span>Search Client or Dog Name <b>>></b> Hold and drag the mouse until desired dogs are selected <b>>></b> Click New Reservation on Animal Details</span>
					<hr/>
					<b>Managing Multiple Boarding Bookings:</b> <span>Click an animal on the dropdown list <b>>></b> Edit booking details <b>>></b> Click Submit <b>(</b>Submit All will submit all of the animals at once<b>)</b></span>
				</div>
			</div>
		)
	}
}
