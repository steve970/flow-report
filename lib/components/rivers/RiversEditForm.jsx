import React, {Component} from 'react';
import { Components, registerComponent, withCurrentUser, withMulti2 } from 'meteor/vulcan:core';
import MyRivers from '../../modules/myrivers/collection.js';
import {Redirect} from 'react-router'

const options = {
  collection: MyRivers,
  fragmentName: 'MyRiverFragment'
};


class RiversEditForm extends Component {

  render () {
    const documentId = this.props.documentId
    const currentUserId = this.props.currentUser._id
    const closeModal = this.props.closeModal
    return (
      <div>
        <Components.SmartForm
          collection= {MyRivers}
          fields={['myRivers']}
          documentId={documentId}
          successCallback= { (data) => {
            closeModal()
            window.location.reload(false)
          }}
          errorCallback = { (document, error) =>
            console.log(error)
          }
          />
      </div>
    )
  }
}

registerComponent({ name: 'RiversEditForm', component: RiversEditForm, hocs: [ withCurrentUser ] });
