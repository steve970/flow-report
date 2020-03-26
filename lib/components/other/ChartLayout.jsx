import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import classNames from 'classnames';
import {Container, Row, Col, Media} from 'react-bootstrap';

const ChartLayout = ({children}) => {
  return (
    <div className={classNames('wrapper')} id="wrapper">
      <Components.Header />
      <div className="main">
        {children}
      </div>
    </div>
  )
}

registerComponent({ name: 'ChartLayout', component: ChartLayout, hocs: [withCurrentUser] });
