import { NavLink, withRouter, Link, Route } from 'react-router-dom';
import PropTypes                            from 'prop-types';
import React, { Component }                 from 'react';
import { compose }                          from 'redux';
import { connect }                          from 'react-redux';
import { hot }                              from 'react-hot-loader';

import withStyles       from '@material-ui/core/styles/withStyles';
import IconButton       from '@material-ui/core/IconButton';
import Drawer           from '@material-ui/core/Drawer';
import List             from '@material-ui/core/List';
import Typography       from '@material-ui/core/Typography';
import Divider          from '@material-ui/core/Divider';
import IconButton       from '@material-ui/core/IconButton';
import MenuIcon         from '@material-ui/icons/Menu';
import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem         from '@material-ui/core/ListItem';
import ListItemIcon     from '@material-ui/core/ListItemIcon';
import ListItemText     from '@material-ui/core/ListItemText';
import InboxIcon        from '@material-ui/icons/MoveToInbox';
import MailIcon         from '@material-ui/icons/Mail';

import { auth }     from '../actions';
import HikeListPage from './HikesListPage';
import PrivateRoute from './PrivateRoute';
import ProfilePage  from './ProfilePage';
import LoginPage    from './LoginPage';
import RegisterPage from './RegisterPage';
import NotFoundPage from './NotFoundPage';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

class Sidebar extends Component {

  state = {
    open: false,
  };

  render () {
    const {classes} = this.props;
    const {open} = this.state;

    return (
      <div className={classes.root}>

      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapStateToProps = state => {
//   return {
//     user: state.auth.user,
//     isAuthenticated: state.auth.isAuthenticated
//   }
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     loadUser: () => dispatch(auth.loadUser()),
//     logout: () => dispatch(auth.logout())
//   }
// };

export default compose(
  withRouter,
  withStyles(styles),
  // connect(mapStateToProps, mapDispatchToProps),
  hot(module),
)(Sidebar);
