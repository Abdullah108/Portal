import { Table } from 'antd';
import React, {
  useState,
  useEffect,
} from 'react';

import {
  Link,
  useHistory,
} from 'react-router-dom';

import { Container } from './client.styles';
import {
  Nav,
  Navbar,
  Form,
  Button,
  FormControl,
} from 'react-bootstrap';

import axios from 'axios';

const CustomTable = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Date And Time',
      className: 'table__header',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      className: 'table__header',
      dataIndex: 'status',
    },
    {
      title: 'Document Name',
      className: 'doc',
      dataIndex: 'docName',
    },
    {
      title: 'Work Requested',
      className: ' req',
      dataIndex: 'workDesierd',
    },
    {
      title: 'Notes',
      className: 'table__header',
      dataIndex: 'pages',
    },
  ];

  // const data = [
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'Client Document Submitted',
  //     request: 'Edit Document - $.50 per page',
  //     name: 'Document 1',
  //     note: 'document size = 200 pages',
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'Client Document Submitted',
  //     request: 'Edit Document - $.50 per page',
  //     name: 'Document 2',
  //     note: 'document size = 200 pages',
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'Client Document Submitted',
  //     request: 'Edit Document - $.50 per page',
  //     name: 'Document 3',
  //     note: 'document size = 200 pages',
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'Client Document Submitted',
  //     request: 'Edit Document - $.50 per page',
  //     name: 'Document 4',
  //     note: 'document size = 200 pages',
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'Client Document Submitted',
  //     request: 'Edit Document - $.50 per page',
  //     name: 'Document 5',
  //     note: 'document size = 200 pages',
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'Client Document Submitted',
  //     request: 'Edit Document - $.50 per page',
  //     name: 'Document 6',
  //     note: 'document size = 200 pages',
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'Client Document Submitted',
  //     request: 'Edit Document - $.50 per page',
  //     name: 'Document 7',
  //     note: 'document size = 200 pages',
  //   },
  //   {
  //     date: '03/27/2021 09:25:12 Am',
  //     action: 'Client Document Submitted',
  //     request: 'Edit Document - $.50 per page',
  //     name: 'Document 8',
  //     note: 'document size = 200 pages',
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
          setData(response.data);
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

  console.log(sessionStorage.getItem('token'));
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
            <Link to="/submit">
              Submit Document
            </Link>
            <Link to="#">
              Logged in as: {user.userName}
            </Link>
            <Link to="/">Logout</Link>
          </nav>
        </div>
      </header>
      <h3
        className="sub"
        style={{ marginTop: '10  0px' }}
      >
        View User History
      </h3>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        bordered
      />
    </Container>
  );
};

export default CustomTable;
