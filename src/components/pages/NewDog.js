// ---------------------------------------- TO DO ----------------------------------------

'use babel';

import React from 'react';
const sqlConfig = require('../../js/sqlconfig')
const sql = require('mssql')


async function insertAnimal(animal){
	let pool = await sql.connect(sqlConfig)
	let ClientID = animal.ClientID
	if (ClientID[0])
		ClientID = ClientID[0]

	let qr = `INSERT INTO Animals (ClientID,TypeID,AnimalName,Breed,Sex,Food1TypeName,Food1Freq,Food1Amount,MedicalConditions)
	VALUES ('${ClientID}','2','${animal.AnimalName}','${animal.AnimalBreed}','${animal.AnimalSex}','${animal.FoodType}','${animal.FoodFreq}','${animal.FoodAmount}','${animal.MedicalDetails}')`

	await pool.request()
	.query(qr)
	sql.close()
}
export default class NewDog extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
		let newobj = JSON.parse(JSON.stringify(this.props.animal))
		for (let key in newobj){
			this.state[key] = newobj[key]
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(event){//test this
		this.setState({
			[event.target.name] : event.target.value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		let dog = this.state
		this.props.id_obj.animal_id ++
		dog.AnimalID = this.props.id_obj.animal_id
		insertAnimal(dog)
		this.props.dogs.push(dog)
		this.props.updateScreen("home")
		//query
	}

	render(){
		return (
			<div className = "box cal">
				<h3>New Dog</h3><br></br>
				<form onSubmit = {this.handleSubmit}>
					<b><h4>Client</h4></b>
					<div className = "box">
						<div className="row">
							<div className="col-sm-6"><b>First Name *</b><input disabled name = "FirstName" type = "text" value = {this.state.FirstName}/><br></br></div>
							<div className="col-sm-6"><b>Last Name *</b><input disabled name = "LastName" type = "text" value = {this.state.LastName}/><br></br></div>
						</div>
						<div className="row">
							<div className="col-sm-6"><b>Address *</b><input disabled name = "Address1" type = "text" value = {this.state.Address1}/><br></br></div>
							<div className="col-sm-6"><b>Email *</b><input disabled name = "Email" type = "text" value = {this.state.Email}/><br></br></div>
						</div>
					</div>
					<b><h4>Animal</h4></b>
					<div className = "box">
						<div className="row">
			  			<div className="col-sm-6"><b>Animal Name *</b><input onChange = {this.handleChange} name = "AnimalName" type = "text" value = {this.state.AnimalName}/><br></br></div>
				  		<div className="col-sm-6"><b>Animal Breed *</b><input onChange = {this.handleChange} name = "Breed" type = "text" value = {this.state.AnimalBreed}/><br></br></div>
						</div>
						<div className="row">
							<div className="col-sm-6"><b>Animal Sex</b><input onChange = {this.handleChange} name = "Sex" type = "text" value = {this.state.Sex}/><br></br></div>
						</div>
						<div className="row">
							<div className="col-sm-6"><b>Food Type</b><input onChange = {this.handleChange} name = "Food1TypeName" type = "text" value = {this.state.FoodType}/><br></br></div>
							<div className="col-sm-6"><b>Food Frequency</b> <input onChange = {this.handleChange} name = "Food1Freq" type = "text" value = {this.state.FoodFrequency}/><br></br></div>
						</div>

						<div className="row">
							<div className="col-sm-6"><b>Food Amount</b><input name = "Food1Amount" onChange = {this.handleChange} type = "text" value = {this.state.FoodAmount}/><br></br></div>
							<div className="col-sm-6"><b>MedicalDetails</b> <input name = "MedicalConditions" onChange = {this.handleChange} type = "text" value = {this.state.MedicalDetails}/><br></br></div>
						</div>
						<div className="row">
							<div className="col-sm-6"><b>Discount</b><input name = "Discount" type = "text" onChange = {this.handleChange} value = {this.state.Discount}/><br></br></div>
						</div>
					</div>
					<br></br>
					<div id="submitInput">
						<input className = "profileButton" type = "Submit" value = "Submit"/>
					</div>
				</form>
			</div>)
		}
	}
