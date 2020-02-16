import React, {Component} from 'react';
import { Components, registerComponent, withCurrentUser, withMulti2 } from 'meteor/vulcan:core';
import MyRivers from '../../modules/myrivers/collection.js';
import {Redirect} from 'react-router'

const options = {
  collection: MyRivers,
  fragmentName: 'MyRiverFragment'
};

class RiversForm extends Component {

  constructor() {
    super();
    this.state = {
      userSubmit: false,
    };
  }

  render() {
    const {userSubmit} = this.state
    if (userSubmit) {
      return <Redirect
        to={{
          pathname: `/myrivers/${this.props.currentUser._id}`,
          state: { myRiversFormData:this.state.myRiversFormData }
        }}
      />
    } else {
      return (
        <div>
          <Components.SmartForm
            collection={MyRivers}
            fields={['myRivers']}
            successCallback= { (data) =>
              this.setState({
                userSubmit:true,
                myRiversFormData: data.myRivers
              })
            }
            errorCallback = { (document, error) =>
              console.log(error)
            }
          />
        </div>
      )
    }
  }
}

registerComponent({ name: 'RiversForm', component: RiversForm, hocs: [[withMulti2, options], withCurrentUser ] });
