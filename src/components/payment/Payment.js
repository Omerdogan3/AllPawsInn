'use babel';

import React from 'react';

let bookingChargesToPay = 0
let taxToPay = 0
let totalToPay = 0
let subToPay = 0

async function handleQuery(booking){
	const sqlConfig = require('../../js/sqlconfig')
	const sql = require('mssql')

	let pool = await sql.connect(sqlConfig)
	let id = booking.KennelID
	let qr2 = "Update dbo.KennelOccupancy SET Occupancy = 0 WHERE ID = " + id
	await pool.request()
	.query(qr2)

	let stat = booking.Status
	let bookingId = parseInt(booking.BookingID)

	let queryString = `UPDATE BookingObjects SET Status = '${booking.Status}' WHERE dbo.BookingObjects.BookingID = ${bookingId}`

	let result = await pool.request()
		 .query(queryString)

	sql.close()
}

export default class Payment extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			booking : this.props.booking
		}
		this.getSubTotal = this.getSubTotal.bind(this)
		this.getTotal = this.getTotal.bind(this)
		this.getTax = this.getTax.bind(this)
		this.getTotalToPay = this.getTotalToPay.bind(this)
		this.handlePrintSubmit = this.handlePrintSubmit.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	getSubTotal(booking){
		let rate = 0
		if(booking.DayCare){
			rate = booking.DayCareRate
		}
		else{
			rate = booking.BoardingRate
		}
		let total = booking.NoDays * rate

		return total
	}

	getTotal(booking){
		let total = this.getSubTotal(booking)
		let discoRate = 0

		if(Array.isArray(booking.Discount)){
			discoRate = booking.Discount[0]
		}
		else{
			discoRate = booking.Discount
		}

		let disco = (total*discoRate)/100

		total -= disco

		return total
	}

	getTax(booking){
		let total = this.getTotal(booking)

		let taxRate = 8

		let tax = ((total*taxRate)/100)

		return tax
	}

	getTotalToPay(booking){
		let total = this.getTotal(booking)
		let tax  = this.getTax(booking)
		let pay  = total + tax

		return pay
	}

	handleSubmit(event){
		this.props.kennel_map[this.props.booking.KennelID] = 0
		this.props.booking.Status = 'CO'
		handleQuery(this.props.booking)
		//query kennel map
		event.preventDefault();
		this.props.updateScreen("calendar")

	}

	handlePrintSubmit(event){
		window.print()
	}

	handleChange(event){
		if(event.target.value !== ''){
			let extra = parseFloat(event.target.value)
			let total = bookingChargesToPay + extra

			let taxRate = 8

			let tax = ((total*taxRate)/100)

			event.currentTarget.form[1].value = (tax).toFixed(2)

			event.currentTarget.form[2].value = (tax + total).toFixed(2)
		}else{
			let extra = parseFloat(0)
			let total = bookingChargesToPay + extra

			let taxRate = 8

			let tax = ((total*taxRate)/100)

			event.currentTarget.form[1].value = (tax).toFixed(2)

			event.currentTarget.form[2].value = (tax + total).toFixed(2)
		}
	}

	render(){
		let booking = this.state.booking;
		bookingChargesToPay = parseFloat(this.getTotal(booking).toFixed(2))
		taxToPay = parseFloat(this.getTax(booking).toFixed(2))
		totalToPay = parseFloat(this.getTotalToPay(booking).toFixed(2))
		subToPay = parseFloat(this.getSubTotal(booking).toFixed(2))
		return (
				<div className = "box cal" id="paymentInput" style = {left}>
					<form>
						<h3>Payment</h3>
						<h4>Booking</h4>
						<div className = "box">
							<div className = "row">
								<div className="col-sm-6"><b>Animal Name:</b> {this.props.booking.AnimalName !=  null ? this.props.booking.AnimalName : ''}<br></br></div>
								<div className="col-sm-6"><b>Client Name:</b> {this.props.booking.FirstName} {this.props.booking.LastName}<br></br></div>
							</div>
							<div className = "row">
							<div className="col-sm-6"><b>Kennel ID:</b> {this.props.booking.KennelID}<br></br></div>
							<div className="col-sm-6"><b>Animal Breed:</b> {this.props.booking.Breed}<br></br></div>
							</div>
							<div className = "row">
							<div className="col-sm-6"><b>Animal Size:</b> {this.props.booking.Size}<br></br></div>
							<div className="col-sm-6"><b>Days:</b> {this.props.booking.NoDays}<br></br></div>
							</div>
							<div className = "row">
							<div className="col-sm-6"><b>Date In:</b> {this.props.booking.DateIn.toString()}<br></br></div>
							<div className="col-sm-6"><b>Date Out:</b> {this.props.booking.DateOut.toString()}<br></br></div>
							</div>
						</div>
						<br></br>
						<div className = "box">
							<div className = "row">
								<div className="col-sm-6"><b>Boarding Rate: $ </b>{this.props.booking.BoardingRate !=  null ? this.props.booking.BoardingRate : ''}<br></br></div>
								<div className="col-sm-6"><b>DayCare Rate: $ </b>{this.props.booking.DayCareRate}<br></br></div>
							</div>
							<hr></hr>
							<div className = "row">
								<div className="col-sm-6"><b>Sub Total: $ </b>{subToPay}<br></br></div>
								<div className="col-sm-6"><b>Discount: % </b>{!Array.isArray(this.props.booking.Discount) ?  this.props.booking.Discount : this.props.booking.Discount[0]}<br></br></div>
							</div>
							<hr></hr>
							<div className = "row">
								<div className="col-sm-6"><b>Net Booking Charges   $</b>{bookingChargesToPay}<br></br></div>
								<div className="col-sm-6"><b>Other Goods: $ </b><input name = "others" type = "text"  onChange = {this.handleChange}/><br></br></div>
							</div>
							<hr></hr>
							<div className = "row">
								<div className="col-sm-6"><b>NY State Tax   $</b><input  disabled name = "tax" type = "text" value = {taxToPay}/><br></br></div>
								<div className="col-sm-6"><b>Total To Pay   $</b><input  disabled name = "total" type = "text" value = {totalToPay}/><br></br></div>
							</div>
						</div>
						<br></br>
						<button className = "profileButton" onClick = {this.handleSubmit}> Take Payment </button>
						<span className="print"><button className = "profileButton" onClick = {this.handlePrintSubmit}> Print </button></span>
					</form>
				</div>
			)
		}

	}

	const left = {
		display : "inline-block",
		margin : "10px"
	}

