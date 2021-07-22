import { Table } from 'antd';

import react, {
  useState,
  useEffect,
} from 'react';

import axios from 'axios';

import { Container } from './client-detail.styles';

import { FaExchangeAlt } from 'react-icons/fa';

import {
  Link,
  useHistory,
  useParams,
} from 'react-router-dom';
import CustomModal from '../modal/modal.component';

const ClientDetail = (props) => {
  const [user, setUser] = useState();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] =
    useState(true);

  const [id, set_id] = useState('');

  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Document Name',
      dataIndex: 'docName',
      className: 'block',
    },
    {
      title: 'Date Submited',
      dataIndex: 'date',
      className: 'none',
    },
    {
      title: 'Document Status',
      dataIndex: 'status',
      className: 'none',
    },
    {
      title: 'View Details',
      dataIndex: 'link',
      className: 'block',
    },
  ];
  const params = useParams();

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

  console.log(params.id);

  const getCompleted = (documents) => {
    let subs = 0;
    documents.map((doc) => {
      if (doc.status == 'complet') {
        subs++;
      }
    });
    return subs;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    //API Call
    const fetchData = async () => {
      axios
        .post(
          'http://localhost:9000/api/get-user',
          { id: params.id }
        )

        .then(function (response) {
          console.log(response.data);
          let result = [];
          setUser(response.data);
          setIsLoading(false);
          console.log('olaaa', response.data);
          response.data.documents.map((user) => {
            result.push({
              docName: user.docName,
              email: user.email,
              date: user.date,
              userName: user.userName,
              status: (
                <div
                  style={{
                    width: '60%',
                    display: 'flex',
                    justifyContent:
                      'space-between',
                  }}
                >
                  {user.status}{' '}
                  <Link
                    to="#"
                    onClick={() => {
                      set_id(user._id);
                      handleShow();
                    }}
                  >
                    <FaExchangeAlt />
                  </Link>
                </div>
              ),
              link: (
                <Link to={`/review/${params.id}`}>
                  view Details
                </Link>
              ),
            });
          });
          setData(result);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    };
    fetchData();
  }, [show]);

  return (
    <Container>
      <CustomModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        vid_id={id}
        user_id={params.id}
      />
      <header className="header-fixed">
        <div className="header-limiter">
          <h1>
            <Link to="/admin">
              Company<span>logo</span>
            </Link>
          </h1>

          <nav>
            <Link to="/admin">Home</Link>

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
        {!isLoading ? user.email : null}
      </h3>
      <Table
        columns={columns}
        dataSource={data}
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

export default ClientDetail;
