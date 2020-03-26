import React, {Component} from 'react';
import {Components, registerComponent, } from 'meteor/vulcan:core';

class MyRiver extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
    let formatedDate = new Date(this.props.currentDateTime).toLocaleString('en-US', {timeZone: 'America/Denver', hour12: true}).slice(10)
    formatedDate = formatedDate.replace(formatedDate.slice(5,8),"")
    this.setState({
      formatedDate: formatedDate
    })
  }

  render () {
    const {formatedDate} = this.state;
    return [
      <div>
        <div id={this.props.abbrev} data-id={this.props.stationName}>{this.props.stationName}</div>
        <div id={this.props.abbrev} data-id={this.props.stationName}>current CFS: {this.props.currentAmountCFS}</div>
        <div id={this.props.abbrev} data-id={this.props.stationName}>taken on {new Date(this.props.currentDateTime).toGMTString().slice(0,16)} at {formatedDate} </div><br></br>
      </div>
    ]
  }
}

registerComponent({ name: 'MyRiver', component: MyRiver});
