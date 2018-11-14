import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Redirect }         from 'react-router-dom';
import { compose }          from 'redux';
import PropTypes            from 'prop-types';
import { withRouter }       from 'react-router-dom';
import { hike }             from '../actions';
import Button               from '@material-ui/core/Button';
import FormControl          from '@material-ui/core/FormControl';
import Input                from '@material-ui/core/Input';
import InputLabel           from '@material-ui/core/InputLabel';
import Paper                from '@material-ui/core/Paper';
import Typography           from '@material-ui/core/Typography';
import withStyles           from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    paper: {
      padding: '30px',
    },
  };
};

class HikeRequestPage extends Component {

  state = {
    'date_of_hike': new Date(),
    'destination': '',
    'description': '',
    'difficulty': 'Easy',
    'want_to_lead': false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.request(this.state.email, this.state.password);
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render () {

    const {classes} = this.props;

    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>;
    }

    return (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Request a Hike
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input name="email" id="email" autoComplete="email"
                   onChange={this.handleChange} autoFocus/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password"
                   onChange={this.handleChange}
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
            Login
          </Button>
        </form>
      </Paper>
    );
  }
}

HikeRequestPage.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  let errors = [];
  if (state.hike.errors) {
    errors = Object.keys(state.hike.errors).map(field => {
      return {field, message: state.hike.errors[field]};
    });
  }

  return {
    errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    request: (
      date_of_hike,
      destination,
      description,
      difficulty,
      want_to_lead,
    ) => {
      return dispatch(hike.request(
        date_of_hike,
        destination,
        description,
        difficulty,
        want_to_lead,
      ));
    },
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(HikeRequestPage);
