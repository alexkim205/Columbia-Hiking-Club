import React, { Component }           from 'react';
import { connect }                    from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { compose }                    from 'redux';
import PropTypes                      from 'prop-types';

import { auth }                          from '../actions';
import TextErrorField                    from './TextErrorField';
import { DateTimeMask, PhoneNumberMask } from './FieldMasks';

import Button            from '@material-ui/core/Button';
import Paper             from '@material-ui/core/Paper';
import Typography        from '@material-ui/core/Typography';
import withStyles        from '@material-ui/core/styles/withStyles';
import InputAdornment    from '@material-ui/core/InputAdornment/InputAdornment';
import IconButton        from '@material-ui/core/IconButton/IconButton';
import Visibility        from '@material-ui/icons/Visibility';
import VisibilityOff     from '@material-ui/icons/VisibilityOff';
import Avatar            from '@material-ui/core/Avatar';
import PersonAddOutlined from '@material-ui/icons/PersonAddOutlined';
import MenuItem          from '@material-ui/core/MenuItem/MenuItem';
import SelectErrorField  from './SelectErrorField';
import FormControlLabel  from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox          from '@material-ui/core/Checkbox/Checkbox';

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

class RegisterPage extends Component {

  state = {
    // fields
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    school: '',
    interest_drive: false,
    interest_lead: false,
    medical: '',

    // DOM
    showPassword: false,
  };

  handleSubmit = e => {
    e.preventDefault();

    // clean phone number '+1(123) 879-7867'.replace(/[^0-9+]/g, '')
    let phone_number = this.state.phone_number.replace(/[^0-9+]/g, '');

    this.props.register(
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password,
      phone_number,
      this.state.school,
      this.state.interest_drive,
      this.state.interest_lead,
      this.state.medical,
    );
  };

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleCheckChange = e => {
    this.setState({[e.target.value]: e.target.checked});
  };

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !state.showPassword}));
  };

  render () {

    const {errors, classes} = this.props;
    const error_fields = errors.map(e => e.field);

    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>;
    }

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <div className={classes.formTitle}>
            <Avatar className={classes.avatar}>
              <PersonAddOutlined className={classes.avatarIcon}/>
            </Avatar>
            <Typography component="h1" variant="h4">
              Register
            </Typography>
          </div>

          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextErrorField
              className={classes.field}
              label="First Name"
              variant="filled"
              id="first_name"
              type="text"
              errors={errors}
              inputProps={{
                autoFocus: true,
                onChange: this.handleChange,
                autoComplete: 'fname',
              }}
            />
            <TextErrorField
              className={classes.field}
              label="Last Name"
              variant="filled"
              id="last_name"
              type="text"
              errors={errors}
              inputProps={{
                onChange: this.handleChange,
                autoComplete: 'lname',
              }}
            />
            <TextErrorField
              className={classes.field}
              label="Email"
              variant="filled"
              id="email"
              type="email"
              errors={errors}
              inputProps={{
                onChange: this.handleChange,
                autoComplete: 'email',
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

            <TextErrorField
              className={classes.field}
              label='Phone Number'
              variant='filled'
              id='phone_number'
              type='text'
              errors={errors}
              inputProps={{
                inputProps: {
                  value: this.state.phone_number,
                },
                onChange: this.handleChange,
                endAdornment: undefined,
                inputComponent: PhoneNumberMask,
              }}
              labelProps={{
                shrink: true,
              }}
            />

            <SelectErrorField
              className={classes.field}
              label="School"
              variant="filled"
              id="school"
              errors={errors}
              inputProps={{
                onChange: this.handleChange,
                value: this.state.school,
              }}
            >
              <MenuItem value="CC">Columbia College</MenuItem>
              <MenuItem value="SEAS">SEAS Undergraduate</MenuItem>
              <MenuItem value="BARN">Barnard College</MenuItem>
              <MenuItem value="GS">General Studies</MenuItem>
              <MenuItem value="SEASGRAD">SEAS Graduate</MenuItem>
              <MenuItem value="ARTSCIGRAD">Graduate School of Arts and Sciences</MenuItem>
            </SelectErrorField>

            <TextErrorField
              className={classes.field}
              label='Medical Concerns'
              variant='filled'
              id='medical'
              type='text'
              errors={errors}
              inputProps={{
                onChange: this.handleChange,
                multiline: true,
                rows: 7,
                placeholder: 'Asthma, physical injury, allergies, ...',
                required: false,
              }}
            />

            <FormControlLabel
              className={classes.field}
              control={
                <Checkbox
                  value="interest_drive"
                  checked={this.state.interest_drive}
                  onChange={this.handleCheckChange}
                />
              }
              label="I am 21, have a valid state driver's license, and would like to drive"
            />

            <FormControlLabel
              className={classes.field}
              control={
                <Checkbox
                  value="interest_lead"
                  checked={this.state.interest_lead}
                  onChange={this.handleCheckChange}
                />
              }
              label="I have led a few hikes before and would like to lead hikes"
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
                Register
              </Button>
              <Typography component="caption">
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </div>
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
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
    register: (
      fname, lname, email, password,
      phone_number, school,
      interest_drive, interest_lead,
      medical) => {
      return dispatch(auth.register(fname, lname, email, password,
        phone_number, school, interest_drive, interest_lead, medical));
    },
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterPage);
