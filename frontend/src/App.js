import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Homepage from './containers/Homepage';
import CardLookup from './containers/CardLookup/CardLookup';
import Decks from './containers/Decks/Decks';
import Beginners from './components/Beginners/Beginners';
import Community from './containers/Community/Community';
import FullPost from './containers/Community/FullPost';
import Boxes from './containers/Boxes/Boxes';
import FullBox from './containers/Boxes/FullBox';
import FullCard from './containers/Boxes/FullCard';
import CategoryPosts from './containers/Community/CategoryPosts';
import * as actions from './store/actions/index';

import GoogleBtn from './components/Login/GoogleBtn';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <GoogleBtn />
          <Switch>
            <Route path="/cardlookup" exact component={CardLookup} />
            <Route path="/decks" exact component={Decks} />
            <Route path="/beginners" exact render={Beginners} />

            <Route path="/" exact component={Homepage} />
            <Route path="/boxes" exact component={Boxes} />
            <Route path="/boxes/:boxId" exact component={FullBox} />
            <Route path="/boxes/:boxId/:cardName" exact component={FullCard} />
            <Route path="/community/:postId" exact component={FullPost} />
            <Route path="/community" exact component={Community} />
            <Route path="/:category" exact component={CategoryPosts} />
            {/* <Redirect to="/" /> */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
