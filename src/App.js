import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class App extends Component{
  state={
   temp:"",
    humidity:"",
    icon:"",
    maxTemp:"",
    minTemp:"",
    cond:"",
    cityName:""

  }
  handleClick = async(e) =>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=3b9d0a98685365360dd3aa411f92eea5`);
    const api_2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=3b9d0a98685365360dd3aa411f92eea5`);
    const rtr = await api.json();
    const rtr_2 = await api_2.json();
    console.log(rtr);
    console.log(rtr_2);
    this.setState({
      temp:(Math.round(rtr.main.temp)),
      humidity:rtr.main.humidity,
      icon:rtr.weather[0].icon,
      maxTemp:(Math.round(rtr.main.temp_max)),
      minTemp:(Math.round(rtr.main.temp_min)),
      cond:rtr.weather[0].description,
      cityName:rtr.name
    })
  }

  render() {
    return(
      <div className="container">
          <center>
              <div className="card" id="card1">
                <h1 className="text-center">Check Your Weather</h1>
              <div className="row">
                <form onSubmit={ this.handleClick }>
                  <div className="row">
                    <div className="col-md-6 offset-sm-3">
                      <input type="text" placeholder="Enter City Name" name="city" className="from-control"></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 offset-sm-3">
                      <button className="btn btn-primary btn-lg">Get Weather</button>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                {this.state.temp!==""?<h1>Current:{this.state.temp}&deg;F</h1>:''}
              </div>
              <div class="row">
                {this.state.cityName!==""?<h1>{this.state.cityName}</h1>:''}

                {this.state.icon!==""?<img src={`http://openweathermap.org/img/w/${this.state.icon}.png`}/>:''}

                {this.state.cond!==""?<h5 className="text-uppercase">{this.state.cond}</h5>:''}
              </div>
              <div class="row">
                <div class="col-xs-12 col-md-6">
                {this.state.maxTemp!==""?<h1>High:{this.state.maxTemp}&deg;F</h1>:''}
                </div>
                <div class="col-xs-12 col-md-6">
                {this.state.minTemp!==""?<h1>Low:{this.state.minTemp}&deg;F</h1>:''}
                </div>
                
                {this.state.humidity!==""?<h1>Humidity:{this.state.humidity}%</h1>:''}
                
              </div>
            </div> 
          </center>
      </div>
    )
  }

}


export default App;

