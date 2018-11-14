import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import * as auth from "../actions/auth";


const styles = theme => {
  return {
    paper: {
      padding: '30px',
    }
  }
};

class Component extends Component {

  static defaultProps = {};

  state = {};

  render() {
    return (
      <React.Fragment>

      </React.Fragment>
    );
  }

}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {}
};


export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
