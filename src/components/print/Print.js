const sqlConfig = require('../../js/sqlconfig')
const sql = require('mssql')

'use babel';

import React from 'react';

export default class Print extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
	      current : this.props.booking
	    }
	    this.handlePrintSubmit = this.handlePrintSubmit.bind(this)
	}

	handlePrintSubmit(event){
		window.print()
	 }

	render() {
		let current = this.props.booking
		if (current)
			return  (
				<div className = "box cal">
						<h1>All Paws Inn</h1>
						<table>
					      <tr>
					        <th className="key">Kennel/Unit Ref:</th>
					        <th>{current.KennelID}</th>
					      </tr>
					      <tr>
					        <th className="key">Client Name:</th>
					        <th>{current.FirstName} {current.LastName}</th>
					      </tr>
					      <tr>
					        <th className="key">Animal Name:</th>
					        <th>{current.AnimalName}</th>
					      </tr>
					      </table>
					      <br></br>
					      <table>
					      <tr>
					        <th className="key">Animal Type:</th>
					        <th>Dog</th>
					      </tr>
					      <tr>
					        <th className="key">Breed:</th>
					        <th>{current.Breed}</th>
					      </tr>
					      <tr>
					        <th className="key">Color:</th>
					        <th>{current.Colour}</th>
					      </tr>
					      <tr>
					        <th className="key">Sex:</th>
					        <th>{current.Sex}</th>
					      </tr>
					      <tr>
					        <th className="key">Age:</th>
					        <th>{current.Age}</th>
					      </tr>
					    </table>
					    <br></br>
					    <table>
					      <tr>
					        <th className="key">DateIn:</th>
					        <th>{current.DateIn.toString()}</th>
					      </tr>
					      <tr>
					        <th className="key">DateOut:</th>
					        <th>{current.DateOut.toString()}</th>
					      </tr>
					    </table>
					    <br></br>
					    <table>
					      <tr>
					        <th className="key">Notes:</th>
					        <th>{current.Notes}</th>
					      </tr>
					      <tr>
					      	<span className="print"><button className = "printButton" onClick = {this.handlePrintSubmit}> Print </button></span>
					      	</tr>
	    				</table>

				</div>
			);
		else
			return <div className = "box cal"><h3>Print</h3></div>;
	}
}
