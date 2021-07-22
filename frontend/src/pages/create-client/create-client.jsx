import { Table } from 'antd';

import React, { useState } from 'react';

import {
  Link,
  useHistory,
} from 'react-router-dom';

import { Container } from './create-client.styles';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import {
  Col,
  Row,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

const Create = (props) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] =
    useState('12345678');

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:9000/api/register-client',
        {
          email: email,
          password: password,
          userName: userName,
          address: address,
          city: city,
          state: state,
          postal: postal,
          country: country,
          phone: phone,
        }
      )

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {})
      .then(function () {
        // always executed
      });
  };

  return (
    <Container>
      <nav></nav>

      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            <a href="#">
              Company<span>logo</span>
            </a>
          </h1>

          <nav>
            <Link to="/admin" className="zero">
              Home
            </Link>
            <Link to="/">Logout</Link>
          </nav>
        </div>
      </header>
      <h3
        className="sub"
        style={{ marginTop: '70px' }}
      >
        Client Details
      </h3>
      <div className="form">
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              User Name
            </Form.Label>
            <Col sm="5">
              <Form.Control
                plaintext
                defaultValue=""
                onChange={(e) =>
                  setUserName(e.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="5">
              <Form.Control
                plaintext
                defaultValue=""
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Address
            </Form.Label>
            <Col sm="5">
              <Form.Control
                plaintext
                defaultValue=""
                onChange={(e) =>
                  setAddress(e.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              City
            </Form.Label>
            <Col sm="3">
              <Form.Control
                plaintext
                defaultValue=""
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />
            </Col>
            <Form.Label
              column
              sm="1"
              className="no"
              style={{ marginLeft: '50px' }}
            >
              State
            </Form.Label>
            <Col sm="4">
              <Form.Control
                plaintext
                defaultValue=""
                onChange={(e) =>
                  setState(e.target.value)
                }
              />
            </Col>
            <Form.Label
              column
              sm="2"
              className="no"
              style={{ marginTop: '20px' }}
            >
              Postal Code
            </Form.Label>
            <Col sm="3">
              <Form.Control
                style={{ marginTop: '20px' }}
                plaintext
                defaultValue=""
                onChange={(e) =>
                  setPostal(e.target.value)
                }
              />
            </Col>
            <Form.Label
              column
              sm="1"
              className="no"
              style={{
                marginLeft: '50px',
                marginTop: '20px',
              }}
            >
              Country
            </Form.Label>
            <Col sm="4">
              <Form.Control
                plaintext
                defaultValue=""
                onChange={(e) =>
                  setCountry(e.target.value)
                }
                style={{ marginTop: '20px' }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Phone
            </Form.Label>
            <Col sm="5">
              <Form.Control
                plaintext
                defaultValue=""
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />
            </Col>
            <button
              className="black"
              style={{
                padding: '0 20px',
                marginLeft: '20px',
              }}
              onClick={handleCreate}
            >
              Create
            </button>{' '}
            <button
              className="black"
              style={{
                padding: '0 20px',
                marginLeft: '20px',
              }}
            >
              Edit
            </button>{' '}
            <button
              className="black topss"
              style={{
                padding: '0 20px',
                marginLeft: '20px',
              }}
            >
              Save
            </button>
          </Form.Group>
        </Form>
      </div>
      <div className="brake"></div>
      <h3 className="sub">
        No documents Submitted{' '}
      </h3>
      {/* <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          bordered
        /> */}
      <button
        onClick={() =>
          props.history.push('/admin')
        }
        className="black"
        style={{
          padding: '10px 20px',
          marginLeft: '45%',
          transform: 'translateX(-50%)',
        }}
      >
        Back To Client List
      </button>
    </Container>
  );
};

export default Create;
