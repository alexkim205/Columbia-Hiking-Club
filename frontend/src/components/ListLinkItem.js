import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";

const styles = theme => ({
  listitem: {
    color: theme.palette.secondary.contrastText
  }
})

class ListLinkItem extends Component {

  render() {
    const {classes, to, icon, text} = this.props;
    return (
      <ListItem component={Link} to={to} button className={classes.listitem}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text}/>
      </ListItem>
    )
  }

}

ListLinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(ListLinkItem);
