import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { compose }          from 'redux';
import { withRouter, Link } from 'react-router-dom';
import classNames           from 'classnames';
import withStyles           from '@material-ui/core/styles/withStyles';
import { hike }             from '../actions';
import Avatar               from '@material-ui/core/Avatar/Avatar';
import Landscape            from '@material-ui/icons/Landscape';
import Typography           from '@material-ui/core/Typography/Typography';
import List                 from '@material-ui/core/List';
import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import Paper                from '@material-ui/core/Paper/Paper';
import Button               from '@material-ui/core/Button/Button';

const styles = theme => {
  return {
    paper: {
      paddingTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 5,
      paddingLeft: theme.spacing.unit * 5,
      paddingRight: theme.spacing.unit * 5,
      alignItems: 'center',
      margin: '0 auto',
      maxWidth: 800,
    },
    formTitle: {
      margin: '2em 0',
      textAlign: 'center',
    },
    caption: {
      marginBottom: '0.5em',
    },
    description: {
      textAlign: 'left',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '1em',
      maxWidth: '80%',
      padding: '1em',
      border: '1px solid ' + theme.palette.primary.main,
      borderRadius: 5,
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    },
    sub: {
      marginBottom: '1em',
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

class HikeRequestSuccessPage extends Component {

  componentDidMount () {
    const {id} = this.props.match.params;
    this.props.getHikeReq(id);
  }

  state = {
    requestData: null,
  };

  render () {
    const {classes, requestData} = this.props;
    const {
      str_name, id, pub_date, destination,
      date_of_hike, description, difficulty,
    } = requestData;
    console.log(requestData);

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <div className={classes.formTitle}>
            <Avatar className={classes.avatar}>
              <Landscape className={classes.avatarIcon}/>
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.formTitle}>
              Your hike request to {destination} was submitted.
            </Typography>
            <Typography variant="caption" className={classes.caption}>
              Description
            </Typography>
            <div className={classes.description}>
              <Typography variant="body1">
                {description}
              </Typography>
            </div>
            <Typography variant="caption" className={classes.caption}>
              Date
            </Typography>
            <Typography variant="body1" className={classes.sub}>
              {date_of_hike}
            </Typography>
            <Typography variant="caption" className={classes.caption}>
              Difficulty
            </Typography>
            <Typography variant="body1" className={classes.sub}>
              {difficulty}
            </Typography>
          </div>

          <div className={classes.endForm}>
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              component={Link}
              to="/hike-req"
            >
              Request another hike
            </Button>
          </div>
        </Paper>

      </React.Fragment>
    );
  }

}

HikeRequestSuccessPage.propTypes = {
  classes: PropTypes.object.isRequired,
  hikeID: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    requestData: state.hike.hikeReq,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHikeReq: (id) => dispatch(hike.getHikeReq(id)),
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(HikeRequestSuccessPage);
