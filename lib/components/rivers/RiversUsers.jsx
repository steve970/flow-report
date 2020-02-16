import React, {Component} from 'react';
import { Components, registerComponent, withCurrentUser, withMulti2 } from 'meteor/vulcan:core';
import {Redirect} from 'react-router'
import MyRivers from '../../modules/myrivers/collection.js';

const options = {
  collection: MyRivers,
  fragmentName: 'UsersRiversFragment'
};

class RiversUsers extends Component {

  constructor() {
    super();
    this.state = {
      haveMyRivers: false,
      isLoading: true
    };
  }

  componentDidMount() {
    if (this.props.results.length > 0) {
      this.setState({
        haveMyRivers: true,
        isLoading: false
      })
    }
  }

  componentDidUpdate() {

  }

  render() {
    const {haveMyRivers, isLoading} = this.state
    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    } else if (haveMyRivers) {
      return (
        <Redirect to={{ pathname: `/myrivers/${this.props.currentUser._id}` }} />
      )
    } else {
      return (
        <div className="rivers-users">
          <p>Welcome to Flow Report.</p>
          {
            <div>
              {this.props.currentUser && <Redirect to={{ pathname: `/rivers/` }} />}
              {!this.props.currentUser && <Components.AccountsLoginForm redirect={false} />}
            </div>
          }
        </div>
      )
    }
  }
};

registerComponent({ name: 'RiversUsers', component: RiversUsers, hocs: [[withMulti2, options], withCurrentUser ] });
