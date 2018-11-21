import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose }          from 'redux';
import PropTypes            from 'prop-types';
import { hot }              from 'react-hot-loader';
import { XMasonry, XBlock } from 'react-xmasonry/dist/index.js'; // Imports precompiled bundle

import { prettifyShortDate } from '../helpers/prettifyDate';
import stringToImage         from '../helpers/stringToImage';

import withStyles     from '@material-ui/core/styles/withStyles';
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea';
import CardMedia      from '@material-ui/core/CardMedia/CardMedia';
import CardContent    from '@material-ui/core/CardContent/CardContent';
import Typography     from '@material-ui/core/Typography/Typography';
import CardActions    from '@material-ui/core/CardActions/CardActions';
import Button         from '@material-ui/core/Button/Button';
import Card           from '@material-ui/core/Card/Card';

const styles = theme => ({
  media: {
    height: 140,
  },
  xblock: {
    animation: 'comeIn ease 0.5s',
    animationIterationCount: 1,
    transition: 'left .3s ease, top .3s ease',
  },
  tile: {
    // padding: theme.spacing.unit * 2,
    height: '100%',
    margin: theme.spacing.unit * 2,
  },
  cardactions: {
    align: 'right',
  },
});

class HikesGrid extends Component {

  getLayout = () => {
    const {hikeData} = this.props;
    hikeData.forEach((e) => {
      e['width'] = (Date.parse(e.date_of_hike) > new Date()) ? 2 : 1;
    });
    hikeData.sort(this.compare);
    return hikeData;
  };

  compare = (a, b) => {
    if (a.date_of_hike < b.date_of_hike)
      return 1;
    if (a.date_of_hike > b.date_of_hike)
      return -1;
    return 0;
  };

  render () {

    const {classes} = this.props;
    const hikeData = this.getLayout();

    return (
      <XMasonry>
        {hikeData.map(tile =>
          (
            <XBlock key={tile.id} width={tile.width} className={classes.xblock}>
              <Card className={classes.tile}>
                <CardActionArea
                  component={Link}
                  to={`/hike/${tile.id}`}
                >
                  <CardMedia
                    className={classes.media}
                    image={stringToImage(tile.destination)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {tile.str_name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {prettifyShortDate(tile.date_of_hike)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardactions}>
                  <Button
                    size="small"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </CardActions>
              </Card>
            </XBlock>
          ))}
      </XMasonry>
    );
  }
}

HikesGrid.propTypes = {
  classes: PropTypes.object,
  hikeData: PropTypes.array.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles),
  hot(module),
)(HikesGrid);
