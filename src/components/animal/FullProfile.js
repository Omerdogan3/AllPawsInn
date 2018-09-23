'use babel';

import React from 'react';

export default class FullProfile extends React.Component {
	render() {
		if (this.props.animal[0])
			return  (
				<div className = "box cal">
					<h3>Animal Details</h3>
					<br></br>
					<div className = "box">
						<h6>Name:</h6> {this.props.animal[0].AnimalName} <br></br>
						<h6>Sex:</h6> {this.props.animal[0].Sex} <br></br>
						<h6>Breed:</h6> {this.props.animal[0].Breed} <br></br>
						<h6>Color:</h6> {this.props.animal[0].Colour} <br></br>
						<h6>Age:</h6> {this.props.animal[0].Age} yrs<br></br>
						<h6>Tag Ref:</h6> {this.props.animal[0].TagRef} <br></br>
						<h6>Neutered/Spayed:</h6> {this.props.animal[0].NeuteredSpayed ? 'Yes' : 'No'}<br></br>
						<h6>ShareKennel:</h6> {this.props.animal[0].ShareKennel} <br></br>
						<h6>Bites:</h6> {this.props.animal[0].Bites} <br></br>
						<h6>Notes:</h6> {this.props.animal[0].AnimalNotes} <br></br>
					</div>
					<br></br>
					<div className = "box">
						<h4>Food</h4>
						<h6>Type A:</h6> {this.props.animal[0].Food1TypeName} <br></br>
						<h6>Amount:</h6> {this.props.animal[0].Food1Amount}  Freq: {this.props.animal[0].Food1Freq} <br></br>
						<h6>Type B:</h6> {this.props.animal[0].Food2TypeName} <br></br>
						<h6>Amount:</h6> {this.props.animal[0].Food2Amount}  Freq: {this.props.animal[0].Food2Freq} <br></br>
						<h6>Notes:</h6> {this.props.animal[0].FoodNote} <br></br>
						<h6>FoodChews:</h6> {this.props.animal[0].FoodChews ? 'Yes' : 'No'}<br></br>
					</div>
					<br></br>
					<div className = "box">
						<h4>Medical</h4>
						<h6>Medical Conditions:</h6> {this.props.animal[0].MedicalConditions} <br></br>
					</div>
				</div>
			);
		else
			return <div className = "box cal"><h3>Animal Details</h3></div>;
	}
}

