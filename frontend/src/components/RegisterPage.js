import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Link, withRouter} from "react-router-dom";
import {compose} from "redux";
import PropTypes from 'prop-types';

import {auth} from "../actions";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => {
  return {
    paper: {
      padding: '30px',
    }
  }
}

class RegisterPage extends Component {

  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.register(
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    );
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  render() {

    const {classes} = this.props;

    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>
    }

    return (
      <React.Fragment>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <Input name="first_name" id="first_name" autoComplete="fname" onChange={this.handleChange} autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="last_name">Last Name</InputLabel>
              <Input name="last_name" id="last_name" autoComplete="lname" onChange={this.handleChange} autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input name="email" id="email" autoComplete="email" onChange={this.handleChange} autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" onChange={this.handleChange}
                     autoComplete="current-password"/>
            </FormControl>
            {this.props.errors.length > 0 && (
              <ul>
                {this.props.errors.map(error => (
                  <li key={error.field}>{error.message}</li>
                ))}
              </ul>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </Button>
            <Typography component="h6">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </form>
        </Paper>
      </React.Fragment>
    )
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object,
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    })
  }

  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (fname, lname, email, password) => {
      return dispatch(auth.register(fname, lname, email, password))
    }
  }
}


export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterPage);
