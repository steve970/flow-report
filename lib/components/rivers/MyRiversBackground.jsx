import React, {Component} from 'react';
import {Components, registerComponent, withCurrentUser, withMulti2 } from 'meteor/vulcan:core';
import MyRivers from '../../modules/myrivers/collection.js';
import { Link } from 'react-router-dom';
import { divideRivers, currentDwrConditions, currentUsgsConditions, myRiversCurrentConditions, currentDwrChart } from '../../modules/helpers.js';

const options = {
  collection: MyRivers,
  fragmentName: 'MyRiverFragment'
};

class MyRiversBackground extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rivers: [],
      riverCharts: [],
      isLoading: false,
      needData: true,
      displayChart: false,
      myChart: {
        name: "",
        chart: []
      }
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.results !== this.props.results) {
      const { dwr, usgs } = divideRivers(this.props.results[0].myRiversInfo)
      let dwrCurrentRiverConditions = await currentDwrConditions({dwr}.dwr)
      let usgsCRC = []
      // // let usgsCRC = currentUsgsConditions({usgs}.usgs)
      let currentRiverChart = await currentDwrChart({dwr}.dwr)
      this.setState({
        rivers: this.state.rivers.concat(dwrCurrentRiverConditions,usgsCRC),
        riverCharts: this.state.riverCharts.concat(currentRiverChart),
        isLoading: false
      })
    }
  }

  render() {
    const {error, rivers, isLoading, riverCharts, displayChart, myChart, needData} = this.state;
    if (error) {
      return <div>Error</div>
    } else if (isLoading) {
      return <div>Need data, Please wait...</div>
    } else {
      return [
        <div className="container">
          <div className="row">
            <div className="col">
              {rivers.map((x) => {
                return [
                  <div onClick={this.showChart}>
                    <Components.MyRiver stationName= {x.station_name} urlMarker={x.url_marker} currentAmountCFS={x.current_amount_cfs} currentDateTime={x.current_date_time} abbrev={x.abbrev} />
                  </div>
                ]
              })}
            </div>
            <div className="col">
              {displayChart && <Components.MyRiverChart chart={myChart.chart} name={myChart.name} />}
            </div>
          </div>
        </div>
      ]
    }
  }

}

registerComponent({ name: 'MyRiversBackground', component: MyRiversBackground, hocs: [[withMulti2, options], withCurrentUser ] })
