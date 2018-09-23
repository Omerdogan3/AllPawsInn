'use babel';

import React from 'react'
import SearchPane from './sidescreen/SearchPane';
import AnimalDetails from "./sidescreen/AnimalDetails"
import Notifications from './sidescreen/Notifications';
import Alerts from './sidescreen/Alerts';

export default class Sidescreen extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			dogs : this.props.dogs,
			search : false,
		}

		this.switch_screen = this.switch_screen.bind(this)
		this.show_animal = this.show_animal.bind(this)

	// pass props if u want to use this.props within the constructor
	// Note that passing or not passing props to super has no effect on later uses of this.props
	}

	componentWillReceiveProps(nextProps){
		if (nextProps){
			this.setState({
				dogs: nextProps.dogs,
				search : nextProps.sidescreen
			})
		}
	}

	show_animal(animal){
		this.setState({
			animal : animal
		})
	}

	switch_screen(){
		this.setState({
			search : !(this.state.search)
		})
	}

	render(){
		if (this.state.search){
			return(
				<div className= 'sideWrapper'>
					<SearchPane side = {this.props.side} dogs = {this.state.dogs} screen = {this.switch_screen} show = {this.show_animal} query = {this.props.query}/>
					<AnimalDetails daycare = {this.props.daycare} client = {this.props.client} profile = {this.props.profile} proc = {this.props.proc} dogs = {this.state.dogs} animal = {this.state.animal}/>
				</div>
			);
		}
		else{
			//	<Alerts alerts = {this.props.alerts} push_alert = {this.props.push_alert} dogs = {this.props.dogs}/>
			//	<Notifications notifications = {this.props.notifications} push_notif = {this.props.push_notif} dogs = {this.props.dogs} screen = {this.switch_screen}/>
			return(
				<div className= 'sideWrapper'>
					<SearchPane side = {this.props.side} dogs = {this.state.dogs} screen = {this.switch_screen} show = {this.show_animal} query = {this.props.query}/>
					<AnimalDetails daycare = {this.props.daycare} client = {this.props.client} profile = {this.props.profile} proc = {this.props.proc} dogs = {this.state.dogs} animal = {this.state.animal}/>
				</div>
			);
		}
	}
}
