const sqlConfig = require('../../js/sqlconfig')
const sql = require('mssql')
//// ---------------------------------------- TO DO ----------------------------------------
// validate user inputs before querying
// replace arbitrary kennel number
'use babel';

import React, { Component } from 'react';
import Calendar from 'react-input-calendar'
const booking_lib = require('../../js/bookinglib')

async function updateClient(client){
	let pool = await sql.connect(sqlConfig)
	let qr = `UPDATE dbo.ClientDetails SET dbo.ClientDetails.LastName = '${client.LastName}', dbo.ClientDetails.FirstName = '${client.FirstName}', dbo.ClientDetails.PartnerName = '${client.PartnerName}',
	dbo.ClientDetails.Address1 = '${client.Address1}',dbo.ClientDetails.Address3 ='${client.Town}', dbo.ClientDetails.Region ='${client.Region}', dbo.ClientDetails.PostcodeZIP ='${client.Postcode}',
	dbo.ClientDetails.Country ='${client.Country}', dbo.ClientDetails.TelHome ='${client.Tel_home}', dbo.ClientDetails.CellMobile ='${client.Mobile}', dbo.ClientDetails.Email ='${client.Email}',
	dbo.ClientDetails.WebContact ='${client.Web}', dbo.ClientDetails.ClientIdent ='${client.Indetification}', dbo.ClientDetails.Referred ='${client.Referred}', dbo.ClientDetails.Discount ='${client.Discount}',
	dbo.ClientDetails.ClientNotes ='${client.Notes}'
 	WHERE dbo.ClientDetails.ClientID = '${client.ClientID}'`
	//if err s
	await pool.request().query(qr)
	sql.close()
	console.dir("client updated...")
}

