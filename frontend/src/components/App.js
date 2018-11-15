/* eslint-disable import/no-named-as-default */
import React, { Component }          from 'react';
import { hot }                       from 'react-hot-loader';
import PropTypes                     from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect }                   from 'react-redux';
import { compose }                   from 'redux';
import classNames                    from 'classnames';

import { auth } from '../actions';

import NavBar               from './NavBar';
import PrivateRoute         from './PrivateRoute';
import ProfilePage          from './ProfilePage';
import LoginPage            from './LoginPage';
import RegisterPage         from './RegisterPage';
import HikesListPage        from './HikesListPage';
import HikeRequestPage      from './HikeRequestPage';
import NotFoundPage         from './NotFoundPage';

import 'typeface-roboto';
import theme                from '../styles/palette';
import withStyles           from '@material-ui/core/styles/withStyles';
import CssBaseline          from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,

});

class App extends Component {

  componentDidMount () {
    this.props.loadUser();
  }

  state = {
    drawerOpen: false,
  };

  handleDrawerOpen = () => {
    this.setState({drawerOpen: true});
  };

  handleDrawerClose = () => {
    this.setState({drawerOpen: false});
  };

  render () {

    const {classes} = this.props;
    const {drawerOpen} = this.state;

    return (
      <div>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
          <NavBar drawerOpen={this.state.drawerOpen}
                  handleDrawerOpen={this.handleDrawerOpen}
                  handleDrawerClose={this.handleDrawerClose}/>
          {/*<Sidebar/>*/}
          <div className={classes.appBarSpacer}/>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: drawerOpen,
            })}
          >
            <Switch>
              <Route exact path="/" component={HikesListPage}/>
              <PrivateRoute path="/profile" component={ProfilePage}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              <Route path="/hike-req" component={HikeRequestPage}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </main>
        </MuiThemeProvider>

      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
  };
};

// export default hot(module)(App);

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  hot(module),
)(App);

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
