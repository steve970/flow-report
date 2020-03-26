import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React,  {Component} from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import {Nav, Navbar} from 'react-bootstrap';


class Header extends Component {

  constructor(props) {
    super(props);
    if( !props.currentUser && props.history ) {
      props.history.push('/');
    }
  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">
          <span>Flow Report</span>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            </li>
          </ul>
          <span className="navbar-text">
            { this.props.currentUser && <Components.AccountsLoginForm redirect={false} /> }
          </span>
        </div>
      </nav>
    );
  }
}


Header.displayName = 'Header';

registerComponent({ name: 'Header', component: Header, hocs:[ withCurrentUser ] });
