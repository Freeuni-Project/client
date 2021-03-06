import React from "react";
// bootstrap elements
import { Modal, Button, Spinner } from "react-bootstrap";

const AgreeModal = ({ title, agreeFunc, disagreeFunc, show, loading }) => {
  return (
    <Modal show={show} centered onHide={disagreeFunc}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={disagreeFunc}>
          No
        </Button>
        {loading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
          <Button variant="primary" onClick={agreeFunc}>
            Yes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AgreeModal;
