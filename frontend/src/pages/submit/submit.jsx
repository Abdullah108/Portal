import { Table } from 'antd';

import React, {
  useState,
  useEffect,
} from 'react';

import {
  Link,
  useHistory,
} from 'react-router-dom';

import { Container } from './submit.styles';

import axios from 'axios';

import Form from 'react-bootstrap/Form';

import {
  Col,
  Row,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from 'react-bootstrap';

const Submit = (props) => {
  const [show, setShow] = useState(true);
  const [pages, setPages] = useState('');
  const [user, setUser] = useState({});
  const [docName, setDocName] = useState();
  const [workDesierd, setWorkDesierd] = useState(
    'Edit Document - Cost per page $xxxxxxx'
  );
  const [doc, setDoc] = useState(null);
  const [data, setData] = useState([]);
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
    },
  ];

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
  useEffect(() => {
    //API Call
    const fetchData = async () => {
      axios
        .post(
          'http://localhost:9000/api/get-user',
          {
            id: sessionStorage.getItem('id'),
          }
        )

        .then(function (response) {
          setUser(response.data);
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
          {
            id: sessionStorage.getItem('id'),
          }
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

    fetchData();
    getDocs();
  }, [show]);

  const onPost = async (event) => {
    event.preventDefault();
    // const token = sessionStorage.getItem('token');
    try {
      const formData = new FormData();
      formData.append('doc', doc);
      formData.append('workDesierd', workDesierd);
      formData.append('docName', docName);
      formData.append('userName', user.userName);
      formData.append('pages', pages);
      formData.append(
        'id',
        sessionStorage.getItem('id')
      );
      const res = await axios.post(
        'http://localhost:9000/api/submit-doc',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setWorkDesierd(
      'Edit Document - Cost per page $xxxxxxx'
    );
    setDocName('');
    setShow(!show);
    setPages('');
    setDoc(null);
  };

  return (
    <Container>
      <nav></nav>
      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            <a href="/client">
              Company<span>logo</span>
            </a>
          </h1>

          <nav>
            {/* <Link to="/client" className='zero'>Home</Link> */}
            <a>Logged in as: {user.userName}</a>
            <Link to="/">Logout</Link>
          </nav>
        </div>
      </header>

      <h3
        className="sub tops"
        style={{ marginTop: '100px' }}
      >
        Submit New Document
      </h3>
      <div className="form">
        <Form onSubmit={onPost}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Document Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                value={docName}
                onChange={(event) =>
                  setDocName(event.target.value)
                }
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
            style={{ marginTop: '30px' }}
          >
            <Form.Label column sm="2">
              Work Desired
            </Form.Label>
            <Col sm="10">
              <select
                value={workDesierd}
                onChange={(event) => {
                  setWorkDesierd(
                    event.target.value
                  );
                }}
              >
                <option
                  value="Edit Document - Cost per page
                  $xxxxxxx"
                >
                  Edit Document - Cost per page
                  $xxxxxxx
                </option>
                <option
                  value="Translate Document - Cost per
                  page $xxxxxxx"
                >
                  Translate Document - Cost per
                  page $xxxxxxx
                </option>
                <option
                  value="Review Document - Cost per page
                  $xxxxxxx"
                >
                  Review Document - Cost per page
                  $xxxxxxx
                </option>
              </select>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Number of pages
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="number"
                value={pages}
                onChange={(event) =>
                  setPages(event.target.value)
                }
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            xs="12"
            controlId="formPlaintextEmail"
            style={{
              marginTop: '50px',
            }}
          >
            <Form.Label column sm="3">
              Select Document to Upload
            </Form.Label>
            <Col sm="7">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder=""
                  aria-label=""
                  type="file"
                  accept=".xls,.xlsx,.docx"
                  onChange={(event) =>
                    setDoc(event.target.files[0])
                  }
                  style={{
                    border: 'none',
                    marginTop: '10px',
                  }}
                />
                <button
                  className="black"
                  style={{
                    padding: '10px 20px',
                    marginTop: '20px',
                  }}
                >
                  Search
                </button>
                <button
                  className="black one"
                  style={{
                    marginLeft: '70px',
                    padding: '10px 20px',
                    marginTop: '20px',
                  }}
                >
                  Submit Document
                </button>
              </InputGroup>
              <InputGroup className="mb-3"></InputGroup>
            </Col>
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
        key={data.id}
      />
      <button
        onClick={() =>
          props.history.push('/client')
        }
        className="black"
        style={{
          padding: '10px 20px',
          marginLeft: '45%',
          transform: 'translateX(-50%)',
        }}
      >
        View User History
      </button>
    </Container>
  );
};

export default Submit;
