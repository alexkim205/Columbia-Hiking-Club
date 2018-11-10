/* eslint-disable import/no-named-as-default */
import React, {Component} from "react";
import {hot} from "react-hot-loader";
import PropTypes from "prop-types";
import {NavLink, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";

// import {auth} from "../actions";

import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import HikeListPage from "./HikeListPage";
import NotFoundPage from "./NotFoundPage";
import {compose} from "redux";
// import withStyles from "@material-ui/core/styles/withStyles";



class App extends Component {

  componentDidMount() {
    // this.props.loadUser();
  }

  render() {
    const activeStyle = {color: 'blue'};

    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Hike List</NavLink>
          {' | '}
          <NavLink to="/login" activeStyle={activeStyle}>Demo App</NavLink>
          {' | '}
          <NavLink to="/profile" activeStyle={activeStyle}>Profile</NavLink>
        </div>
        <Switch>
          <Route exact path="/" component={HikeListPage}/>
          <Route path="/login" component={LoginPage}/>
          <PrivateRoute path="/profile" component={ProfilePage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser())
    }
  }
};

// export default hot(module)(App);


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  hot(module),
)(App);


// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
