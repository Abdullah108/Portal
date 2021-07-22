import LoginClient from './pages/login/login';

import { Route } from 'react-router';

import { Container } from './app.styles';

import CustomTable from './pages/client/client.jsx';
import Admin from './pages/admin/admin';
import Submit from './pages/submit/submit';
import Review from './pages/admin-review/admin-review';
import Create from './pages/create-client/create-client';
import ClientDetail from './pages/client-detail/client-detail';

function App() {
  return (
    <Container>
      <Route
        path="/"
        exact
        component={LoginClient}
      />
      <Route
        path="/submit"
        exact
        component={Submit}
      />
      <Route
        path="/review/:id"
        exact
        component={Review}
      />
      <Route
        exact
        path="/create-client"
        component={Create}
      />
      <Route
        path="/client"
        exact
        component={CustomTable}
      />
      <Route
        path="/Admin"
        exact
        component={Admin}
      />
      <Route
        path="/client-detail/:id"
        component={ClientDetail}
      />
      ;
    </Container>
  );
}

export default App;
