// ---------------------------------------- TO DO ----------------------------------------
'use babel';

import React from 'react';
import Calendar from "./pages/Calendar"
import Print from "./print/Print"
import FullProfile from "./animal/FullProfile"
import ClientProfile from "./client/ClientProfile"
import Booking from "./pages/Booking"
import NewBooking from "./pages/NewBooking"
import Report from "./pages/Report"
import Payment from "./payment/Payment"
import NewDog from "./pages/NewDog"	
import Scheduler from "./functions/Scheduler"
import Help from "./pages/Help"

export default class Screen extends React.Component {
	componentWillMount() {
		this.setState({
			screen: "home"
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			screen: nextProps.screen
		})
	}

	render() {
		const addDog = this.state.addDog;

		if(this.state.screen === "print")
			return <Print booking = {this.props.currentId}/>
		else if(this.state.screen === "full_profile")
			return <FullProfile animal = {this.props.animal}/>
		else if(this.state.screen === "client")
			return(<ClientProfile new_dog = {this.props.new_dog} animal = {this.props.animal} updateScreen = {this.props.updateScreen}/>)
		else if(this.state.screen === "payment")
			return(<Payment kennel_map = {this.props.kennel_map} updateScreen = {this.props.updateScreen} booking = {this.props.booking}/>)
		else if(this.state.screen === "report")
			return(<Report bookings = {this.props.bookings}/>)
		else if(this.state.screen === "scheduler")
			return(<Scheduler dogs = {this.props.bookings}/>)
		else if(this.state.screen === "new_dog")
			return(<NewDog updateScreen = {this.props.updateScreen} dogs = {this.props.dogs} id_obj = {this.props.id_object} animal = {this.props.animal}/>)
		else if(this.state.screen === "booking")
			return(<Booking kennel_map = {this.props.kennel_map} updateScreen = {this.props.updateScreen} id_object = {this.props.id_object} animal = {this.props.animal} bookings = {this.props.bookings}/>)
		else if(this.state.screen === "new_booking")
			return(<NewBooking updateScreen = {this.props.updateScreen} id_object = {this.props.id_object} animal = {this.props.animal} bookings = {this.props.bookings} dogs = {this.props.dogs}/>)
		else if(this.state.screen === "help")
			return <Help/>
		else
			return (<Calendar kennel_map = {this.props.kennel_map} print = {this.props.print} boz = {this.props.boz} payment = {this.props.payment} currentId = {this.props.currentId} bookings = {this.props.bookings}/>)

	}
}