import React, {Component} from 'react';
import { Components, registerComponent, withCurrentUser, withMulti2 } from 'meteor/vulcan:core';
import MyRivers from '../../modules/myrivers/collection.js';
import {Redirect} from 'react-router'

const options = {
  collection: MyRivers,
  fragmentName: 'MyRiverFragment'
};

class RiversForm extends Component {

  constructor(props) {
    super(props);
    if( !props.currentUser && props.history ) {
      props.history.push('/');
    }
    this.state = {
      userSubmit: false,
      getUserData: [],
      loading: true,
      stillLoading: true,
      newUser: true
    };
  }

  componentDidMount() {
    this.setState({
      stillLoading: !this.state.stillLoading
    })
  }

  componentDidUpdate(prevProps) {
    const {currentUser, results} = this.props
    const {loading} = this.state
    if(prevProps !== this.props && loading) {

      let matchedMyRiverInfo = []
      results.map((myRivers) => {
        myRivers.userId === currentUser._id ?
          matchedMyRiverInfo = myRivers.myRiversInfo
        :
          null
      })
      if(matchedMyRiverInfo.length > 0) {
        this.setState({
          newUser:false,
          loading: false,
          getUserData: this.state.getUserData.concat(matchedMyRiverInfo)
        })
      } else {
        this.setState({
          loading: false
        })
      }
    } else if(results !== undefined && loading) {
      let matchedMyRiverInfo
      results.map((myRivers) => {
        myRivers.userId === currentUser._id ?
          matchedMyRiverInfo = myRivers.myRiversInfo
        :
          null
      })
      if(matchedMyRiverInfo.length > 0) {
        this.setState({
          newUser:false,
          loading: false,
          getUserData: this.state.getUserData.concat(matchedMyRiverInfo)
        })
      } else {
        this.setState({
          loading: false
        })
      }
    }
  }

  componentWillUnmount() {
  }

  render() {
    const {loading, newUser, getUserData, currentUser} = this.state
    if (loading) {
      return <div>Loading</div>
    } else if (!loading && !newUser && getUserData.length > 0) {
      return <Redirect
        to={{
          pathname: `/myrivers/${this.props.currentUser._id}`
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
                newUser: false,
                getUserData: this.state.getUserData.concat(data.myRivers)
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
