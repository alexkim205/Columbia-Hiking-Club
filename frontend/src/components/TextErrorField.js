import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { compose }          from 'redux';
import { withRouter }       from 'react-router-dom';
import classNames           from 'classnames';
import withStyles           from '@material-ui/core/styles/withStyles';
import * as auth            from '../actions/auth';
import FormControl          from '@material-ui/core/FormControl/FormControl';
import InputLabel           from '@material-ui/core/InputLabel/InputLabel';
import FilledInput          from '@material-ui/core/FilledInput/FilledInput';
import InputAdornment       from '@material-ui/core/InputAdornment/InputAdornment';
import IconButton           from '@material-ui/core/IconButton/IconButton';
import VisibilityOff        from '@material-ui/core/SvgIcon/SvgIcon';
import FormHelperText       from '@material-ui/core/FormHelperText/FormHelperText';

const styles = theme => {
  return {
    paper: {
      padding: '30px',
    },
  };
};

class TextErrorField extends Component {

  static defaultProps = {};

  state = {};

  render () {
    const {classes, errors} = this.props;

    return (
      <React.Fragment>

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

      </React.Fragment>
    );
  }

}

TextErrorField.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  adornment: PropTypes.element,
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(TextErrorField);
