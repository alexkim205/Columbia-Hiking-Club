import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Redirect, Link }   from 'react-router-dom';
import { compose }          from 'redux';
import PropTypes            from 'prop-types';
import { withRouter }       from 'react-router-dom';

import { auth }       from '../actions';
import TextErrorField from './TextErrorField';

import Button         from '@material-ui/core/Button';
import Paper          from '@material-ui/core/Paper';
import Typography     from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton     from '@material-ui/core/IconButton';
import Visibility     from '@material-ui/icons/Visibility';
import VisibilityOff  from '@material-ui/icons/VisibilityOff';
import withStyles     from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    paper: {
      padding: '30px',
    },
  };
};

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    showPassword: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.login(this.state.email, this.state.password);
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !state.showPassword}));
  };

  render () {

    const {classes, errors} = this.props;
    const error_fields = errors.map(e => e.field);
    // const errorsExist = errors.length > 0;

    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>;
    }

    return (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={this.handleSubmit}>

          <TextErrorField
            label="Email"
            variant="filled"
            id="email"
            type="email"
            autoComplete="email"
            handleChange={this.handleChange}
            errors={errors}
          />

          <TextErrorField
            label="Password"
            variant="filled"
            id="password"
            type={this.state.showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            handleChange={this.handleChange}
            errors={errors}
            adornment={
              <InputAdornment variant="filled" position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
          />

          {error_fields.includes('non_field_errors') && (
            <h5>{errors[error_fields.indexOf(
              'non_field_errors')]['message']}</h5>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
        <Typography component="h6">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }

  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      return dispatch(auth.login(email, password));
    },
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LoginPage);
