import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Homepage from './containers/Homepage';
import CardLookup from './containers/CardLookup/CardLookup';

function App() {
  return (
    <div>
        <Layout>
          <Switch>
            <Route path="/cardlookup" exact component={CardLookup}/>
            <Route path="/" exact component={Homepage}/>
            <Redirect to="/" />
          </Switch>
        </Layout>
    </div>
  );
}

export default App;
