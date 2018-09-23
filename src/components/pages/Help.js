'use babel';

import React, { Component } from 'react';

export default class Help extends React.Component {
	constructor(props) {
		super(props)
	}

	render(){
		return (
			<div className = "box cal">
				<h3>Help</h3>
				<div className = "box" id = "Help">
					<h4>User Manual</h4>
					<hr></hr>
					<b>New Boarding Booking (Existing Client):</b> <span>Search Client or Dog Name <b>>></b> Click New Reservation on Animal Details</span>
					<hr></hr>
					<b>New Boarding Booking (New Client):</b> <span>Add the client from New Client page <b>>></b> Rest is the same with the existing client</span>
					<hr></hr>
					<b>New Daycare Booking (Existing Client):</b> <span>Search Client or Dog Name <b>>></b> Click New Daycare on Animal Details</span>
					<hr></hr>
					<b>New Daycare Booking (New Client):</b> <span>Add the client from New Client page <b>>></b> Rest is the same with the existing client</span>
					<hr></hr>
					<b>Multiple Boarding Booking:</b> <span>Search Client or Dog Name <b>>></b> Hold and drag the mouse until desired dogs are selected <b>>></b> Click New Reservation on Animal Details</span>
					<hr></hr>
					<b>Managing Multiple Boarding Bookings:</b> <span>Click an animal on the dropdown list <b>>></b> Edit booking details <b>>></b> Click Submit <b>(</b>Submit All will submit all of the animals at once<b>)</b></span>
					<hr></hr>
					<b>Daycare Booking Check-Out (Grid Only):</b> <span>Click $ sign in the Check-Out column</span>
					<hr></hr>
					<b>Print Daycare Booking (Grid Only):</b> <span>Click printer sign in the Print column</span>
					<hr></hr>
					<b>Add New Dog to a Client:</b> <span>Search Client or Dog Name <b>>></b> Click Client Profile on Animal Details <b>>></b> Click add dog <b>>></b></span>
					<hr></hr>
					<b>New Client:</b> <span>Add the client from New Client page <b>>></b> After submit, refresh the program</span>
					<hr></hr>
					<b>Update Client Information:</b> <span>Search Client or Dog Name <b>>></b> Click Client Profile on Animal Details <b>>></b> After submit, refresh the program</span>
					<hr></hr>
					<b>Scheduler:</b> <span>Click Scheduler on the Navigation Bar <b>(</b>In order to see a booking in the list, the dog must be Checked-In<b>)</b></span>
					<hr></hr>
					<b>Client Details:</b> <span>Search Client or Dog Name <b>>></b> Click Client Profile on Animal Details</span>
					<hr></hr>
					<b>Animal Details:</b> <span>Search Client or Dog Name <b>>></b> Click Full Profile on Animal Details</span>
				</div>
				<br></br>
				<div className = "box" id = "Help">
					<h4>Troubleshooting</h4>
					<hr></hr>
					<b>No data shows up on the screen:</b> <span>Wait for 10 seconds, if nothing shows up refresh the program</span>
				</div>
				<br></br>
				<div className = "box" id = "Help">
					<h4>Booking Colour Codes</h4>
					<hr></hr>
					<b>Red:</b> <span>Booking is not Checked-In</span>
					<hr></hr>
					<b>Yellow:</b> <span>Booking is Checked-In</span>
					<hr></hr>
					<b>Green:</b> <span>Booking is Checked-Out</span>
					<hr></hr>
					<b>Grey:</b> <span>No status (Error)</span>
				</div>
				<br></br>
					<div className = "box" id = "Help">
					<h4>Title Bar Colour Codes</h4>
					<hr></hr>
					<b>Red:</b> <span>Close</span>
					<hr></hr>
					<b>Green:</b> <span>Maximize</span>
					<hr></hr>
					<b>Yellow:</b> <span>Minimize</span>
					<hr></hr>
					<b>Violet:</b> <span>Refresh</span>
				</div>
				<br></br>
				<div className = "box" id = "Help">
					<h4>Keep In Mind</h4>
					<hr></hr>
					<ul>
					<li>After Client Update operations, must refresh the program</li>
					<hr></hr>
					<li>Daycare bookings are printable (Grid Only)</li>
					<hr></hr>
					<li>Payment and Scheduler are printable</li>
					<hr></hr>
					<li>After each marking/unmarking operation click outside the grid area</li>
					<hr></hr>
					<li>In the Payment page, when Take Payment is clicked, the booking will be checked-out</li>
					<hr></hr>
					<li>In the Daycare Grid page, only future days (including today) are markable</li>
					<hr></hr>
					<li>In the Daycare Grid page, in order to cancel a marked day, click on it</li>
					<hr></hr>
					<li>Extra charges of a booking can be added in the Payment page</li>
					</ul>
				</div>
			</div>
		)
	}
}
