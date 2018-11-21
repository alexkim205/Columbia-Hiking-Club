import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { compose }          from 'redux';
import { Link, withRouter } from 'react-router-dom';
import classNames           from 'classnames';

import * as hike        from '../actions/hike';
import stringToImage    from '../helpers/stringToImage';
import stringToColor    from '../helpers/stringToColor';
import { prettifyDate } from '../helpers/prettifyDate';
import Loader           from './Loader';

import withStyles            from '@material-ui/core/styles/withStyles';
import Avatar                from '@material-ui/core/Avatar/Avatar';
import ExpandMoreIcon        from '@material-ui/icons/ExpandMore';
import StarBorder            from '@material-ui/icons/StarBorder';
import Typography            from '@material-ui/core/Typography/Typography';
import Circle                from '@material-ui/icons/FiberManualRecord';
import Paper                 from '@material-ui/core/Paper/Paper';
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider               from '@material-ui/core/Divider';
import List                  from '@material-ui/core/List';
import ListItem              from '@material-ui/core/ListItem';
import ListItemText          from '@material-ui/core/ListItemText';
import Button                from '@material-ui/core/Button';

const temphikedata = {
  'id': 53,
  'str_name': 'Alex\'s Hike to Disney World',
  'pub_date': '2018-11-05T08:02:17.572085Z',
  'date_of_hike': '2018-11-05T08:02:10Z',
  'destination': 'Disney World',
  'description': 'The Walt Disney World Resort, also called Walt Disney World and Disney World, is an entertainment complex in Bay Lake and Lake Buena Vista, Florida, in the United States, near the cities Orlando and Kissimmee. Opened on October 1, 1971, the resort is owned and operated by Walt Disney Parks, Experiences and Consumer Products, a division of The Walt Disney Company. It was first operated by Walt Disney World Company. The property covers nearly 25,000 acres (39 sq mi; 101 km2) and only half of it has been used,[2] comprises four theme parks, two water parks, twenty-seven themed resort hotels, nine non-Disney hotels, several golf courses, a camping resort, and other entertainment venues, including the outdoor shopping center Disney Springs.',
  'difficulty': 'EASY',
  'hike_leaders': [
    {
      'first_name': 'Alex',
      'last_name': 'Lee',
      'email': 'alexlee@gmail.com',
      'password': 'pbkdf2_sha256$120000$ghZXnlGZL4qK$35tvba0X2iLW3pg7iIWW5IyrauahBiNhlAdZ66sCUT0=',
      'school': 'CC',
      'phone_number': '+17187100555',
      'hikes': null,
      'interest_lead': null,
      'interest_drive': null,
    },
  ],
  'travel': 'VAN',
  'hikers': [
    {
      'first_name': 'Johnny',
      'last_name': 'Pak',
      'email': 'derp@derp.com',
      'password': 'pbkdf2_sha256$120000$UHL5dtscLx4i$AMb7q62QDfVm8s2mgHsCls2B37Zv4/nlGjQ84DBiEyY=',
      'school': 'CC',
      'phone_number': '+17187100555',
      'hikes': 53,
      'interest_lead': true,
      'interest_drive': null,
    },
    {
      'first_name': 'Alex',
      'last_name': 'Kim',
      'email': 'agk2144@columbia3.edu',
      'password': 'pbkdf2_sha256$120000$Pw2l7BHipyWe$BkpFKdMoi/v4TqSpuce2afH5NvP0HGXCnW6+rxMyX/I=',
      'school': 'VAN',
      'phone_number': '+17187100555',
      'hikes': 53,
      'interest_lead': true,
      'interest_drive': null,
    },
    {
      'first_name': 'Dick',
      'last_name': 'dick',
      'email': 'dick@dick.edu',
      'password': 'pbkdf2_sha256$120000$LpIqyPGx593W$xgELd4hn7Vs/YZBO5ZOLqJ0eZxwHf6afBy4cE6D1FW4=',
      'school': 'NONE',
      'phone_number': '+17187100555',
      'hikes': 53,
      'interest_lead': null,
      'interest_drive': null,
    },
  ],
};

