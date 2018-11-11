import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Link, withRouter} from "react-router-dom";
import {compose} from "redux";
import PropTypes from 'prop-types';
import {hot} from "react-hot-loader";


import {hike} from "../actions";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import HikesGrid from "./HikesGrid"


const styles = theme => {
  return {
    // root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   justifyContent: 'space-around',
    //   // overflow: 'hidden',
    //   // backgroundColor: theme.palette.background.paper,
    // },
    gridList: {
      maxWidth: '1300px',
    },
    gridListTile: {
      overflow: 'visible',
    },
    paper: {
      padding: theme.spacing.unit * 4,
      overflow: 'visible',
    },
    titleSpacer: theme.mixins.toolbar,
  }
};

class HikesListPage extends Component {

  componentWillMount() {
    this.setState({hikes: this.props.getHikes()})
  }

  state = {
    isOpen: false,
    hikes: null
  };

  render() {

    const {classes, hikeReceived, hikeData} = this.props;
    const {isOpen} = this.state;

    return (
      <React.Fragment>
        <Typography component="h1" variant="h2">
          Hikes
        </Typography>
        <div className={classes.titleSpacer}/>
        <div className={classes.root}>
          {hikeReceived ? (
            <HikesGrid hikeData={hikeData}></HikesGrid>
          ) : (
            <Typography variant="body1">
              Loading...
            </Typography>
          )}
        </div>
      </React.Fragment>
    )
  }
}

HikesListPage.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  let errors = [];
  if (state.hike.errors) {
    errors = Object.keys(state.hike.errors).map(field => {
      return {field, message: state.hike.errors[field]};
    })
  }

  return {
    errors,
    hikeData: state.hike.hikes,
    hikeReceived: state.hike.received
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHikes: () => dispatch(hike.getHikes())
    // register: (fname, lname, email, password) => {
    //   return dispatch(auth.register(fname, lname, email, password))
    // }
  }
}


export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  hot(module),
)(HikesListPage);
