import React, { Component } from 'react';
import { withRouter }       from 'react-router-dom';
import { compose }          from 'redux';
import PropTypes            from 'prop-types';
import withStyles
                            from '@material-ui/core/styles/withStyles';
import { hot }              from 'react-hot-loader';

import { XMasonry, XBlock } from 'react-xmasonry/dist/index.js'; // Imports precompiled bundle

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
    return hikeData;
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
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://home.nps.gov/kefj/planyourvisit/images/KEFJ_web_2012_Miscellaneous_425_marmot_meadows_North_1.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {tile.str_name}
                    </Typography>
                    <Typography variant="subtitle1">
                      {tile.date_of_hike}
                    </Typography>
                    <Typography component="p">
                      {tile.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardactions}>
                  <Button size="small" color="primary">
                    Sign Up
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
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
