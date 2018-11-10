'use babel';

import React, { Component } from 'react';
import DefaultValues from '../../defaultValues';

const sql = require('mssql')
const sqlConfig = require('../../js/sqlconfig')
const booking_lib = require('../../js/bookinglib')

export default class Admin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultValues: null
		};
		// this.handleDiscountChange = this.handleDiscountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		sql.close()
		this.getDefaultValues()
	}

	async getDefaultValues(){
		
		let pool = await sql.connect(sqlConfig)
		let result = await pool.request().query("SELECT * from dbo.AnimalCharges")
		// sql.close()
		// console.log(result.recordsets)
		this.setState({
			defaultValues: result.recordsets
		})
	}

	handleChange(event, id) {
		console.log(id)
		// if(event.target.name == "DaycareRate"){
	  //   this.setState({daycareRate: event.target.value});
		// }else if(event.target.name == "BoardingRate"){
	  //   this.setState({boardingRate: event.target.value});
		// }else if(event.target.name == "Discount"){
	  //   this.setState({discount: event.target.value});
		// }
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
					<div className = "adminBox cal">
						<table className = "table table-hover tableAdmin">
							<tbody>
								<tr>
									<th>ID</th>
									<th>Animal Size</th>
									<th>BoardingPeakPeriodSur</th>
									<th>BoardingUnitTypeSur</th>
									<th>DailyCharge</th>
									<th>DayCareCharge</th>
									<th>DaycarePeakPeriodSur</th>
									<th>DaycareUnitTypeSur</th>
								</tr>
								{ 
									this.state.defaultValues &&
									this.state.defaultValues[0].map((el,index)=>{							
									return(
											<tr key={index}>
												<th>{el.ID}</th>
												<th><input type = "text" value = {el.AnimalSize} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" value = {el.BoardingPeakPeriodSur} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" value = {el.BoardingUnitTypeSur} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" value = {el.DailyCharge} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" value = {el.DayCareCharge} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" value = {el.DaycarePeakPeriodSur} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" value = {el.DaycareUnitTypeSur} onChange={(e) => this.handleChange(e,el.ID)}/></th>
											</tr>
										)
									})
								}
								</tbody>
						</table>
					</div>

				</div>
				</form>
			</div>
		)
	}
}
