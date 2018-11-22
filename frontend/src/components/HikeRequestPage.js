import React, { Component }      from 'react';
import { connect }               from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';
import { compose }               from 'redux';
import PropTypes                 from 'prop-types';
import { withRouter }            from 'react-router-dom';
import moment                    from 'moment';

import { hike }         from '../actions';
import TextErrorField   from './TextErrorField';
import SelectErrorField from './SelectErrorField';
import { DateTimeMask } from './FieldMasks';

import Button           from '@material-ui/core/Button';
import Paper            from '@material-ui/core/Paper';
import Typography       from '@material-ui/core/Typography';
import withStyles       from '@material-ui/core/styles/withStyles';
import MenuItem         from '@material-ui/core/MenuItem';
import Avatar           from '@material-ui/core/Avatar/Avatar';
import Landscape        from '@material-ui/icons/Landscape';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox         from '@material-ui/core/Checkbox';

import HikeRequestSuccess from './HikeRequestSuccessPage';
import PrivateRoute       from './PrivateRoute';

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

class HikeRequestPage extends Component {

  state = {
    'date_of_hike': moment().format('MM/DD/YYYY HH:mm'),
    'destination': '',
    'description': '',
    'difficulty': 'Easy',
    'want_to_lead': false,
    'shouldRedirect': false,
  };

  UNSAFE_componentWillMount () {
    this.props.resetPage();
  }

  handleSubmit = e => {
    e.preventDefault();

    // put datetime in right format YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]
    const datetime = moment(this.state.date_of_hike).format('YYYY-MM-DDTHH:mm:00Z');
    // const id = this.props.requestData ? this.props.requestData.id : null;

    const data = this.props.request(
      datetime,
      this.state.destination,
      this.state.description,
      this.state.difficulty,
      this.state.want_to_lead,
    );

    // console.log(data);
    this.setState({shouldRedirect: true});
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleCheckChange = e => {
    this.setState({[e.target.value]: e.target.checked});
  };

  render () {

    const {classes, errors, requestSuccessful} = this.props;
    const error_fields = errors.map(e => e.field);
    const id = this.props.requestData ? this.props.requestData.id : null;
    // const errorsExist = errors.length > 0;

    if (this.state.shouldRedirect) {
      return (
        <React.Fragment>
          <PrivateRoute path={`/hike-req/:id`} component={HikeRequestSuccess}/>
          <Redirect to={`/hike-req/${id}`}/>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <div className={classes.formTitle}>
            <Avatar className={classes.avatar}>
              <Landscape className={classes.avatarIcon}/>
            </Avatar>
            <Typography component="h1" variant="h4">
              Request a Hike
            </Typography>
          </div>

          <form onSubmit={this.handleSubmit} className={classes.form}>

            <TextErrorField
              className={classes.field}
              label='Date & Time'
              variant='filled'
              id='date_of_hike'
              type='text'
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
              label='Description'
              variant='filled'
              id='description'
              type='text'
              errors={errors}
              inputProps={{
                onChange: this.handleChange,
                multiline: true,
                rows: 7,
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
              <MenuItem value="EASY">Easy</MenuItem>
              <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
              <MenuItem value="HARD">Hard</MenuItem>
            </SelectErrorField>

            <FormControlLabel
              className={classes.field}
              control={
                <Checkbox
                  value="want_to_lead"
                  checked={this.state.want_to_lead}
                  onChange={this.handleCheckChange}
                />
              }
              label="I want to lead this hike"
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
                Request this hike
              </Button>
            </div>

            {/*{requestSuccessful ? (*/}
            {/*<Typography variant="body1">*/}
            {/*Request successful*/}
            {/*</Typography>*/}
            {/*) : (*/}
            {/*<Typography variant="body1">*/}
            {/*Loading...*/}
            {/*</Typography>*/}
            {/*)}*/}

          </form>
        </Paper>
        {/*)}*/}
      </React.Fragment>
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
    requestData: state.hike.hikeReq,
    requestSuccessful: state.hike.hikeReqReceived,
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
    resetPage: () => dispatch({type: 'RESET_HIKE_STATE'}),
  };
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(HikeRequestPage);
