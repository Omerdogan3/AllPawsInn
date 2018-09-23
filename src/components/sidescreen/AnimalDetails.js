'use babel';

import React from 'react';

export default class AnimalDetails extends React.Component {
	constructor(props){
		super(props)
		this.get_profile = this.get_profile.bind(this)
		this.get_fullprofile = this.get_fullprofile.bind(this)
		this.get_client = this.get_client.bind(this)
		this.get_daycare = this.get_daycare.bind(this)
	}

	get_profile(){
		this.props.proc(this.props.animal)
	}

	get_daycare(){
		this.props.daycare(this.props.animal)
	}


	get_fullprofile(){
		this.props.profile(this.props.animal)
	}

	get_client(){
		this.props.client(this.props.animal)
	}

	render() {
		//could be structured better
		if (Array.isArray(this.props.animal) && this.props.animal.length > 0){
			return  (
				<div className = "box animalDet">
					<h3>Animal Details</h3>
					Animal Name: <b>{this.props.animal[0].AnimalName}</b> <br></br>
					Client Name: <b>{this.props.animal[0].FirstName} {this.props.animal[0].LastName}</b> <br></br>
					Breed: <b>{this.props.animal[0].Breed}</b> <br></br>
					Sex: <b>{this.props.animal[0].Sex}</b> <br></br>
					Age: <b>{this.props.animal[0].Age}</b> <br></br><br></br>
					<div className = "profileButtonPanel">
						<button className = "profileButton" onClick = {this.get_profile}>New Reservation</button>
						<button className = "profileButton" onClick = {this.get_daycare}>New Daycare</button>
					</div><br></br>
					<div className = "profileButtonPanel">
						<button className = "profileButton" onClick = {this.get_fullprofile}>Full Profile</button>
						<button className = "profileButton" onClick = {this.get_client}>Client Profile</button>
					</div><br></br>
				</div>
			);
		}
		else
			return <div className = "box animalDet"><h3>Animal Details</h3></div>;
	}
}
