import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { withRouter }       from 'react-router-dom';
import { compose }          from 'redux';
import { hot }              from 'react-hot-loader';
import withStyles           from '@material-ui/core/styles/withStyles';

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
