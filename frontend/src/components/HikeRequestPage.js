import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Redirect }         from 'react-router-dom';
import { compose }          from 'redux';
import PropTypes            from 'prop-types';
import { withRouter }       from 'react-router-dom';
import moment               from 'moment';

import { hike }         from '../actions';
import TextErrorField   from './TextErrorField';
import SelectErrorField from './SelectErrorField';
import DateTimeMask     from './DateTimeMask';

import Button         from '@material-ui/core/Button';
import FormControl    from '@material-ui/core/FormControl';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import Paper          from '@material-ui/core/Paper';
import Typography     from '@material-ui/core/Typography';
import withStyles     from '@material-ui/core/styles/withStyles';
import FilledInput    from '@material-ui/core/FilledInput/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Select         from '@material-ui/core/Select/Select';
import MenuItem       from '@material-ui/core/MenuItem';

import MaskedInput                 from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

const styles = theme => {
  return {
    paper: {
      padding: '30px',
      display: 'flex',
      flexWrap: 'wrap',
    },
    field: {
      marginLeft: '1em',
      marginRight: '1em',
    },
  };
};

class HikeRequestPage extends Component {

  state = {
    'date_of_hike': moment().format('MM/DD/YYYY HH:mm'),
    'destination': '',
    'description': '',
    'difficulty': 'Easy',
    'want_to_lead': false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.request(
      this.state.date_of_hike,
      this.state.destination,
      this.state.description,
      this.state.difficulty,
    );
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
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
          Request a Hike
        </Typography>
        <form onSubmit={this.handleSubmit}>

          <TextErrorField
            className={classes.field}
            label="Date & Time"
            variant="filled"
            id="date_of_hike"
            type="text"
            errors={errors}
            inputProps={{
              inputProps: {
                value: this.state.date_of_hike,
              },
              onChange: this.handleChange,
              endAdornment: undefined,
              inputComponent: DateTimeMask,
            }}
            labelProps={{
              shrink: true,
            }}
          />

          <TextErrorField
            className={classes.field}
            label="Destination"
            variant="filled"
            id="destination"
            type="text"
            errors={errors}
            inputProps={{
              onChange: this.handleChange,
            }}
          />

          <TextErrorField
            className={classes.field}
            label="Description"
            variant="filled"
            id="description"
            type="text"
            errors={errors}
            inputProps={{
              onChange: this.handleChange,
              multiline: true,
            }}
          />

          <SelectErrorField
            className={classes.field}
            label="Difficulty"
            variant="filled"
            id="difficulty"
            errors={errors}
            inputProps={{
              onChange: this.handleChange,
              value: this.state.difficulty,
            }}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </SelectErrorField>

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
            Request this hike
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
