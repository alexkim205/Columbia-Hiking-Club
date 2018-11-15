import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { compose }          from 'redux';
import { withRouter }       from 'react-router-dom';

import withStyles     from '@material-ui/core/styles/withStyles';
import FormControl    from '@material-ui/core/FormControl/FormControl';
import InputLabel     from '@material-ui/core/InputLabel/InputLabel';
import FilledInput    from '@material-ui/core/FilledInput/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Select         from '@material-ui/core/Select';

const styles = theme => {
  return {
    formControl: {},
  };
};

class TextErrorField extends Component {

  static defaultProps = {};

  state = {};

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
    const {
      variant, id, label, type
    } = this.props;

    const labelProps = this.props.labelProps ? this.props.labelProps : {};
    const inputProps = this.props.inputProps ? this.props.inputProps : {};


    const error_fields = errors.map(e => e.field);
    const aria_describedby = this.props.id + '-error-text';

    return (
      <React.Fragment>

        <FormControl
          className={classes.formControl}
          variant={variant}
          value={id}
          aria-describedby={aria_describedby}
          error={error_fields.includes(id)}
        >
          <InputLabel
            htmlFor="password"
            {...labelProps}
          >
            {label}
          </InputLabel>
          <Select
            input={<FilledInput name={id} id={id} />}
            {...inputProps}
          >
            {this.props.children}
          </Select>

          <FormHelperText id={aria_describedby}
                          disabled={!error_fields.includes(id)}>
            {this.findErrorMessage(id)}
          </FormHelperText>

        </FormControl>

      </React.Fragment>
    );
  }

}

TextErrorField.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,

  labelProps: PropTypes.object,
  inputProps: PropTypes.object,

  classes: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
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
