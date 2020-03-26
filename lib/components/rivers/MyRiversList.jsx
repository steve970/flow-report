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
    if( !props.currentUser && props.history ) {
      props.history.push('/');
    }
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
      },
      documentId: ""
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
      let getUserData = this.props.results.filter( (result) => {
        return result.userId === this.props.currentUser._id ? result : null
      })
      const documentId = getUserData[0]._id     // THIS IS THROWING AN ERROR AND REQUIRES AN EXTRA 5 seconds to load
      const { dwr, usgs } = divideRivers(getUserData[0].myRiversInfo)
      let dwrCurrentRiverConditions = await currentDwrConditions({dwr}.dwr)
      let usgsCurrentRiverConditions = await currentUsgsConditions({usgs}.usgs)
      let currentDWRRiverChart = await currentDwrChart({dwr}.dwr)
      let currentUSGSRiverChart = await currentUsgsChart({usgs}.usgs)
      this.setState({
        rivers: this.state.rivers.concat( dwrCurrentRiverConditions, usgsCurrentRiverConditions ),
        riverCharts: this.state.riverCharts.concat( currentDWRRiverChart, currentUSGSRiverChart ),
        isLoading: false,
        needsToUpdate: false,
        documentId: documentId
      })
    } else {
      return null
    }
  }

  async componentDidUpdate(prevProps, prevState) {    // * keep an eye out * //

    const {needsToUpdate} = this.state
    if (this.props.results !== prevProps.results && needsToUpdate) {
      let getUserData = this.props.results.filter( (result) => {
        return result.userId === this.props.currentUser._id ? result : null
      })
      const documentId = getUserData[0]._id
      const { dwr, usgs } = divideRivers(getUserData[0].myRiversInfo)
      let dwrCurrentRiverConditions = await currentDwrConditions({dwr}.dwr)
      let usgsCurrentRiverConditions = await currentUsgsConditions({usgs}.usgs)
      let currentDWRRiverChart = await currentDwrChart({dwr}.dwr)
      let currentUSGSRiverChart = await currentUsgsChart({usgs}.usgs)
      this.setState({
        documentId: documentId,
        rivers: this.state.rivers.concat( dwrCurrentRiverConditions, usgsCurrentRiverConditions ),
        riverCharts: this.state.riverCharts.concat( currentDWRRiverChart, currentUSGSRiverChart ),
        isLoading: false
      })
    } else {
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {error, rivers, isLoading, riverCharts, displayChart, myChart, needData, documentId} = this.state;
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
              <Components.ModalTrigger component={<a href="#">Add/Remove Rivers</a>}>
                  <Components.RiversEditForm documentId={documentId} />
              </Components.ModalTrigger>
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
