import React from "react";
// bootstrap elements
import { Modal, Button } from "react-bootstrap";

const AgreeModal = ({ title, agreeFunc, disagreeFunc, show }) => {
  return (
    <Modal show={show} centered onHide={disagreeFunc}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={disagreeFunc}>
          No
        </Button>
        <Button variant="primary" onClick={agreeFunc}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgreeModal;
