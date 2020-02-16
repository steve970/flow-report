import React, {useState} from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import {Container, Row, Col} from 'react-bootstrap';

const RiversMain = (props) => {

  return (
    <Container>
      <Row>
        <Col>
        </Col>
        <Col sm={5}>
          <div>
            <Components.RiversUsers z/>
          </div>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}

registerComponent({ name: 'RiversMain', component: RiversMain, hoc:[withCurrentUser] });
