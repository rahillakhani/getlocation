import React, { Component } from 'react';
import axios from 'axios';
import Table from './table.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleList: [{
        registration_no:'No Data',
        device_id:'No Data',
        mobile_no:'No Data',
        longitude:'No Data',
        timeout_interval:'No Data'
      }]
    }
  }
  
  componentDidMount() {
    
		axios.get('http://localhost:8989/tracker')
		.then((respo, done) => {
      console.log(respo.data);
			this.setState( {
				vehicleList: respo.data
			});
		})
		.catch((err) => {
			console.log(err);
      this.setState( {
				vehicleList: [{
          registration_no:'No Data',
          device_id:'No Data',
          mobile_no:'No Data',
          longitude:'No Data',
          timeout_interval:'No Data'
          }]
			});
		});
	}
  listVehicle () {
    // var listArr = [];
    var Obj = this.state.vehicleList;

    return Obj.map((elem,key) => {
      var elemArr = [];
      elemArr.push(elem.registration_no);
      elemArr.push(elem.device_id);
      elemArr.push(elem.mobile_no);
      elemArr.push(elem.longitude);
      elemArr.push(elem.latitude);
      elemArr.push(elem.timeout_interval);
      elemArr.push('ETA');
      return elemArr;
    });
  }
  render() {
    return (
      <div className="App">
        { this.state && this.state.vehicleList.length > 0 && 
          <Table data={ this.listVehicle() }/>
        }
      </div>
    );
  }
}

export default App;
