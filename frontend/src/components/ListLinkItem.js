import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Link }             from 'react-router-dom';
import withStyles           from '@material-ui/core/styles/withStyles';
import ListItemText         from '@material-ui/core/ListItemText/ListItemText';
import MenuItem             from '@material-ui/core/MenuItem';
import Avatar               from '@material-ui/core/Avatar';

const styles = theme => ({
  menuitem: {
    color: theme.palette.secondary.contrastText,
    margin: '0.5em 0',
    padding: '1em',
  },
  divider: {
    margin: '0.5em 0',
  },
});

class ListLinkItem extends Component {
  render () {
    const {classes, to, icon, text} = this.props;
    return (
      <React.Fragment>
        <MenuItem component={Link} to={to} button className={classes.menuitem}>
          <Avatar>
            {icon}
          </Avatar>
          <ListItemText primary={text}/>
        </MenuItem>
        {/* <li className={classes.divider}> */}
        {/* <Divider inset /> */}
        {/* </li> */}
      </React.Fragment>
    );
  }
}

ListLinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListLinkItem);
