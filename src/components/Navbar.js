'use babel';

import React from 'react';

export default class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		let query = event.target.value
		this.props.side(query)
	}

	render() {
		return(
			<nav className ="navbar navbar-default">
				<div className ="container-fluid">
					<div className ="navbar-header">
						<button type="button" className ="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className ="sr-only">Toggle navigation</span>
							<span className ="icon-bar"></span>
							<span className ="icon-bar"></span>
							<span className ="icon-bar"></span>
						</button>
						<a className ="navbar-brand" onClick = {this.props.updateScreen.bind(this, "home")}>AllPawsInn</a>
					</div>
					<div className ="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className ="nav navbar-nav">
							<li><a style={{cursor: "pointer"}} onClick = {this.props.updateScreen.bind(this, "home")}><span className ="glyphicon glyphicon-th" aria-hidden="true"></span> Dashboard</a></li>
							<li><a style={{cursor: "pointer"}} onClick = {this.props.updateScreen.bind(this, "new_booking")}>New Client</a></li>
							<li><a style={{cursor: "pointer"}} onClick = {this.props.updateScreen.bind(this, "scheduler")}>Scheduler</a></li>
							<li><a style={{cursor: "pointer"}} onClick = {this.props.updateScreen.bind(this, "help")}>Help</a></li>
						</ul>
						<ul className ="nav navbar-nav navbar-right">
							<li>
								<div className ='form-inline' style = {{marginTop:"9px"}}>
									<input className="form-control mr-sm-2" type = "text" placeholder = "Search" onChange = {this.handleChange} onFocus = {this.handleChange}/>
								</div>
						</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
