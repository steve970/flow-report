import React, {Component} from 'react';
import { Components, registerComponent, withCurrentUser, withSingle } from 'meteor/vulcan:core';
import MyRivers from '../../modules/myrivers/collection.js';
import {Redirect} from 'react-router'
import {Container, Row, Col, Media} from 'react-bootstrap';


class RiversMain extends Component {

  render() {
    const {currentUser} = this.props
    if (currentUser) {
      return (
        <Redirect to={{ pathname: `/rivers/` }} />
      )
    } else {
      return (
        <Media>
          <Media.Body>
            <h5 className="text-center">Welcome to Flow Report.</h5>
            <div className="rivers-users">
              {
                <div>
                  {!this.props.currentUser && <Components.AccountsLoginForm redirect={false} />}
                </div>
              }
            </div>
          </Media.Body>
        </Media>
      )
    }
  }
}

registerComponent({ name: 'RiversMain', component: RiversMain, hocs:[ withCurrentUser ] });
