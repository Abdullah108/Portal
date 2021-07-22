import { Table } from 'antd';

import React, {
  useEffect,
  useState,
} from 'react';

import { Container } from './admin.styles';

import {
  Link,
  useHistory,
} from 'react-router-dom';

import axios from 'axios';

const Admin = () => {
  const [data, setData] = useState();
  const [datas, setDatas] = useState();
  const columns = [
    {
      title: 'Client Username/Email',
      dataIndex: 'email',
      className: 'block',
    },
    {
      title: 'Documents Submited',
      dataIndex: 'submitted',
      className: 'none',
    },
    {
      title: 'Documents in Progress',
      dataIndex: 'inProgress',
      className: 'none',
    },
    {
      title: 'Documents Completed',
      dataIndex: 'completed',
      className: 'none',
    },
    {
      title: 'Documants Approved',
      dataIndex: 'approved',
      className: 'none',
    },
    {
      title: 'View Details',
      dataIndex: 'link',
      className: 'block',
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
  const history = useHistory();

  const getSubmitted = (documents) => {
    let subs = 0;
    documents.map((doc) => {
      if (doc.status == 'submitted') {
        subs++;
      }
    });
    return subs;
  };
  const getApproved = (documents) => {
    let subs = 0;
    documents.map((doc) => {
      if (doc.status == 'approved') {
        subs++;
      }
    });
    return subs;
  };
  const getProgress = (documents) => {
    let subs = 0;
    documents.map((doc) => {
      if (doc.status == 'progress') {
        subs++;
      }
    });
    return subs;
  };
  const getCompleted = (documents) => {
    let subs = 0;
    documents.map((doc) => {
      if (doc.status == 'complet') {
        subs++;
      }
    });
    return subs;
  };

  useEffect(() => {
    //API Call
    const fetchData = async () => {
      axios
        .post(
          'http://localhost:9000/api/get-clients'
        )

        .then(function (response) {
          setData(response.data);

          var result = [];
          response.data.map((user) => {
            result.push({
              email: user.email,
              userName: user.userName,
              submitted: user.documents.length
                ? getSubmitted(user.documents)
                : 0,
              inProgress: user.documents.length
                ? getProgress(user.documents)
                : 0,
              completed: user.documents.length
                ? getCompleted(user.documents)
                : 0,
              approved: user.documents.length
                ? getApproved(user.documents)
                : 0,
              link: (
                <Link
                  to={`/client-detail/${user._id}`}
                >
                  view Details
                </Link>
              ),
            });
          });
          setDatas(result);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            <Link to="#">
              Company<span>logo</span>
            </Link>
          </h1>

          <nav>
            <Link to="/create-client">
              Create Client
            </Link>

            <Link to="/">Logout</Link>
          </nav>
        </div>
      </header>

      <h3
        className="sub"
        style={{ marginTop: '100px' }}
      >
        Client List
      </h3>
      <Table
        columns={columns}
        dataSource={datas}
        onChange={onChange}
        bordered
      />
      {/* <button
        className="outline"
        onClick={() =>
          history.push('/admin-login')
        }
      >
        Logout
      </button> */}
    </Container>
  );
};

export default Admin;
