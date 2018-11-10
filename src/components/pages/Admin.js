'use babel';

import React, { Component } from 'react';
import DefaultValues from '../../defaultValues';

export default class Admin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			daycareRate: DefaultValues.DayCareRate,
			boardingRate: DefaultValues.BoardingRate,
			discount: DefaultValues.Discount
		};

		// this.handleDiscountChange = this.handleDiscountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentDidMount(){
		console.log(DefaultValues)
	}

	handleChange(event) {
		if(event.target.name == "DaycareRate"){
	    this.setState({daycareRate: event.target.value});
		}else if(event.target.name == "BoardingRate"){
	    this.setState({boardingRate: event.target.value});
		}else if(event.target.name == "Discount"){
	    this.setState({discount: event.target.value});
		}
	}

	handleSubmit(event) {
		// DefaultValues = {
		// 	DayCareRate: this.state.daycareRate,
		// 	BoardingRate: this.state.boardingRate,
		// 	Discount: this.state.discount
		// }
	}
	
	// handleDiscountChange(event){
	// 	console.log(event.target.value)
	// 	this.setState({discount: event.target.value});

	// }

	render(){
		return (
			<div className = "box cal">
				<h3>Admin</h3>
				<form onSubmit={this.handleSubmit}>

				<div className = "box" id = "Help">
          <h4>Default Values</h4>
					<hr/>
          <b>DaycareRate:</b> <input type = "text" name="DaycareRate" value={this.state.daycareRate} onChange = {this.handleChange.bind(this)}/>
					<hr/>
          <b>BoardingRate:</b> <input type = "text" name="BoardingRate" value={this.state.boardingRate} onChange = {this.handleChange.bind(this)}/>
					<hr/>
          <b>Discount:</b> <input type = "text" name="Discount" value={this.state.discount} onChange = {this.handleChange.bind(this)}/>
          
					<hr/>
				</div>
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}
