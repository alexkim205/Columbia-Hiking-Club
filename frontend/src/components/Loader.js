import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { compose }          from 'redux';
import { withRouter }       from 'react-router-dom';
import classNames           from 'classnames';
import withStyles           from '@material-ui/core/styles/withStyles';

import { PulseLoader } from 'react-spinners';
import Paper           from '@material-ui/core/Paper/Paper';

const styles = theme => {
  return {
    paper: {
      width: 300,
      height: 300,
      margin: 'auto auto',
      display: 'flex',
    },
    loader: {
      display: 'block',
      margin: 'auto auto',
      textAlign: 'center',
    },
  };
};

class Loader extends Component {

  static defaultProps = {};

  state = {};

  render () {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <PulseLoader
            className={classes.loader}
            sizeUnit={'px'}
            size={15}
            color={'#8699dc'}
            loading={this.state.loading}
          />
        </Paper>
      </React.Fragment>
    );
  }

}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withRouter,
)(Loader);
