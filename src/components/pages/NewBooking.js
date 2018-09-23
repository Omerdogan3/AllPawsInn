const sqlConfig = require('../../js/sqlconfig')
const sql = require('mssql')
//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';

import React, { Component } from 'react';
import Calendar from 'react-input-calendar'
const booking_lib = require('../../js/bookinglib')

function create_date(datestr){
	let dt_in = datestr.split('/')
	let buffer = new Date(Date.now())
	buffer.setMonth(dt_in[0] - 1)
	buffer.setDate(dt_in[1])
	buffer.setFullYear(dt_in[2])
	return buffer;

}
async function selectClient(client,VetId){
	let pool = await sql.connect(sqlConfig)
	let vetId=VetId;
	let clientObj;
	let qr = `select * from ClientDetails where Email = '${client.Email}' and LastName = '${client.LastName}' and Address1 = '${client.Adress}' and VetSurgeryID='${vetId}'`
	//if err s
	await pool.request().query(qr)
.then(result => {
	// console.dir(result.recordset[0])
	clientObj=result.recordset[0];

}).catch(err => {
	// ... error checks
})
	sql.close()
	return clientObj;
}

async function selectAnimalType(animal){
	let pool = await sql.connect(sqlConfig)
	let id='';

	let qr = `select * from AnimalTypes where AnimalTypeID = '2'`
	//if err s
	await pool.request().query(qr)
.then(result => {
	console.dir(result.recordset[0])

}).catch(err => {
	// ... error checks
})
	sql.close()
	return id;
}
async function selectAnimal(animal,clientID){
	let pool = await sql.connect(sqlConfig)
	let animalObj;
	let qr = `select * from Animals where AnimalName = '${animal.AnimalName}' and ClientID = clientID`
	//if err s
	await pool.request().query(qr)
.then(result => {
	// console.dir(result.recordset[0])
	animalObj=result.recordset[0]
}).catch(err => {
	// ... error checks
})
	sql.close()
	return animalObj;
}

async function newClient(client,vetId){
	let vetID = vetId;
	let pool = await sql.connect(sqlConfig)
	let qr = `INSERT INTO ClientDetails (FirstName,LastName,Address1,Email,PostcodeZIP,TelHome,TelWork,VetSurgeryId)
	VALUES ('${client.FirstName}','${client.LastName}','${client.Adress}','${client.Email}','${client.Zip}','${client.Contact_home}','${client.Contact_work}','${vetId}')`
	//if err s
	await pool.request().query(qr)
	sql.close()
	console.log("client created...")
	return vetID;
}


async function newAnimal(animal,clientID){
	let clientid=clientID
	console.dir(clientid)
	let pool = await sql.connect(sqlConfig)
	let qr = `INSERT INTO Animals (ClientID,TypeID,AnimalName,Breed,Sex,Food1TypeName,Food1Freq,Food1Amount,MedicalConditions)
	VALUES ('${clientID}','2','${animal.AnimalName}','${animal.AnimalBreed}','${animal.AnimalSex}','${animal.FoodType}','${animal.FoodFreq}','${animal.FoodAmount}','${animal.MedicalDetails}')`
	//if err s
	await pool.request().query(qr)
	sql.close()
	console.log("animal created...")
	return clientid;
}


async function newVet(vet){

	let pool = await sql.connect(sqlConfig)
	let qr = `INSERT INTO VetDetails (PracticeName,VetName,ContactNo,Address1,Town,Email)
	VALUES ('${vet.Practice_name}','${vet.Vet_name}','${vet.Contact}', '${vet.Address}','${vet.Town}', '${vet.Email}')`
	//if err s
	await pool.request().query(qr).then(result => {


	}).catch(err => {
		console.dir(err)
	})
	sql.close()
	console.log("vet created...")
}
async function getVet(vet){
	let VetObject;
	let pool = await sql.connect(sqlConfig)
	let qr = `select * from VetDetails where PracticeName='${vet.Practice_name}' and VetName='${vet.Vet_name}' and ContactNo = '${vet.Contact}' and Email='${vet.Email}'`
	//if err s
	await pool.request().query(qr).then(result => {
		VetObject=result.recordset[0];
	}).catch(err => {
		console.log(err)
	})
	sql.close()
	return VetObject;
}

