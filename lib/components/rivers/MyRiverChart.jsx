import React, {Component} from 'react';
import {Components, registerComponent, withCurrentUser, withDocument, runGraphQL } from 'meteor/vulcan:core';
import MyRivers from '../../modules/myrivers/collection.js';
import Rivers from '../../modules/rivers/collection.js';
import { Link } from 'react-router-dom';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryVoronoiContainer, VictoryLabel } from 'victory';

class MyRiverChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    if (this.props.chart.length > 0) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {error, isLoading} = this.state;
    if (error) {
      return <div>Error</div>
    } else if (isLoading) {
      return <div>Loading...</div>
    } else {
      return (
        <VictoryChart
          height={1000}
          containerComponent={
            <VictoryVoronoiContainer
              labels={(d) => (
                `CFS: ${d.datum.value}, Day: ${new Date(d.datum.dateTime)}`
              )}
            />
          }
          padding={{ top: 200, bottom: 100, left: 125, right: 50 }}
          theme={VictoryTheme.material}
          domain={{x: [0, 700], y: [0, 300]}}
          scale={{ x: "linear" }}
          width={1500}
        >
          <VictoryLabel
            text={this.props.name}
            x={650}
            y={75}
            textAnchor="middle"
            style= {{ fontSize: 50 }}
          />
          <VictoryAxis
            tickCount={7}
            style={{
              tickLabels: {fontSize: 20, padding: 5}
            }}
            tickFormat={(tick) => (
              `${new Date(tick).toGMTString().slice(0,16)}`
            )}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: {fontSize: 20, padding: 5}
            }}
            standAlone={false}
          />
          <VictoryLine
            style={{
              data: { stroke: "#c43a31", strokeWidth: 1 },
              parent: { border: ".5px solid #ccc"},
              labels: { fontSize:"25px" }
            }}
            interpolation="natural"
            data={this.props.chart}
            title={this.props.name}
            x="dateTime"
            y="value"
          />
        </VictoryChart>
      )
    }
  }
};

registerComponent({ name: 'MyRiverChart', component: MyRiverChart });
