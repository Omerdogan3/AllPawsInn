// ---------------------------------------- TO DO ----------------------------------------
// -- Calendar shouldnt re-render on search
'use babel';

import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './Navbar'
import Screen from './Screen'
import Sidescreen from './Sidescreen'

const sqlConfig = require('../js/sqlconfig')
const sql = require('mssql')
const booking_lib = require('../js/bookinglib')

export default class Main extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			dog_list : [],
			booking_list : [],
			alerts : [],
			notifications : [],
			kennel_map: [],
			bozun_objesi : {}
		}
		this.grabDogs()
	}

	componentWillMount(){
		this.setState({
			screen : "",
			sidescreen : false,
			query : ""
		})

		this.updateScreen = this.updateScreen.bind(this)
		this.toggle_side = this.toggle_side.bind(this)
		this.toggle_side_off = this.toggle_side_off.bind(this)
		this.grab_animal = this.grab_animal.bind(this)
		this.full_profile = this.full_profile.bind(this)
		this.new_dog = this.new_dog.bind(this)
		this.get_client = this.get_client.bind(this)
		this.get_payment = this.get_payment.bind(this)
		this.get_daycare = this.get_daycare.bind(this)
		this.push_alert = this.push_alert.bind(this)
		this.push_notif = this.push_notif.bind(this)
		this.get_print = this.get_print.bind(this)
	}

	async grabDogs(){

		// insert => "INSERT INTO dbo.Colours (ColourName) VALUES ('Blue')"
		// delete => "DELETE FROM [KMDB].[dbo].[BookingObjects] where BookingID > 16805"
		// select => "SELECT * FROM dbo.Animals"

		// catch errors in this block
		// fill out empty id's before pushing the sql
		let pool = await sql.connect(sqlConfig)
		let result = await pool.request()
			.query("SELECT * from dbo.Animals, dbo.VetDetails, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID and dbo.ClientDetails.VetSurgeryId = dbo.VetDetails.ID")
		//if err sql.close
		// "SELECT top 1 * from dbo.BookingObjects order by BookingID desc" // returns most recently assigned ID
		let bookings = await pool.request()
			.query("SELECT * from dbo.BookingObjects ,dbo.VetDetails, dbo.Animals, dbo.ClientDetails where dbo.Animals.ClientID = dbo.ClientDetails.ClientID and dbo.Animals.AnimalID =  dbo.BookingObjects.AnimalID and dbo.ClientDetails.VetSurgeryId = dbo.VetDetails.ID and dbo.BookingObjects.DateOut > '2017-07-06 12:00:00.000'")
		//if err sql.close
		let num = await pool.request()
			.query("SELECT top 1 * from dbo.BookingObjects order by BookingID desc")

		let client = await pool.request()
			.query("SELECT top 1 * from dbo.ClientDetails order by ClientID desc")

		let animal = await pool.request()
			.query("SELECT top 1 * from dbo.Animals order by AnimalID desc")

		let kennel_map = await pool.request()
			.query("SELECT * FROM dbo.KennelOccupancy ORDER BY ID;")

		//if err sql.close

		sql.close()

		this.setState({
			dog_list : result.recordset,
			id_object : {
				booking_id : num.recordset[0].BookingID,
				client_id : client.recordset[0].ClientID,
				animal_id : animal.recordset[0].AnimalID,
			},
			kennel_map : kennel_map.recordset,
			booking_list : bookings.recordset
		})
	}

	push_alert(alert){
		let tmp = this.state.alerts
		tmp.push(alert)
		this.setState({
			alerts : tmp
		})
	}

	push_notif(notification){
		let tmp = this.state.notifications
		tmp.push(notification)
		this.setState({
			notifications : tmp
		})
	}

	updateScreen(new_screen){
		this.setState({
			screen : new_screen
		})
	}

	toggle_side(query){
		this.setState({
			sidescreen : true,
			query : query
		})
	}

	toggle_side_off(){
		this.setState({
			sidescreen : false
		})
	}

	new_dog(animal){
		this.setState({
			animal : animal,
			screen : "new_dog"
		}) //simple value
	}

	grab_animal(animal){
		this.setState({
			animal : animal,
			screen : "booking"
		}) //simple value
	}

	full_profile(animal){
		this.setState({
			animal : animal,
			screen : "full_profile"
		})
	}

	get_client(animal){
		this.setState({
			animal : animal,
			screen : "client"
		})
	}

	get_payment(booking){
		this.setState({
			payBooking : booking,
			screen : "payment"
		})
	}

	get_print(booking){
		this.setState({
			booking : booking,
			screen : "print"
		})
	}

	get_daycare(animal){
		let date = new Date(Date.now())
		let day = date.toString().substring(0, 3)

		switch (day){
			case 'Mon':
				day = 'm'
				break;
			case 'Tue':
				day = 't'
				break;
			case 'Wed':
				day = 'w'
				break;
			case 'Thu':
				day = 'r'
				break;
			case 'Fri':
				day = 'f'
				break;
			case 'Sat':
				day = 's'
				break;
		}

		let sqlArray = []

		for(let i = 0; i<animal.length;i++){
			this.state.id_object.booking_id++ 
			let sql_obj = {
				DayCare : 1,
				NoDays : 1,
				AnimalID : animal[i].AnimalID,
				KennelID : 1,
				DateIn : date,
				DateOut : date,
				DayCareRate : 21.99,
				Days : day,
				Discount : animal[i].Discount,
				Status : 'NCI'
			}

			let newobj = JSON.parse(JSON.stringify(sql_obj))
			newobj.DateIn = new Date(Date.parse(newobj.DateIn))
			newobj.DateOut = new Date(Date.parse(newobj.DateOut))

			sqlArray.push(sql_obj)


			newobj.BookingID = this.state.id_object.booking_id
			newobj.AnimalName = animal[i].AnimalName
			newobj.FirstName = animal[i].FirstName
			newobj.LastName = animal[i].LastName
			newobj.Colour = animal[i].Colour
			newobj.Sex = animal[i].Sex
			newobj.Age = animal[i].Age
			newobj.Breed = animal[i].Breed

			this.state.booking_list.push(newobj)

		}

		booking_lib.create_booking(sqlArray, false)

		this.setState({
			animal : animal,
			screen : "home",
		})
	}

	render(){
		//order props neatly
		//pay booking && booking is passed as undefined
		return(
			<div style={{backgroundColor: "#D3D3D3"}}>
				<Navbar updateScreen = {this.updateScreen} side = {this.toggle_side} dogs = {this.state.dog_list}/>
				<div className='wrapper'>
					<Screen new_dog = {this.new_dog} kennel_map = {this.state.kennel_map} print = {this.get_print} boz = {this.state.bozun_objesi} updateScreen = {this.updateScreen} payment = {this.get_payment} booking = {this.state.payBooking} id_object = {this.state.id_object} animal = {this.state.animal} screen = {this.state.screen} dogs = {this.state.dog_list} bookings = {this.state.booking_list} currentId = {this.state.booking}/>
					<Sidescreen alerts = {this.state.alerts} notifications = {this.state.notifications} push_notif = {this.push_notif} push_alert = {this.push_alert} daycare = {this.get_daycare} client = {this.get_client} profile = {this.full_profile} proc = {this.grab_animal} dogs = {this.state.dog_list} query = {this.state.query} side = {this.toggle_side_off} sidescreen = {this.state.sidescreen}/>
				</div>
			</div>
		);
	}
}
