import React from "react";
// bootstrap elements
import { Modal, Button } from "react-bootstrap";

const InfoModal = ({ title, onClose, show }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title color="success">
          <div className={title.type === "error" ? "error" : "success"}>
            {title.message}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant={title.type === "error" ? "danger" : "success"}
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