const styles = theme => {
  return {
    hikeImage: {
      minHeight: 450,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      paddingTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 5,
      paddingLeft: theme.spacing.unit * 6,
      paddingRight: theme.spacing.unit * 6,
      alignItems: 'center',
      margin: '2em auto',
      maxWidth: 900,
    },
    paperTitle: {
      margin: '0em 0 1em 0',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2em',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5em',
      },
    },
    hikeTitle: {
      margin: '1em 0 0.5em 0',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.5em',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.6em',
      },
    },
    date: {
      marginBottom: '0.5em',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.3em',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '1em',
      },
    },
    description: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    },
    difficulty: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1em',
    },
    difficultySub: {
      margin: `auto ${theme.spacing.unit}px`,
      fontSize: '1.3em',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2em',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.9em',
      },
    },
    caption: {
      marginBottom: '0.5em',
      fontSize: '1.3em',
    },
    sub: {
      marginBottom: '1em',
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      // fontWeight: theme.typography.fontWeightMedium,
      margin: 'auto 1em',
    },
    details: {
      // paddingLeft: '3em',
      paddingTop: '1em',
      display: 'flex',
      justifyContent: 'space-around',
      [theme.breakpoints.down('xs')]: {
        flexWrap: 'wrap',
      },
    },
    detailColumn: {
      margin: '0 1.5em',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
      },
      [theme.breakpoints.down('xs')]: {
        flexBasis: '100%',
        textAlign: 'center',
        margin: '1em 1.5em',
      },
    },
    detailHeader: {
      fontWeight: theme.typography.fontWeightMedium,
      [theme.breakpoints.down('sm')]: {
        fontSize: '1em',
      },
    },
    detailBody: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.9em',
      },
    },
    easy: {
      color: '#4CAF50',
    },
    medium: {
      color: '#FF9800',
    },
    hard: {
      color: '#FF5252',
    },
    who: {
      // marginTop: theme.spacing.unit * 3,
      // marginBottom: theme.spacing.unit * 3,
    },
    leader: {
      // marginBottom: '3em!important',
    },
    spacer: {
      height: theme.spacing.unit * 4,
    },
    leaderBadge: {
      backgroundColor: '#FFC400',
    },
    button: {
      margin: theme.spacing.unit,
    },
  };
};

class HikeDetailPage extends Component {

  static defaultProps = {};

  componentDidMount () {
    const {id} = this.props.match.params; // ugly make prop
    this.props.getHike(id);
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    const {id} = this.props.match.params; // ugly make prop
    this.props.hikeRegister(id);
  };

  handleUnregister = (e) => {
    e.preventDefault();
    const {id} = this.props.match.params; // ugly make prop
    this.props.hikeUnregister(id);
  };

  state = {
    requestData: null,
    expanded: null,
  };

