import React, {Component} from 'react';
import {Components, registerComponent, withCurrentUser, withMulti2 } from 'meteor/vulcan:core';
import MyRivers from '../../modules/myrivers/collection.js';
import { Link } from 'react-router-dom';
import { divideRivers, currentDwrConditions, currentUsgsConditions, myRiversCurrentConditions, currentDwrChart, currentUsgsChart } from '../../modules/helpers.js';
import {Container, Row, Col} from 'react-bootstrap';

const options = {
  collection: MyRivers,
  fragmentName: 'MyRiverFragment'
};

class MyRiversList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rivers: [],
      riverCharts: [],
      isLoading: false,
      needData: true,
      displayChart: false,
      needsToUpdate: true,
      myChart: {
        name: "",
        chart: []
      }
    };
    this.showChart = this.showChart.bind(this)
  }

  async showChart(e) {
    let name = e.target.textContent
    let chartArray = []
    if(this.state.displayChart === false) {
      await this.state.riverCharts.map((chart) => {
        if(chart.abbrev === e.target.id.toString()) {
          chartArray.push(chart)
        }
      });
      this.setState({
        myChart: {
          name: name,
          chart: chartArray,
        },
        displayChart: !this.state.displayChart
      })
    } else {
      this.setState({
        myChart: {
          name: "",
          chart: []
        },
        displayChart: false
      })
    }
  }

  async componentDidMount() {
    const {needsToUpdate} = this.state
    this.setState({
      isLoading: true,
    })
    if (this.props.results && needsToUpdate) {
      const { dwr, usgs } = divideRivers(this.props.results[0].myRiversInfo)
      let dwrCurrentRiverConditions = await currentDwrConditions({dwr}.dwr)
      let usgsCurrentRiverConditions = await currentUsgsConditions({usgs}.usgs)
      let currentDWRRiverChart = await currentDwrChart({dwr}.dwr)
      let currentUSGSRiverChart = await currentUsgsChart({usgs}.usgs)
      this.setState({
        rivers: this.state.rivers.concat( dwrCurrentRiverConditions, usgsCurrentRiverConditions ),
        riverCharts: this.state.riverCharts.concat( currentDWRRiverChart, currentUSGSRiverChart ),
        isLoading: false,
        needsToUpdate: false
      })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
      const {needsToUpdate} = this.state
      if (prevProps.results !== this.props.results && needsToUpdate) {
        const { dwr, usgs } = divideRivers(this.props.results[0].myRiversInfo)
        let dwrCurrentRiverConditions = await currentDwrConditions({dwr}.dwr)
        let usgsCurrentRiverConditions = await currentUsgsConditions({usgs}.usgs)
        let currentDWRRiverChart = await currentDwrChart({dwr}.dwr)
        let currentUSGSRiverChart = await currentUsgsChart({usgs}.usgs)
        this.setState({
          rivers: this.state.rivers.concat( dwrCurrentRiverConditions, usgsCurrentRiverConditions ),
          riverCharts: this.state.riverCharts.concat( currentDWRRiverChart, currentUSGSRiverChart ),
          isLoading: false
        })
      } else {
        null
      }
    // if (prevProps.results === this.props.results) {
    // }
  }

  render() {
    const {error, rivers, isLoading, riverCharts, displayChart, myChart, needData} = this.state;
    if (error) {
      return <div>Error</div>
    } else if (isLoading) {
      return <div>Need data, Please wait...</div>
    } else {
      return [
        <Container>
          <Row>
            <Col sm={4}>
              {rivers.map((x) => {
                return [
                  <div onClick={this.showChart}>
                    <Components.MyRiver stationName= {x.station_name} urlMarker={x.url_marker} currentAmountCFS={x.current_amount_cfs} currentDateTime={x.current_date_time} abbrev={x.abbrev} />
                  </div>
                ]
              })}
              <p>"* ADD Edit Form Here"</p>
            </Col>
            <Col>
              {displayChart && <Components.MyRiverChart chart={myChart.chart} name={myChart.name} />}
            </Col>
          </Row>
        </Container>
      ]
    }
  }

}

registerComponent({ name: 'MyRiversList', component: MyRiversList, hocs: [[withMulti2, options], withCurrentUser ] });
