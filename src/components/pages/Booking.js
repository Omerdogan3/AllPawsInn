//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';
// import 'react-dates/initialize';
import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
import DayPicker from 'react-day-picker';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import Calendar from 'react-input-calendar';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';


const booking_lib = require('../../js/bookinglib');
const oneDay = 24*60*60*1000;

function create_date(datestr){
	let buffer = new Date(Date.now())
	buffer.setMonth(1)
	buffer.setDate(25)
	buffer.setFullYear(2018)
	return buffer;
}

function form_date(datestr){
	return `${datestr.getDate()}-${datestr.getMonth() + 1}-${datestr.getFullYear()}`
}

function handleMap(map_array){
	for(let i = 0; i < map_array.length; i++){
		if(!map_array[i].Occupancy){
			map_array[i].Occupancy = !map_array[i].Occupancy
			return map_array[i].ID*1
		}
	}
}

export default class Booking extends React.Component {
	constructor(props) {
		super(props)
		let date = new Date()

		this.state = {
			check : false,
			dropdown_pick : 0,
			animal: this.props.animal,
			book : [],
			startDate: moment(),
			endDate: moment().add(1,'weeks'),
			date: moment(),
      focused: null
		}

		for(let i = 0; i < this.props.animal.length; i++){
			this.state.book[i] = {
				FirstName: this.props.animal[i].FirstName,
				LastName : this.props.animal[i].LastName,
				AnimalID: this.props.animal[i].AnimalID,
				Status: "NCI",
				Breed : this.props.animal[i].Breed,
				DayCare : false, //this will probably be broken after multiple booking checks
				AnimalName : this.props.animal[i].AnimalName,
				DateIn : create_date(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`),
				DateOut : create_date(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`),
				NoDays: 1,
				BoardingRate : 35,
				Discount: this.props.animal[i].Discount
			}
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.submitAll = this.submitAll.bind(this)
		this.popBooking = this.popBooking.bind(this)
		this.dropdownSelected = this.dropdownSelected.bind(this)
		this.handleStartDateChange = this.handleStartDateChange.bind(this)
		this.handleEndDateChange = this.handleEndDateChange.bind(this)
		this.onFocusChange = this.onFocusChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.handleDayClick = this.handleDayClick.bind(this);
	}

	onFocusChange() {
    // Force the focused states to always be truthy so that date is always selectable
    this.setState({ focused: true });
	}
	
	onDateChange(date) {
    this.setState({ date });
  }

	handleStartDateChange(date) {
		console.log(form_date(date) + " " + "00:00:00.000")
		var a = moment(date)
		var b = moment(this.state.endDate)
		var noOfDays = a.diff(new Date(),'days')
		// console.log(noOfDays)
		// if(noOfDays < 0){
		// 	console.log("invalid!")
		// }


		if(a.diff(b) <= 0){
			this.state.book[this.state.dropdown_pick].DateIn = a
			this.state.book[this.state.dropdown_pick].NoDays =  (Math.ceil((this.state.book[this.state.dropdown_pick].DateOut-this.state.book[this.state.dropdown_pick].DateIn)/oneDay)) || 1
			this.setState({
		        startDate: date
		    });
    	}
    }

    handleEndDateChange(date) {
			var a = moment(date)
			var b = moment(this.state.endDate)
    	if(a.diff(b) > 0){
			this.state.book[this.state.dropdown_pick].DateOut = date._d
			this.state.book[this.state.dropdown_pick].NoDays =  (Math.ceil((this.state.book[this.state.dropdown_pick].DateOut-this.state.book[this.state.dropdown_pick].DateIn)/oneDay)) || 1
				
				this.setState({
            endDate: date
        });
    	}
    }

	popBooking(){
		let dummy = this.state.book
		if (dummy.length > 1) {
			dummy.splice([this.state.dropdown_pick], 1)
			if (this.state.dropdown_pick != 0)
				this.state.dropdown_pick--
			this.setState({
				book : dummy
			})
		}
		else
			this.props.updateScreen("home")
	}


	handleDayClick(day) {
		console.log(day)
    this.setState({
      selectedDay: day,
    });
  }

	handleSubmit(event){
		event.preventDefault();

		let {dropdown_pick, book} = this.state;
		let sqlArray = []
		//can make this block a function and use in the submitAll function aw to prevent redundant code
		let sql_obj = {
			DayCare : book[dropdown_pick].DayCare ? 1 : 0,
			AnimalID : book[dropdown_pick].AnimalID,
			KennelID: handleMap(this.props.kennel_map),
			DateIn : book[dropdown_pick].DateIn,
			NoDays : book[dropdown_pick].NoDays,
			DateOut : book[dropdown_pick].DateOut,
			BoardingRate : book[dropdown_pick].BoardingRate,
			Discount: book[dropdown_pick].Discount,
			Status: 'NCI'
		}
		sqlArray.push(sql_obj)

		book[dropdown_pick].BookingID = ++this.props.id_object.booking_id
		book[dropdown_pick].KennelID = sql_obj.KennelID
		this.props.bookings.push(book[dropdown_pick])

		booking_lib.create_booking(sqlArray, true)
		this.props.updateScreen("home")

	}

	submitAll(){

		let {book} = this.state;


		let sqlArray = []
		for(let i = 0; i < book.length; i++){
			let sql_obj = {
				DayCare : book[i].DayCare ? 1 : 0,
				AnimalID : book[i].AnimalID,
				KennelID: handleMap(this.props.kennel_map),
				DateIn : book[0].DateIn,
				DateOut : book[0].DateOut,
				NoDays : book[i].NoDays,
				BoardingRate : book[i].BoardingRate,
				Discount: book[i].Discount,
				Status: 'NCI'
			}

			book[i].KennelID = sql_obj.KennelID
			book[i].DateIn = book[0].DateIn
			book[i].DateOut = book[0].DateOut

			//clean this pack up
			sqlArray.push(sql_obj)
			book[i].BookingID = ++this.props.id_object.booking_id
			this.props.bookings.push(book[i])
		}
		booking_lib.create_booking(sqlArray, true)
		this.props.updateScreen("home")
	}

	handleChange(event){//test this
		let dummy = this.state.book
		dummy[this.state.dropdown_pick][event.target.name] = event.target.value
		this.setState({
			book : dummy
		})
	}

	dropdownSelected(event){
		this.setState({
			dropdown_pick: event.target.value
		})
	}

	componentWillReceiveProps(nextProps) {
		let date = new Date()
	  // You don't have to do this check first, but it can help prevent an unneeded render
	  if (nextProps.animal !== this.state.animal) {
	  	this.state.book = []
	  	for(let i = 0; i < nextProps.animal.length; i++){
				this.state.book[i] = {
					FirstName: nextProps.animal[i].FirstName,
					LastName : nextProps.animal[i].LastName,
					AnimalID: nextProps.animal[i].AnimalID,
					Status: "NCI",
					Breed : nextProps.animal[i].Breed,
					DayCare : false, //this will probably be broken after multiple booking checks
					AnimalName : nextProps.animal[i].AnimalName,
					DateIn : create_date(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`),
					DateOut : create_date(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`),
					NoDays: 1,
					BoardingRate : 35,
					Discount: nextProps.animal[i].Discount
				}
			}
	    this.setState({
	     dropdown_pick: 0,
	     animal : nextProps.animal
	   });
	  }
	}

	render(){
		let {dropdown_pick, book} = this.state;
		//default date value
		//disabled vs readonly fields
		//default kennel unit?
		//calendar no hour input atm
		//value wont change when a new reservation is prompted while already on the booking pag
		let dropdown = [];
		for (let i = 0; i < book.length; i++) {
		    dropdown.push(<option key={i} value={i}>{`${book[i].FirstName} ${book[i].LastName} - ${book[i].AnimalName}`}</option>);
		}

		return(
			<div className = "box cal">
				<h3>Booking</h3>
				<select onChange = {this.dropdownSelected} label="Multiple Select" multiple>
					{dropdown}
				</select><br></br>
				
				<div className="dateSelector">
					<div id="dateIn">
						<b>Date In</b><br/>
						<DayPicker
							showWeekNumbers
							todayButton="Go to Today"
							onDayClick={this.handleStartDateChange}
						/>
					</div>
					<div id="dateOut">
						<b>Date Out</b><br/>
						<DayPicker
							showWeekNumbers
							todayButton="Go to Today"
							onDayClick={this.handleEndDateChange}
						/>
					</div>
				</div>
	
			
			<div className = "box">
					<b>Client Name</b><input disabled type = "text" value = {`${book[dropdown_pick].FirstName} ${book[dropdown_pick].LastName}`} />
					<button className = "bookingbutton" onClick = {this.popBooking}> X </button><br></br>
					<b>Animal Name</b><input disabled type = "text" value = {book[dropdown_pick].AnimalName}/><br></br>
					<b>Animal Breed</b><input disabled type = "text" value = {book[dropdown_pick].Breed}/><br></br>
					
					
					<b>Days</b><input disabled name = "NoDays" type = "text" value = {book[dropdown_pick].NoDays}/><br></br>
					<b>Discount Rate   %</b><input disabled name = "Discount" type = "text" value = {book[dropdown_pick].Discount}/><br></br>
					<b>Boarding Rate   $</b><input name = "BoardingRate" type = "text" value = {book[dropdown_pick].BoardingRate} onChange = {this.handleChange}/><br></br>
					<div id="submitInput">
						<button className = "profileButton" onClick = {this.handleSubmit}> Submit </button>
					</div>
				</div>
				<div id="submitInput">
						<button className = "profileButton" onClick = {this.submitAll}>Submit All</button>
				</div>

			</div>
		)
	}

}

const left = {
	display : "inline-block",
	margin : "10px"
}