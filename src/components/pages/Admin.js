'use babel';

import React, { Component } from 'react';

const sql = require('mssql')
const sqlConfig = require('../../js/sqlconfig')
const booking_lib = require('../../js/bookinglib')

export default class Admin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultValues: null
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		// sql.close()
		this.getDefaultValues()
	}

	async getDefaultValues(){
		await sql.close()
		let pool = await sql.connect(sqlConfig)
		let result = await pool.request().query("SELECT * from dbo.AnimalCharges")
		await sql.close()
		// console.log(result.recordsets)
		this.setState({
			defaultValues: result.recordsets
		})
	}

	handleChange(event, id) {
		if(event.target.name == "AnimalSize"){
			this.state.defaultValues[0][id-1].AnimalSize = event.target.value
	    this.setState({defaultValues: this.state.defaultValues});
		}else if(event.target.name == "BoardingPeakPeriodSur"){
			this.state.defaultValues[0][id-1].BoardingPeakPeriodSur = event.target.value
	    this.setState({defaultValues: this.state.defaultValues});
		}else if(event.target.name == "BoardingUnitTypeSur"){
			this.state.defaultValues[0][id-1].BoardingUnitTypeSur = event.target.value
	    this.setState({defaultValues: this.state.defaultValues});
		}else if(event.target.name == "DailyCharge"){
			this.state.defaultValues[0][id-1].DailyCharge = event.target.value
	    this.setState({defaultValues: this.state.defaultValues});
		}else if(event.target.name == "DayCareCharge"){
			this.state.defaultValues[0][id-1].DayCareCharge = event.target.value
	    this.setState({defaultValues: this.state.defaultValues});
		}else if(event.target.name == "DaycarePeakPeriodSur"){
			this.state.defaultValues[0][id-1].DaycarePeakPeriodSur = event.target.value
	    this.setState({defaultValues: this.state.defaultValues});
		}else if(event.target.name == "DaycareUnitTypeSur"){
			this.state.defaultValues[0][id-1].DaycareUnitTypeSur = event.target.value
	    this.setState({defaultValues: this.state.defaultValues});
		}


		this.queryChanges(id);
	}

	async queryChanges(id){
		let pool = await sql.connect(sqlConfig)

		let qr = `UPDATE dbo.AnimalCharges SET 
		dbo.AnimalCharges.AnimalSize = '${this.state.defaultValues[0][id-1].AnimalSize}', 
		dbo.AnimalCharges.BoardingPeakPeriodSur = '${this.state.defaultValues[0][id-1].BoardingPeakPeriodSur}', 
		dbo.AnimalCharges.BoardingUnitTypeSur = '${this.state.defaultValues[0][id-1].BoardingUnitTypeSur}',
		dbo.AnimalCharges.DailyCharge = '${this.state.defaultValues[0][id-1].DailyCharge}', 
		dbo.AnimalCharges.DayCareCharge = '${this.state.defaultValues[0][id-1].DayCareCharge}',
		dbo.AnimalCharges.DaycarePeakPeriodSur = '${this.state.defaultValues[0][id-1].DaycarePeakPeriodSur}', 
		dbo.AnimalCharges.DaycareUnitTypeSur = '${this.state.defaultValues[0][id-1].DaycareUnitTypeSur}'
		WHERE dbo.AnimalCharges.ID = '${id}'`


		let result = await pool.request()
		.query(qr);
		sql.close()
	}

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
												<th><input type = "text" name="AnimalSize" value = {el.AnimalSize} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" name="BoardingPeakPeriodSur" value = {el.BoardingPeakPeriodSur} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" name="BoardingUnitTypeSur" value = {el.BoardingUnitTypeSur} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" name="DailyCharge" value = {el.DailyCharge} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" name="DayCareCharge" value = {el.DayCareCharge} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" name="DaycarePeakPeriodSur" value = {el.DaycarePeakPeriodSur} onChange={(e) => this.handleChange(e,el.ID)}/></th>
												<th><input type = "number" name="DaycareUnitTypeSur" value = {el.DaycareUnitTypeSur} onChange={(e) => this.handleChange(e,el.ID)}/></th>
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
