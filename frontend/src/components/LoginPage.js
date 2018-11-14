import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Redirect, Link }   from 'react-router-dom';
import { compose }          from 'redux';
import PropTypes            from 'prop-types';
import { withRouter }       from 'react-router-dom';
import classNames           from 'classnames';

import { auth } from '../actions';

import Avatar           from '@material-ui/core/Avatar';
import Button           from '@material-ui/core/Button';
import FormControl      from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText   from '@material-ui/core/FormHelperText';
import Checkbox         from '@material-ui/core/Checkbox';
import Input            from '@material-ui/core/Input';
import InputLabel       from '@material-ui/core/InputLabel';
import LockIcon         from '@material-ui/icons/LockOutlined';
import FilledInput      from '@material-ui/core/FilledInput';
import Paper            from '@material-ui/core/Paper';
import Typography       from '@material-ui/core/Typography';
import TextField        from '@material-ui/core/TextField';
import InputAdornment   from '@material-ui/core/InputAdornment';
import IconButton       from '@material-ui/core/IconButton';
import Visibility       from '@material-ui/icons/Visibility';
import VisibilityOff    from '@material-ui/icons/VisibilityOff';

import withStyles from '@material-ui/core/styles/withStyles';

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

  findErrorMessage = (field) => {
    let {errors} = this.props;
    let error_fields = errors.map(e => e.field);
    let error_messages = errors.map(e => e.message);
    return (error_fields.includes(field)) ?
      error_messages[error_fields.indexOf(field)] :
      '';
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
          <FormControl
            className={classes.formControl}
            variant="filled"
            value="email"
            aria-describedby="email-error-text"
            error={error_fields.includes('email')}
            autoFocus
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <FilledInput
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
            />
            <FormHelperText id="email-error-text"
                            disabled={!error_fields.includes('email')}>
              {this.findErrorMessage('email')}
            </FormHelperText>

          </FormControl>
          <FormControl
            className={classes.formControl}
            variant="filled"
            value="password"
            aria-describedby="password-error-text"
            error={error_fields.includes('password')}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
              id="password"
              type={this.state.showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              endAdornment={
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

            <FormHelperText id="password-error-text"
                            disabled={!error_fields.includes('password')}>
              {this.findErrorMessage('password')}
            </FormHelperText>

          </FormControl>

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
