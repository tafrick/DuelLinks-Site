import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Homepage from './containers/Homepage';
import CardLookup from './containers/CardLookup/CardLookup';
import Decks from './containers/Decks/Decks';
import Beginners from './components/Beginners/Beginners';
import Community from './containers/Community/Community';
import FullPost from './containers/Community/FullPost';
import FullBox from './containers/Boxes/FullBox';
import FullCard from './containers/Boxes/FullCard';

import GoogleBtn from './components/Login/GoogleBtn';

function App() {
  return (
    <div>
      <Layout>
        <GoogleBtn />
        <Switch>
          <Route path="/cardlookup" exact component={CardLookup} />
          <Route path="/decks" exact component={Decks} />
          <Route path="/beginners" exact render={Beginners} />

          <Route path="/" exact component={Homepage} />
          <Route path="/boxes/:boxId" exact component={FullBox} />
          <Route path="/boxes/:boxId/:cardName" exact component={FullCard} />
          <Route path="/community/:postId" exact component={FullPost} />
          <Route path="/community" exact component={Community} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
