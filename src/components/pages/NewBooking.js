const sqlConfig = require('../../js/sqlconfig')
const sql = require('mssql')
//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';

import React, { Component } from 'react';
import Calendar from 'react-input-calendar'
import { Table, Tbody, Tr, Th } from 'react-super-responsive-table'

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
	// console.log(client)
	let qr = `INSERT INTO ClientDetails (FirstName,LastName,Address1,Email,PostcodeZIP,TelHome,TelWork,VetSurgeryId,Town)
	VALUES ('${client.FirstName}','${client.LastName}','${client.Adress}','${client.Email}','${client.Zip}','${client.Contact_home}','${client.Contact_work}','${vetId}','${client.Town}')`
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
	console.log(animal)
	let qr = `INSERT INTO Animals (ClientID,TypeID,AnimalName,Breed,Sex,Food1TypeName,Food1Freq,Food1Amount,MedicalConditions,Age)
	VALUES ('${clientID}','2','${animal.AnimalName}','${animal.AnimalBreed}','${animal.AnimalSex}','${animal.FoodType}','${animal.FoodFreq}','${animal.FoodAmount}','${animal.MedicalDetails}','${animal.Age}')`
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
			id : this.props.id_object,
			fillRequired: false
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
			Contact_home : event.target[5].value,
			Contact_work : event.target[6].value,
			Allow_mail: event.target[7].value,
			Town: event.target[8].value
		}
		let animal = {
			AnimalName : event.target[9].value,
			AnimalBreed : event.target[10].value,
			AnimalSex : event.target[11].value,
			KennelUnit : event.target[12].value,
			FoodType: event.target[13].value,
			FoodFreq: event.target[14].value,
			FoodAmount: event.target[15].value,
			MedicalDetails: event.target[16].value,
			Discount: event.target[17].value,
			Age: event.target[18].value
		}
		let vet_details = {
			Practice_name : event.target[19].value,
			Vet_name : event.target[20].value,
			Contact : event.target[21].value,
			Address : event.target[22].value,
			Town : event.target[23].value,
			Email : event.target[24].value,
		}
	let tempClient,tempAnimal,tempVet;
	let merged;

		if(
			client_details.FirstName === "" || 
			client_details.LastName === "" ||
			client_details.Adress === "" ||
			client_details.Email === "" ||
			animal.AnimalName === "" ||
			animal.AnimalBreed === "" ||
			vet_details.Practice_name === "" ||
			vet_details.Vet_name === "" 
		){
			this.setState({
				fillRequired: true
			})
		}else{
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



	}

	render(){
		//default date value
		//disabled vs readonly fields
		//default kennel unit?
		//calendar no hour input atm
		return (
			<div className = "box cal">
				{
					// <h2>New Client</h2><br/>
				}
				<form onSubmit = {this.handleSubmit}>
					<b><h3>Client</h3></b>
					<div className = "box">
					<table className = "table table-hover">
						<tbody>
							<tr>
								<th><b>First Name *</b></th>
								<th><input name = "FirstName" type = "text"/></th>
								<th><b>Last Name *</b></th>
								<th><input name = "LastName" type = "text"/></th>
								<th><b>Address *</b></th>
								<th><input name = "Address1" type = "text"/></th>
							</tr>
							<tr>
								<th><b>Email *</b></th>
								<th><input name = "Email" type = "text"/></th>
								<th><b>Postcode ZIP</b></th>
								<th><input name = "PostcodeZIP" type = "text"/></th>
								<th><b>Contact(Home)</b></th>
								<th><input name = "TelHome" type = "text"/></th>
							</tr>
							<tr>
								<th><b>Contact(Work)</b></th>
								<th><input name = "TelWork" type = "text"/></th>
								<th><b>Allow Mailings</b></th>
								<th><select name = "Mailings">
								<option value = "Yes">Yes</option>
								<option value = "No">No</option>
								</select></th>
								<th><b>Town</b></th>
								<th><input name = "town" type = "text" /></th>
							</tr>
						</tbody>
					</table>
				</div>

				<b><h3>Animal</h3></b>
				<div className = "box">
					<table className = "table table-hover">
						<tbody>
							<tr>
								<th><b>Animal Name *</b></th>
								<th><input name = "animal_name" type = "text"/></th>
								<th><b>Animal Breed *</b></th>
								<th><input name = "type" type = "text"/></th>
								<th><b>Animal Sex</b></th>
								<th><input name = "sex" type = "text"/></th>
							</tr>
							<tr>
								<th><b>Kennel Unit</b></th>
								<th><input name = "kennel_unit" type = "text"/></th>
								<th><b>Food Type</b></th>
								<th><input name = "food_type" type = "text"/></th>
								<th><b>Food Frequency</b></th>
								<th><input name = "food_freq" type = "text"/></th>
							</tr>
							<tr>
								<th><b>Food Amount</b></th>
								<th><input name = "food_amount" type = "text"/></th>
								<th><b>MedicalDetails</b></th>
								<th><input name = "medical_details" type = "text"/></th>
								<th><b>Discount</b></th>
								<th><input name = "discount" type = "text" /></th>
							</tr>
							<tr>
								<th><b>Age</b></th>
								<th><input name = "age" type = "number" /></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</tbody>
					</table>

				</div>
				<b><h3>Vet Details</h3></b>
				<div className = "box">
				<table className = "table table-hover">
					<tbody>
						<tr>
							<th><b>Practice Name *</b></th>
							<th><input name = "practice_name" type = "text"/></th>
							<th><b>Vet Name *</b></th>
							<th><input name = "vet_name" type = "text"/></th>
							<th><b>Contact No</b></th>
							<th><input name = "contact" type = "text"/></th>
						</tr>
						<tr>
							<th><b>Address</b></th>
							<th><input name = "contact" type = "text"/></th>
							<th><b>Town</b></th>
							<th><input name = "town" type = "text"/></th>
							<th><b>Email</b></th>
							<th><input name = "email" type = "text"/></th>
						</tr>
					</tbody>
				</table>
				</div>
				<br/>

				{
					this.state.fillRequired && <div className="alert alert-danger" role="alert"><p>Please Fill All Required Places</p></div> 
				}

				<div id="submitInput">
					<input className = "profileButton" type = "Submit" value = "Submit"/>
				</div>
				

				</form>
			</div>
		)
	}
}