  render () {

    const {
      classes,
      isRegistered,
      requestData,
    } = this.props;

    if (requestData == null) {
      return (
        <React.Fragment>
          <Loader/>
        </React.Fragment>
      );
    }

    // const {classes} = this.props;
    // const requestData = temphikedata;

    const {expanded} = this.state;
    const {
      str_name, id, pub_date, destination, hike_leaders,
      date_of_hike, description, difficulty, hikers, travel,
    } = requestData;

    const readable_difficulty = difficulty.toLowerCase();
    const readable_travel = travel.toLowerCase();
    const readable_date = prettifyDate(date_of_hike);

    return (
      <React.Fragment>
        <Paper className={classNames(classes.paper, classes.hikeImage)}
               style={{
                 backgroundImage: `url(${stringToImage(destination)})`,
               }}
        />
        <Paper className={classes.paper}>
          {isRegistered ? (
            <div className={classes.difficulty}>
              <Button
                color="secondary"
                onClick={this.handleUnregister}
                className={classes.button}
              >
                Unregister from this hike.
              </Button>
            </div>
          ) : (
            <div className={classes.difficulty}>
              <Button
                color="primary"
                onClick={this.handleRegister}
                className={classes.button}
              >
                Register for this hike.
              </Button>
            </div>
          )}
        </Paper>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h3" className={classes.hikeTitle}>
            {str_name}
          </Typography>
          <Typography variant="h6" className={classes.date}>
            {readable_date}
          </Typography>
          <div className={classes.difficulty}>
            <Circle className={classNames(classes[readable_difficulty], classes.difficultySub)}/>
            <Typography variant="caption" className={classes.difficultySub}>
              This hike is <Link to="/difficulties">{readable_difficulty}</Link>
            </Typography>
          </div>
          <div className={classes.description}>
            <Typography variant="caption" className={classes.caption}>
              Description
            </Typography>
            <Typography variant="body1" className={classes.sub}>
              Trek with us to {destination}! We will be taking
              the <strong>{readable_travel}</strong> to get there. {description}
            </Typography>
          </div>
        </Paper>
        <Paper className={classes.paper}>
          <div className={classes.who}>
            <Typography component="h1" variant="h4" className={classes.paperTitle}>
              Who's leading the hike?
            </Typography>
            {hike_leaders && hike_leaders.map(hiker => (
              <ExpansionPanel
                className={classes.leader}
                defaultExpanded
                key={hiker.id}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Avatar className={classes.leaderBadge}>
                    <StarBorder/>
                  </Avatar>
                  <Typography className={classes.heading}>
                    {hiker.first_name} {hiker.last_name}
                  </Typography>
                  {/*<Typography className={classes.secondaryHeading}>{hiker.email}</Typography>*/}
                </ExpansionPanelSummary>
                <Divider/>
                <ExpansionPanelDetails className={classes.details}>

                  {/*<div className={classes.column}/>*/}
                  <div className={classes.detailColumn}>
                    <Typography variant="h6" className={classes.detailHeader}>Phone
                      number</Typography>
                    <Typography variant="body1"
                                className={classes.detailBody}>{hiker.phone_number}</Typography>
                  </div>
                  <div className={classNames(classes.detailColumn, classes.helper)}>
                    <Typography variant="h6" className={classes.detailHeader}>Email
                      address</Typography>
                    <Typography variant="body1"
                                className={classes.detailBody}>{hiker.email}</Typography>
                  </div>
                  <div className={classNames(classes.detailColumn, classes.helper)}>
                    <Typography variant="h6" className={classes.detailHeader}>Affiliated
                      School</Typography>
                    <Typography variant="body1"
                                className={classes.detailBody}>{hiker.school}</Typography>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
          <div className={classes.spacer}></div>
          <div className={classes.who}>
            {hikers.length != 0 ? (
              <React.Fragment>
                <Typography component="h1" variant="h4" className={classes.paperTitle}>
                  Who's signed up for it?
                </Typography>
                <List>
                  {hikers.map(hiker => (
                    <ListItem
                      key={hiker.id}
                    >
                      <Avatar style={
                        {
                          margin: 10,
                          color: '#fff',
                          backgroundColor: stringToColor(
                            `${hiker.first_name.charAt(0)}${hiker.last_name.charAt(0)}`),
                        }
                      }>
                        {`${hiker.first_name.charAt(0)}${hiker.last_name.charAt(0)}`}
                      </Avatar>
                      <ListItemText primary={`${hiker.first_name} ${hiker.last_name}`}/>
                    </ListItem>
                  ))}
                </List>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography component="h1" variant="h4" className={classes.paperTitle}>
                  No one has signed up for the hike yet.
                </Typography>
              </React.Fragment>
            )}

          </div>
        </Paper>
      </React.Fragment>
    );
  }

}

HikeDetailPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    requestData: state.hike.hike,
    isRegistered: state.hike.isRegistered,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHike: (id) => dispatch(hike.getHike(id)),
    hikeRegister: (id) => dispatch(hike.hikeRegister(id)),
    hikeUnregister: (id) => dispatch(hike.hikeUnregister(id)),
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(HikeDetailPage);
