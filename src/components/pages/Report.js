'use babel';

import React from 'react';
let date = new Date(); //global?

function filterBookingsLessYear(bookings){
  let len= bookings.length;
  let i=0;
  let bookings_started_less_than_year=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear()-1){
      bookings_started_less_than_year++;
    }
    i++;
  }
  return bookings_started_less_than_year;
}
function filterFutureBookings(bookings){
  let len= bookings.length;
  let i=0;
  let future_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()>date.getFullYear()){
      future_bookings++;
    }
    else if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()>date.getMonth()){
      future_bookings++;
    }
    else if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()==date.getMonth() && bookings[i].DateIn.getDate()>date.getDate()){
      future_bookings++;
    }
    i++;
  }
  return future_bookings;
}

function filterFutureWeekBookings(bookings){
  let len= bookings.length;
  let i=0;
  let future_week_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()==date.getMonth() && bookings[i].DateIn.getDate()<date.getDate()+7 && bookings[i].DateIn.getDate()>date.getDate()){
      future_week_bookings++;
    }
    i++;
  }
  return future_week_bookings;
}
function filterFutureWeekCompareBookings(bookings){
  let len= bookings.length;
  let i=0;
  let future_week_compare_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear()-1 && bookings[i].DateIn.getMonth()==date.getMonth() && bookings[i].DateIn.getDate()<date.getDate()+7 && bookings[i].DateIn.getDate()>date.getDate()){
      future_week_compare_bookings++;
    }
    i++;
  }
  return future_week_compare_bookings;
}
function filterThisMonthBookings(bookings){
  let len= bookings.length;
  let i=0;
  let this_month_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()==date.getMonth()){
      this_month_bookings++;
    }
    i++;
  }
  return this_month_bookings;
}
function filterThisMonthCompareBookings(bookings){
  let len= bookings.length;
  let i=0;
  let this_month_compare_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear()-1 && bookings[i].DateIn.getMonth()==date.getMonth()){
      this_month_compare_bookings++;
    }
    i++;
  }
  return this_month_compare_bookings;
}
function filterNextMonthBookings(bookings){
  let len= bookings.length;
  let i=0;
  let next_month_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear() && bookings[i].DateIn.getMonth()==date.getMonth()+1){
      next_month_bookings++;
    }
    i++;
  }
  return next_month_bookings;
}
function filterNextMonthCompareBookings(bookings){
  let len= bookings.length;
  let i=0;
  let next_month_compare_bookings=0;
  while(i<len){
    if(bookings[i].DateIn.getFullYear()==date.getFullYear()-1 && bookings[i].DateIn.getMonth()==date.getMonth()+1){
      next_month_compare_bookings++;
    }
    i++;
  }
  return next_month_compare_bookings;
}



export default class Report extends React.Component {
  constructor(props){
		super(props)
		this.state = {
			bookings : this.props.bookings
		}

	}

	render() {
    if (this.props.bookings){
			return  (
				<div className = "box cal">
					<h3>Basic Stats</h3><br></br>
          <div className="box">
            <h4>Kennel Units</h4><br></br>
            Total number of units:  86<br></br>
            Current number of occupants: {this.state.bookings.length}<br></br>
            % of units Occupied:  78<br></br>
          </div>
          <br></br>
          <div className="box">
            <h4>Booking</h4><br></br>
            Number of Bookings Started over previous year:  {filterBookingsLessYear(this.state.bookings)}<br></br>
            Total Number of Future Bookings:  {filterFutureBookings(this.state.bookings)}<br></br>
            Bookings Expected to Start This Week:  {filterFutureWeekBookings(this.state.bookings)}<br></br>
            Compare with a year ago:  {filterFutureWeekCompareBookings(this.state.bookings)}<br></br>
            Bookings Expected to Start This Month  {filterThisMonthBookings(this.state.bookings)}<br></br>
            Compare with a year ago:  {filterThisMonthCompareBookings(this.state.bookings)}<br></br>
            Bookings Expected to Start Next Month:{filterNextMonthBookings(this.state.bookings)}<br></br>
            Compare with a year ago:  {filterNextMonthCompareBookings(this.state.bookings)}<br></br>
          </div>
          <br></br>
          <div className="box">
            <h4>Database</h4><br></br>
            Number of Clients in database: 1398<br></br>
            Number of Animals in database: 1976<br></br>
          </div>
				</div>
			);
  }
		else
			return <div className = "box cal"><h3>Loading...</h3></div>;
	}

}
