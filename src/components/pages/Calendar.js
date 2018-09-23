// ---------------------------------------- TO DO ----------------------------------------
// css Calendar element width should be constant
'use babel';

import React from 'react';
import Grid from './calendar/Grid'
import List from './calendar/List'
import Layout from './calendar/Layout'

let week = 0

let dayCare = true

//move constants to a new js file
const load_pages = 7
const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"]
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


function printDate(date){
	return `${date.getDate()} ${dayNames[date.getDay()]} ${monthNames[date.getMonth()]}`
}

function filter_date(booking){
	//keep week on an array iterate within that
	let range = getDateRange(week)
	//optimize this guy
	// let midpoint = new Date((booking.DateIn.getTime() + booking.DateOut.getTime()) / 2)
	//|| (booking.DateOut < range.sun && booking.DateOut > range.mon) || (midpoint < range.sun && midpoint > range.mon)
	return (booking.DateIn < range.sun && booking.DateOut > range.mon) 
	// ya da ortalamasi aradaysa

	//booking.DayCare == (dayCare == 'true') &&
}

function filter_daycare(booking){
	return booking.DayCare == (dayCare == true)
}

//can just use moment.js and avoid the fuss beleow
function getDateRange(week){

	//keep this on calendar or app?
	//no need to reboot app vs less code executed

	//clean this up
	//day switch
	let td = new Date()	;
	td = new Date(td - 604800000 * week);
	let day = td.getDay() || 7; 	  // Get current day number, converting Sun. to 7
	if (day !== 1)              	  // Only manipulate the date if it isn't Mon.
		td.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
										// multiplied by negative 24
	td.setHours(0)
	td.setMinutes(0)
	td.setSeconds(0)

	return {
		mon : td,
		sun : new Date(td.valueOf() + 604800000 - 1000)
	}
}

export default class Calendar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			current_week : this.props.bookings.filter(filter_date),
			week : 0,
			calendar : true,
			cur_id : this.props.currentId,
			bookings_list : this.props.bookings, //isnt really necessary
			daycare : dayCare,
		}

		this.currentWeek = this.currentWeek.bind(this)
		this.nextWeek = this.nextWeek.bind(this)
		this.prevWeek = this.prevWeek.bind(this)
		this.switch_booking = this.switch_booking.bind(this)
		this.switch_view = this.switch_view.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if (nextProps && nextProps.bookings){
			this.setState({
				bookings_list: nextProps.bookings,
				current_week : nextProps.bookings.filter(filter_date)
			})
		}
	}

	currentWeek(){
		week = 0
		this.setState({
			week: 0,
			current_week : this.props.bookings.filter(filter_date)
		})
	}

	nextWeek(){
		week = this.state.week + 1
		this.setState({
			week : week,
			current_week : this.props.bookings.filter(filter_date)
		})
	}

	prevWeek(){
		week = this.state.week - 1
		this.setState({
			week : week,
			current_week : this.props.bookings.filter(filter_date)
		})
	}

	switch_view(event){
		this.setState({
			calendar : event.target.value == "true"
		})
	}

	switch_booking(event){
		dayCare = event.target.value == "true"
		this.setState({
			daycare: event.target.value == "true" //dummy
		})
	}

	render() {
		week = this.state.week;
		//to do
		// have current week's bookings in a new array as another state property
		// avoid iterating over all the bookings on a daycare/boarding switch
		let range = getDateRange(week)
		// encountered an issue on calculation in first week of march due to daylight saving time calculations
		// getDateRarnge.sun will also be a monday due to that excess 1 hour
		// fix if possible
		let {bookings_list, current_week} = this.state;
		let current = current_week.filter(filter_daycare)
		this.props.boz.arr = current
		let panel

		if (this.state.calendar){
			if (this.state.daycare){
				panel = <Grid print = {this.props.print} current = {current} payment = {this.props.payment} />
			}
			else
				panel = <Layout kennel_map = {this.props.kennel_map} bookings = {bookings_list} current = {current} range = {range} />
		}
		else{
			panel = <List kennel_map = {this.props.kennel_map} current = {current} payment = {this.props.payment} />
		}

		if (bookings_list){
			return(
				<div className="box cal">
					<div>
						<select className = "calendarSwitch" onChange = {this.switch_booking} value = {this.state.daycare}>
							<option value = {true}>Daycare</option>
							<option value = {false}>Boarding</option>
						</select>
						<button className = "dateButton" onClick = {this.nextWeek}> Prev </button>
						<p className = "datePicker">  {printDate(range.mon)} / {printDate(range.sun)}  </p>
						<button className = "dateButton" onClick = {this.prevWeek}> Next </button>
						<select className = "calendarSwitch" onChange = {this.switch_view} value = {this.state.calendar}>
							<option value = {false}>List</option>
							<option value = {true}>Grid</option>
						</select>

						<button className = "dateButton" onClick = {this.currentWeek}> This Week</button>
						<br></br>
					</div>
					{panel}
				</div>
			);
		}
		else
			 return (<div className="box cal"><br></br></div>);
	}
}
