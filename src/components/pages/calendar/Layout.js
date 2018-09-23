// ---------------------------------------- TO DO ----------------------------------------
const sqlConfig = require('../../../js/sqlconfig')
const sql = require('mssql')

'use babel';
let x = 3;
import React from 'react';
import GridLayout from 'react-grid-layout';

const oneDay = 24*60*60*1000;
// const sqlConfig = require('../../js/sqlconfig')
// const sql = require('mssql')

function colorScheme(status){ //color table
	switch(status){
		case "CI":
			return "yellow";
			break;
		case "CO":
			return "green";
			break;
		case "NCI":
			return "red";
			break;		
		case "NCO":
			return "red";
			break;
		default:
			return "grey"
			break;		
	}
}

function cellObject(range, obj){ //double check the logic here
	let dateOut = obj.DateOut
	let dateIn = obj.DateIn

	let date = new Date(Date.now())
	let new_obj = {
		static : (dateOut < date),
		h : 1,
		y : obj.KennelID * 1
	}

	if (range.sun > dateOut){
		if (dateIn > range.mon){ //between dateIn dateOut
			new_obj.x =  valueSundays(dateIn.getDay() - 1)
			new_obj.w = (Math.ceil((dateOut-dateIn)/oneDay)) || 1
		}
		else{										//between range.mon dateOut
			new_obj.x = 0
			new_obj.w = (Math.ceil((dateOut-range.mon)/oneDay)) || 1
		}
	}	
	else{
		if (dateIn > range.mon){ //between dateIn range.sun
			new_obj.x = valueSundays(dateIn.getDay() - 1)
			new_obj.w = (Math.ceil((range.sun-dateIn)/oneDay)) || 1
		}
		else{									//between range.mon range.sun
			new_obj.x = 0
			new_obj.w = (Math.ceil((range.sun-range.mon)/oneDay)) || 1
		}
	}
	return new_obj
}

function valueSundays(val){
	//can fix this more elegantly at some point
	//firstDay function returns value -1 for sundays since day.getDay() sunday is 0
	//val == -1 || 6 ...
	if (val === -1)
		return 6
	else
		return val

}
async function updateBooking(first, second, BookingID){
	let pool = await sql.connect(sqlConfig)
	let qr2 = `Update dbo.KennelOccupancy SET Occupancy = 0 WHERE ID = ${first}`
	await pool.request().query(qr2)
	let qr3 = `Update dbo.KennelOccupancy SET Occupancy = 1 WHERE ID = ${second}`
	await pool.request().query(qr3)
	let qr4 = `Update dbo.BookingObjects  SET KennelID = ${second} WHERE BookingID = ${BookingID}`
	await pool.request().query(qr4)

	//BookingID kennelini second yap
	sql.close()
}

export default class Layout extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			val : 1,
			range : this.props.range,
			current : this.props.current,
			bookings: this.props.bookings
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			range : nextProps.range,
			current : nextProps.current,
			bookings: nextProps.bookings
		})
	}

	onDragStop(e, element, newItem){
		for (let i = this.props.bookings.length-1; i>=0; i--){
			if (this.props.bookings[i].BookingID == newItem.i*1){
				let empty = this.props.bookings[i].KennelID
				this.props.bookings[i].KennelID = newItem.y
				this.props.kennel_map[empty].Occupancy = false
				this.props.kennel_map[newItem.y].Occupancy = true

				//switch kennel occupancy within the program
				updateBooking(empty, newItem.y, this.props.bookings[i].BookingID)
				break
			}
		}
		this.setState({
			val: 1
		})
		// this.props.bookings[newItem.i*1].KennelID = newItem.y + 1
		// updateBooking(bookings[newItem.i])
	}

	render(){
		//margin = {[20, 20]}
		//if date > current date map static grid items instead
		let {current, range} = this.state;
		x++
		return(
		<div>
			<ul className = "weekdays"><li>Monday</li>
			<li>Tuesday</li>
			<li>Wednesday</li>
			<li>Thursday</li>
			<li>Friday</li>
			<li>Saturday</li>
			<li>Sunday</li>
			</ul>
			<GridLayout layout = {x} className="layout" onDragStop = {this.onDragStop.bind(this)} preventCollision={true} cols={7} rowHeight={22} width={1440} isResizable = {false} compactType = {null}>
				{
				current.map(obj => 
					<div className = {colorScheme(obj.Status)} key = {obj.BookingID} data-grid={cellObject(range, obj)}><b>{obj.KennelID}. {obj.AnimalName}/{obj.FirstName} {obj.LastName}</b></div>
				)
				}
			</GridLayout>
		</div>
		)
	}
}

const header = {
	columnCount: 7
}