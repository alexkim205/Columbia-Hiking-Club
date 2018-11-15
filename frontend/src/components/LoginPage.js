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
import Divider        from '@material-ui/core/Divider';
import Avatar         from '@material-ui/core/Avatar';
import PersonOutline  from '@material-ui/icons/PersonOutline';
import withStyles     from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    paper: {
      paddingTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 5,
      paddingLeft: theme.spacing.unit * 5,
      paddingRight: theme.spacing.unit * 5,
      alignItems: 'center',
      margin: '0 auto',
      maxWidth: 400,
    },
    formTitle: {
      margin: '2em 0',
      textAlign: 'center',
    },
    avatar: {
      backgroundColor: theme.palette.secondary.light,
      alignItems: 'center',
      margin: theme.spacing.unit * 2 + 'px auto',
      marginTop: 0,
      width: 100,
      height: 100,
    },
    avatarIcon: {
      width: '60%',
      height: '60%',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    field: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit,
      // marginBottom: theme.spacing.unit,
    },
    endForm: {
      textAlign: 'center',
    },
    submit: {
      margin: theme.spacing.unit * 2 + 'px auto',
      marginBottom: theme.spacing.unit * 3,
      minWidth: '40%',
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
      <React.Fragment>
        <Paper className={classes.paper}>
          <div className={classes.formTitle}>
            <Avatar className={classes.avatar}>
              <PersonOutline className={classes.avatarIcon}/>
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
          </div>

          <form onSubmit={this.handleSubmit} className={classes.form}>

            <TextErrorField
              className={classes.field}
              label="Email"
              variant="filled"
              id="email"
              type="email"
              errors={errors}
              inputProps={{
                autoFocus: true,
                onChange: this.handleChange,
                autoComplete: 'email',
                endAdornment: undefined,
                inputComponent: undefined,
              }}
            />

            <TextErrorField
              className={classes.field}
              label="Password"
              variant="filled"
              id="password"
              type={this.state.showPassword ? 'text' : 'password'}
              errors={errors}
              inputProps={{
                onChange: this.handleChange,
                autoComplete: 'current-password',
                endAdornment:
                  <InputAdornment variant="filled" position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>,
              }}
            />

            {error_fields.includes('non_field_errors') && (
              <h5>{errors[error_fields.indexOf(
                'non_field_errors')]['message']}</h5>
            )}

            <div className={classes.endForm}>
              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Typography component="caption">
                Don't have an account? <Link to="/register">Register</Link>.
              </Typography>
            </div>
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.array,
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