async function selectClient(clientID){
	let pool = await sql.connect(sqlConfig)
	let clientObj;
	console.dir(clientID)
	let qr = `select * from ClientDetails where dbo.ClientDetails.ClientID = '${clientID}' `
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

async function updateVet(vet){


	let pool = await sql.connect(sqlConfig)
	let qr = `UPDATE dbo.VetDetails SET dbo.VetDetails.VetName = '${vet.Vetname}', dbo.VetDetails.Address1 = '${vet.Address1}', dbo.VetDetails.Address2 = '${vet.Address2}',
	 dbo.VetDetails.Town = '${vet.Town}',  dbo.VetDetails.PostcodeZIP = '${vet.Postcode}',  dbo.VetDetails.Email = '${vet.Email}',  dbo.VetDetails.AddRegion = '${vet.Region}'
 	WHERE dbo.VetDetails.ID = '${vet.VetID}'`
	//if err s
	await pool.request().query(qr).then(result => {


	}).catch(err => {
		console.dir(err)
	})
	sql.close()
	console.log("vet updated...")
}



export default class ClientProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			animal : this.props.animal
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.newDog = this.newDog.bind(this)
	}


	handleSubmit(event){
		event.preventDefault();
		let client_details = {
			ClientID : this.props.animal[0].ClientID[0],
			LastName : event.target[0].value,
			FirstName : event.target[1].value,
			PartnerName : event.target[2].value,
			Address1 : event.target[3].value,
			Town : event.target[4].value,
			Region :event.target[5].value,
			Postcode :event.target[6].value,
			Country:event.target[7].value,
			Tel_home:event.target[8].value,
			Mobile:event.target[9].value,
			Email:event.target[10].value,
			Web:event.target[11].value,
			Indetification:event.target[12].value,
			Referred:event.target[13].value,
			Discount: parseInt(event.target[14].value),
			Notes:event.target[15].value,
		}
		let vet_details ={
			VetID : this.props.animal[0].VetSurgeryID,
			Surgery: event.target[16].value,
			Vetname: event.target[17].value,
			Address1: event.target[18].value,
			Address2: event.target[19].value,
			Town: event.target[20].value,
			Region: event.target[21].value,
			Postcode: event.target[22].value,
			Email: event.target[23].value,
		}

		updateClient(client_details).then(result=>{
			updateVet(vet_details).then(result=>{
				selectClient(client_details.ClientID).then(clientObj=>{
				 	// console.dir(this.props.animal[0])
					// console.dir(clientObj)
					for (let key in this.props.animal[0]){ //key1[key] = value // would be better than this
						for (let key2 in clientObj){
								if(key===key2){
									this.props.animal[0][key]=clientObj[key2]
								}
								// console.log(`${key2} is ${clientObj[key2]}`)
							}
							// console.log(`${key} is ${this.props.animal[0][key]}`)
					}
						console.dir(clientObj)
					 console.dir(this.props.animal[0])
				})
			})
		})
		// console.dir(this.props.dogs)
		this.props.updateScreen("home")


	}

	newDog(){
		this.props.new_dog(this.props.animal[0])
	}

	render() {
		if (this.props.animal)
			return  (
				<div className = "box cal">
				<h3>Client Details</h3><button className = "profileButton" onClick = {this.newDog}>+Dog</button>
				<form onSubmit = {this.handleSubmit}>
					<br></br>
					<div className = "box">
						<div className="row">
							<div className="col-sm-8"><h6>Last Name:</h6><input name = "LastName" type = "text" placeholder = "Edit LastName" defaultValue = {this.props.animal[0].LastName}/></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>First Name:</h6><input name = "FirstName" type = "text" placeholder = "Edit FirstName" defaultValue = {this.props.animal[0].FirstName}/> </div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>Partner Name:</h6><input name = "PartnerName" type = "text" placeholder = "Edit PartnerName" defaultValue = {this.props.animal[0].PartnerName}/> </div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4">	<h6>Address:</h6><input name = "Address" type = "text" placeholder = "Edit Address" defaultValue = {!Array.isArray(this.props.animal[0].Address1) ? this.props.animal[0].Address1 : this.props.animal[0].Address1[1]} />  <br></br></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Town/City:</h6><input name = "Town" type = "text" placeholder = "Edit City" defaultValue = {this.props.animal[0].Address3}/>  <br></br></div>
						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Region/State:</h6> <input name = "Region" type = "text" placeholder = "Edit State" defaultValue = {this.props.animal[0].Region}/> </div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>PostcodeZIP:</h6><input name = "PostcodeZIP" type = "text" placeholder = "Edit PostcodeZIP" defaultValue = {this.props.animal[0].PostcodeZIP[1]}/></div>
						</div><br></br>

						<div className="row">
							<div className="col-sm-4"> <h6>Country:</h6> <input name = "Country" type = "text" placeholder = "Edit Country" defaultValue = {this.props.animal[0].Country}/> </div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Tel (home):</h6> <input name = "Tel_home" type = "text" placeholder = "Edit Tel(home)" defaultValue = {this.props.animal[0].TelHome}/></div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Mobile/Cell:</h6> <input name = "Mobile" type = "text" placeholder = "Edit Mobile" defaultValue = {this.props.animal[0].CellMobile}/></div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Email:</h6> <input name = "Email" type = "text" placeholder = "Edit Email" defaultValue = {this.props.animal[0].Email}/></div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"> <h6>Web Contact:</h6><input name = "Web" type = "text" placeholder = "Edit WebContact" defaultValue = {this.props.animal[0].WebContact}/>  </div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>Indetification:</h6><input name = "Indetification" type = "text" placeholder = "Edit Indetification" defaultValue = {this.props.animal[0].ClientIdent}/>  </div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>Referred By:</h6> <input name = "Referred" type = "text" placeholder = "Edit Referred" defaultValue = {this.props.animal[0].Referred}/> </div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4">Discount: <input name = "Discount" type = "text" placeholder = "Edit Discount" defaultValue = {this.props.animal[0].Discount}/> </div>

						</div><br></br>
						<div className="row">
							<div className="col-sm-4"><h6>Notes:</h6><input name = "Notes" type = "text" placeholder = "Edit Notes" defaultValue = {this.props.animal[0].ClientNotes}/> </div>

						</div><br></br>

						</div><br></br>

						<div className = "box">
							<h4>Veterinary</h4>

							<div className="row">
								<div className="col-sm-8"><h6>Surgery:</h6><input name = "Surgery" type = "text" placeholder = "Edit Surgery" defaultValue = {this.props.animal[0].PracticeName}/></div>
							</div><br></br>

							<div className="row">
								<div className="col-sm-8"><h6>Vetname:</h6><input name = "VetName" type = "text" placeholder = "Edit VetName" defaultValue = {this.props.animal[0].VetName}/></div>
							</div><br></br>

							<div className="row">
								<div className="col-sm-8"><h6>Address1:</h6><input name = "Address1" type = "text" placeholder = "Edit Address1" defaultValue ={!Array.isArray(this.props.animal[0].Address1) ? '' : this.props.animal[0].Address1[0]}/></div>
							</div><br></br>

							<div className="row">
								<div className="col-sm-8"><h6>Address2:</h6><input name = "Address2" type = "text" placeholder = "Edit Address2" defaultValue ={!Array.isArray(this.props.animal[0].Address2) ? '' : this.props.animal[0].Address2[0]}/></div>
							</div><br></br>

							<div className="row">
								<div className="col-sm-8"><h6>Town/City:</h6><input name = "Town" type = "text" placeholder = "Edit Town" defaultValue ={this.props.animal[0].Town}/></div>
							</div><br></br>

							<div className="row">
								<div className="col-sm-8"><h6>Region:</h6><input name = "Region" type = "text" placeholder = "Edit Region" defaultValue ={this.props.animal[0].AddRegion}/></div>
							</div><br></br>

							<div className="row">
								<div className="col-sm-8"><h6>Postcode:</h6><input name = "Postcode" type = "text" placeholder = "Edit Postcode" defaultValue ={!Array.isArray(this.props.animal[0].PostcodeZIP) ? '' : this.props.animal[0].PostcodeZIP[0]}/></div>
							</div><br></br>

							<div className="row">
								<div className="col-sm-8"><h6>Email:</h6><input name = "Email" type = "text" placeholder = "Edit Email" defaultValue ={!Array.isArray(this.props.animal[0].Email) ? '' : this.props.animal[0].Email[0]}/></div>
							</div><br></br>

						</div>
						<div className="row">
						<div id="editInput">
							<div className="col-sm-4"><input className = "profileButton" type = "Submit" value = "Submit"/> </div>
						</div>
					</div>
					</form>
					<br></br>

				</div>
			);
		else
			return <div className = "box cal"><h3>Client Details</h3></div>;
	}
}