export default class NewBooking extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id : this.props.id_object
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleSubmit(event){
		event.preventDefault();

		let client_details = {
			FirstName : event.target[0].value,
			LastName : event.target[1].value,
			Adress : event.target[2].value,
			Email : event.target[3].value,
			Zip : event.target[4].value,
			Contact_home :event.target[5].value,
			Contact_work :event.target[6].value,
			Allow_mail:event.target[7].value
		}
	let animal = {
			AnimalName : event.target[8].value,
			AnimalBreed : event.target[9].value,
			AnimalSex : event.target[10].value,
			KennelUnit : event.target[11].value,
			FoodType: event.target[12].value,
			FoodFreq: event.target[13].value,
			FoodAmount: event.target[14].value,
			MedicalDetails: event.target[15].value,
			Discount:event.target[16].value,
		}

		let vet_details = {
			Practice_name : event.target[17].value,
			Vet_name : event.target[18].value,
			Contact : event.target[19].value,
			Address : event.target[20].value,
			Town : event.target[21].value,
			Email : event.target[22].value,
		}
	let tempClient,tempAnimal,tempVet;
	let merged;
newVet(vet_details).then(result=>{
	getVet(vet_details).then(VetObject =>{
		tempVet=VetObject
		newClient(client_details,VetObject.ID).then(VetID => {
			selectClient(client_details,VetID).then(clientObj => {
				tempClient=clientObj;

				newAnimal(animal,clientObj.ClientID).then(clientID =>{
					selectAnimal(animal,clientID).then(animalObj =>{
						tempAnimal=animalObj;
						merged = Object.assign({}, tempClient, tempAnimal);
						this.props.dogs.push(merged)
					})
				})
			})
		})
	})
})

		this.props.updateScreen("home")

	}

	render(){
		//default date value
		//disabled vs readonly fields
		//default kennel unit?
		//calendar no hour input atm
		return (
			<div className = "box cal">
				<h3>New Client</h3><br></br>
				<form onSubmit = {this.handleSubmit}>
					<b><h4>Client</h4></b>
					<div className = "box">
						<div className="row">
							<div className="col-sm-6"><b>First Name *</b><input name = "FirstName" type = "text"/><br></br></div>
							<div className="col-sm-6"><b>Last Name *</b><input name = "LastName" type = "text"/><br></br></div>
						</div>
						<div className="row">
							<div className="col-sm-6"><b>Address *</b><input name = "Address1" type = "text" /><br></br></div>
							<div className="col-sm-6"><b>Email *</b><input name = "Email" type = "text"/><br></br></div>
						</div>
						<div className="row">
							<div className="col-sm-6"><b>Postcode ZIP</b><input name = "PostcodeZIP" type = "text"/><br></br></div>
							<div className="col-sm-6"><b>Contact(Home)</b><input name = "TelHome" type = "text"/><br></br></div>
						</div>
						<div className="row">
							<div className="col-sm-6"><b>Contact(Work)</b><input name = "TelWork" type = "text"/><br></br></div>
							<div className="col-sm-6"><b>Allow Mailings</b>
							<select name = "Mailings">
							<option value = "Yes">Yes</option>
							<option value = "No">No</option>
							</select>
						</div>
					</div>
				</div>
				<b><h4>Animal</h4></b>
				<div className = "box">
					<div className="row">
		  			<div className="col-sm-6"><b>Animal Name *</b><input name = "animal_name" type = "text"/><br></br></div>
			  		<div className="col-sm-6"><b>Animal Breed *</b><input name = "type" type = "text"/><br></br></div>
					</div>
					<div className="row">
						<div className="col-sm-6"><b>Animal Sex</b><input name = "sex" type = "text"/><br></br></div>
						<div className="col-sm-6"><b>Kennel Unit</b> <input name = "kennel_unit" type = "text"/><br></br></div>
					</div>
					<div className="row">
						<div className="col-sm-6"><b>Food Type</b><input name = "food_type" type = "text"/><br></br></div>
						<div className="col-sm-6"><b>Food Frequency</b> <input name = "food_freq" type = "text"/><br></br></div>
					</div>

					<div className="row">
						<div className="col-sm-6"><b>Food Amount</b><input name = "food_amount" type = "text"/><br></br></div>
						<div className="col-sm-6"><b>MedicalDetails</b> <input name = "medical_details" type = "text"/><br></br></div>
					</div>
					<div className="row">
						<div className="col-sm-6"><b>Discount</b><input name = "discount" type = "text" /><br></br></div>
					</div>
				</div>
				<b><h4>Vet Details</h4></b>
				<div className = "box">
					<div className="row">
	  				<div className="col-sm-6"><b>Practice Name *</b><input name = "practice_name" type = "text"/><br></br></div>
	  				<div className="col-sm-6"><b>Vet Name *</b><input name = "vet_name" type = "text"/><br></br></div>
					</div>
					<div className="row">
						<div className="col-sm-6"><b>Contact No</b><input name = "contact" type = "text"/><br></br></div>
						<div className="col-sm-6"><b>Address</b> <input name = "contact" type = "text"/><br></br></div>
					</div>
					<div className="row">
						<div className="col-sm-6"><b>Town</b><input name = "town" type = "text"/></div>
						<div className="col-sm-6"><b>Email</b><input name = "email" type = "text"/><br></br></div>
					</div>
				</div>
				<br></br>
				<div id="submitInput">
					<input className = "profileButton" type = "Submit" value = "Submit"/>
				</div>

				</form>
			</div>
		)
	}
}
