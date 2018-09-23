'use babel';
import React from 'react';

function dogNames(dogs){
  let dog_list = [];
  for (let i =0; i<dogs.length;i++){
    if (dogs[i].Status=="CI")
      dog_list.push(<tr style={{height: '40px'}} key={i}><td>{dogs[i].FirstName} {dogs[i].LastName}</td><td>{dogs[i].AnimalName}</td><td style={{color:"red"}}>{dogs[i].MedicalConditions}</td><td>{dogs[i].Food1TypeName}</td><td>{dogs[i].Food1Amount}</td><td>{dogs[i].Food1Freq}</td></tr>)
  }
  return dog_list;
}

export default class Report extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dogs : this.props.dogs
    }
    this.handlePrintSubmit = this.handlePrintSubmit.bind(this)
  }

  handlePrintSubmit(event){
    window.print()
  }

  render() {
    if (this.props.dogs){
      return  (
        <div className = "box cal">
        <h3>Scheduler</h3><br></br>
        <table className = "table table-hover">
          <tbody>
             <tr>
             <th style={{width: '20%'}}>Client Name</th>
             <th style={{width: '20%'}}>Dog Name</th>
             <th style={{color:"red", width: '15%'}}>Medical</th>
             <th style={{width: '15%'}}>Food Type</th>
             <th style={{width: '15%'}}>Food Quantity</th>
             <th style={{width: '15%'}}>Food Frequency</th>
            </tr>
            {
              dogNames(this.props.dogs).map(obj =>
                obj
              )
            }
          </tbody>
        </table>
    <span className="print"><button className = "profileButton" onClick = {this.handlePrintSubmit}> Print </button></span>
    </div>
      );
  }
    else
      return <div className = "box cal"><h3>Loading...</h3></div>;
  }

}
