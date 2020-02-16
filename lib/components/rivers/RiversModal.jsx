import React, {useState} from 'react';
import {Components, registerComponent} from 'meteor/vulcan:core';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RiversModal = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Components.RiversUsers />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

registerComponent({ name: 'RiversModal', component:RiversModal})
