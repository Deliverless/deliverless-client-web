import React from 'react';

import {
  Button,
  Modal,
} from 'react-bootstrap';

import { Skeleton } from '@mui/material';

export function StoreHoursModal({
  show,
  onHide,
  storeHours,
}) {

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Store Hours</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            {storeHours ? (
              storeHours.map((day, index) => (
                <div className="row" key={index}>
                  <div className="col-md-4 offset-md-1">
                    {day.day.charAt(0).toUpperCase() + day.day.slice(1)}
                  </div>
                  <div className="col-md-7">
                    <p>{day.openingTime} - {day.closingTime}</p>
                  </div>
                </div>
              ))
            ) : (
              <Skeleton variant="rectangular" width={210} height={118} />
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
