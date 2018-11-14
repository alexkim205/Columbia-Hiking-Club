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
    const error_fields = errors.map(e => e.field);
    const aria_describedby = this.props.id + '-error-text';

    return (
      <React.Fragment>

        <FormControl
          className={classes.formControl}
          variant={this.props.variant}
          value={this.props.id}
          aria-describedby={aria_describedby}
          error={error_fields.includes(this.props.id)}
        >
          <InputLabel htmlFor="password">{this.props.label}</InputLabel>
          <FilledInput
            id={this.props.id}
            type={this.props.type}
            name={this.props.id}
            autoComplete={this.props.autoComplete}
            onChange={this.props.handleChange}
            endAdornment={this.props.adornment}
          />

          <FormHelperText id={aria_describedby}
                          disabled={!error_fields.includes(this.props.id)}>
            {this.findErrorMessage(this.props.id)}
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
  type: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  adornment: PropTypes.element,

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
