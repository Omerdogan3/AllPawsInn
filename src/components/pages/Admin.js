'use babel';

import React, { Component } from 'react';

export default class Admin extends React.Component {
	constructor(props) {
		super(props)
	}

	render(){
		return (
			<div className = "box cal">
				<h3>Admin</h3>
				<div className = "box" id = "Help">
          <h4>Default Values</h4>
					<hr/>
          <b>DaycareRate:</b> <input type = "text" onChange = {this.handleChange} onFocus = {this.handleChange}/>
					<hr/>
          <b>BoardingRate:</b> <input type = "text" onChange = {this.handleChange} onFocus = {this.handleChange}/>
					<hr/>
          <b>Discount:</b> <input type = "text" onChange = {this.handleChange} onFocus = {this.handleChange}/>
          
					<hr/>
				</div>
			</div>
		)
	}
}
