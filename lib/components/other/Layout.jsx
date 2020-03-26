import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import classNames from 'classnames';
import {Container, Row, Col, Media} from 'react-bootstrap';

const Layout = ({children}) => {

  return (

    <div className={classNames('wrapper')} id="wrapper">

      <Components.Header />

      <div className="main">
        <Row>
          <Col>
          </Col>
          <Col sm={6}>
            {children}
          </Col>
          <Col>
          </Col>
        </Row>
      </div>


    </div>

  )
}


registerComponent({ name: 'Layout', component: Layout, hocs: [withCurrentUser] });
