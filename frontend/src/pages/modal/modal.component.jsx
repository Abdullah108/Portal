import React, { useState } from 'react';

import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import axios from 'axios';

const CustomModal = ({
  show,
  handleClose,
  vid_id,
  user_id,
}) => {
  const [status, setStatus] =
    useState('submitted');
  const ChangeStatus = async () => {
    axios
      .post(
        'http://localhost:9000/api/change-status',
        {
          vid_id: vid_id,
          user_id: user_id,
          status: status,
        }
      )

      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        handleClose();
        // always executed
      });
    handleClose();
    window.location.reload();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      style={{
        marginTop: '50%',
        transform: 'translateY(-50%',
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Status </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          onChange={(e) =>
            setStatus(e.target.value)
          }
          style={{
            border: '1px solid #353535',
            backgroundColor: 'transparent',
            width: '40%',
            height: '30px',
            margin: '20px 50%',
            paddingLeft: '20px',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <option value="submitted">
            Submmited
          </option>
          <option value="approved">
            Approved
          </option>
          <option value="progress">
            {' '}
            In Progress
          </option>
          <option value="complet">
            Completed
          </option>
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            ChangeStatus();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
