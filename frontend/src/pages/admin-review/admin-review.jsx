import { Table } from 'antd';

import React, {
  useState,
  useEffect,
} from 'react';

import axios from 'axios';

import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom';

import { Container } from './admin-review.styles';

import Form from 'react-bootstrap/Form';
import {
  Col,
  Row,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

const Review = (props) => {
  const params = useParams();
  const [data, setData] = useState([]);

  const [user, setUser] = useState();

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    //API Call
    const fetchData = async () => {
      axios
        .post(
          'http://localhost:9000/api/get-user',
          { id: params.id }
        )

        .then(function (response) {
          // setData(response.data);
          setUser(
            response.data
            // JSON.parse(response.data[2].link)
          );
          setIsLoading(false);

          // setDatas(result);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    };
    const getDocs = async () => {
      axios
        .post(
          'http://localhost:9000/api/get-docs',
          { id: params.id }
        )

        .then(function (response) {
          let rs = [];
          console.log(response);
          response.data.map((doc) => {
            rs.push({
              date: doc.date,
              doc: doc.doc,
              docName: doc.docName,
              pages: doc.pages,
              status: doc.status,
              workDesierd: doc.workDesierd,

              link: (
                <a
                  href={`http://localhost:9000/${doc.doc}`}
                  download
                >
                  click to download
                </a>
              ),
            });
          });
          setData(rs);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    };

    getDocs();
    fetchData();
  }, []);

  const history = useHistory();
  const columns = [
    {
      title: 'Date Submitted',

      dataIndex: 'date',
      className: 'none',
    },
    {
      title: 'Document Name',
      dataIndex: 'docName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Download Document',
      dataIndex: 'link',
      className: 'none',
    },
    // {
    //   title: 'Upload Document',
    //   dataIndex: 'upload',
    //   className: 'none',
    // },
  ];

  // const data = [
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'xxxxxxxx xxxxxxx',
  //     request: 'Approved',
  //     key: 1,

  //     name: (
  //       <Link href="">Click To Download</Link>
  //     ),
  //     upload: (
  //       <Link href="#">Click To Upload</Link>
  //     ),
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'xxxxxxxx xxxxxxx',
  //     request: 'Complete',
  //     key: 2,

  //     name: <a href="#">Click To Download</a>,
  //     upload: <a href="#">Click To Upload</a>,
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'xxxxxxxx xxxxxxx',
  //     key: 3,

  //     request: 'In Progress',
  //     name: <a href="#">Click To Download</a>,
  //     upload: <a href="#">Click To Upload</a>,
  //   },
  // ];
  function onChange(
    pagination,
    filters,
    sorter,
    extra
  ) {
    console.log(
      'params',
      pagination,
      filters,
      sorter,
      extra
    );
  }

  return (
    <Container>
      <nav></nav>

      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            <a href="/admin">
              Company<span>logo</span>
            </a>
          </h1>

          <nav>
            <Link to="/admin" className="zero">
              Home
            </Link>
            <Link to="/create-client">
              Create Client
            </Link>

            <Link to="/">Logout</Link>
          </nav>
        </div>
      </header>
      <h3
        className="sub"
        style={{ marginTop: '130px' }}
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
            {!isLoading && (
              <Col sm="5">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={user.userName}
                />
              </Col>
            )}
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Email
            </Form.Label>
            {!isLoading && (
              <Col sm="5">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={user.email}
                />
              </Col>
            )}
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Address
            </Form.Label>
            {!isLoading && (
              <Col sm="5">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={user.address}
                />
              </Col>
            )}
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              City
            </Form.Label>
            {!isLoading && (
              <Col sm="3">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={user.userName}
                />
              </Col>
            )}
            <Form.Label
              column
              sm="1"
              className="no"
              style={{ marginLeft: '50px' }}
            >
              State
            </Form.Label>
            {!isLoading && (
              <Col sm="5">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={user.state}
                />
              </Col>
            )}
            <Form.Label
              column
              sm="2"
              className="no"
              style={{ marginTop: '20px' }}
            >
              Postal Code
            </Form.Label>
            {!isLoading && (
              <Col sm="3">
                <Form.Control
                  style={{ marginTop: '20px' }}
                  plaintext
                  readOnly
                  defaultValue={user.postal}
                />
              </Col>
            )}
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
            {!isLoading && (
              <Col sm="4">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={user.country}
                  style={{ marginTop: '20px' }}
                />
              </Col>
            )}
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Phone
            </Form.Label>
            {!isLoading && (
              <Col sm="5">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={user.phone}
                />
              </Col>
            )}
            <button
              className="black"
              style={{
                padding: '0 20px',
                marginLeft: '20px',
              }}
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
      <h3 className="sub">Document Summary</h3>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        bordered
      />
      <button
        onClick={() => {
          props.history.push('/admin');
        }}
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

export default Review;
