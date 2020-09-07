import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Homepage from './containers/Homepage';
import CardLookup from './containers/CardLookup/CardLookup';
import Decks from './containers/Decks/Decks';
import Beginners from './components/Beginners/Beginners';
import Community from './containers/Community/Community';

function App() {
  return (
    <div>
        <Layout>
          <Switch>
            <Route path="/cardlookup" exact component={CardLookup}/>
            <Route path="/decks" exact component={Decks}/>
            <Route path="/beginners" exact render={Beginners}/>
            
            <Route path="/" exact component={Homepage}/>
            <Route path="/community" exact component={Community}/>
            {/* <Redirect to="/" /> */}
          </Switch>
        </Layout>
    </div>
  );
}

export default App;
