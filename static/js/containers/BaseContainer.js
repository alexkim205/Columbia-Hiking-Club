import React, {Component} from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {createBrowserHistory as createHistory} from "history";

import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import ToolbarUser from './ToolbarUser';
var history = createHistory();

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 14,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },

    },

})

class BaseContainer extends Component {
    state = {};

    render() {
        const {classes} = this.props;

        return (

            <React.Fragment>
                <CssBaseline/>
                <div>
                    {/* Navbar container */}
                    <AppBar>
                        <Toolbar>
                            <Typography component="h2" variant="h5" color="inherit" noWrap>
                                Columbia University Hiking Club
                            </Typography>
                            <ToolbarUser></ToolbarUser>
                        </Toolbar>

                    </AppBar>

                    {/* Main container */}
                    <main className={classes.layout}>
                        <BrowserRouter forceRefresh={true}>
                            <Switch>
                                {/*<Router history={history}>*/}
                                {this.props.children}

                                {/* blog.urls */}
                                {/*<Route path="/hikes/" exact component={HikeListRoute} />*/}
                                {/*<Route path="/hikes/:pk/" exact component={HikeRoute} />*/}
                                {/*<Route path="/hikes/request/" exact component={HikeRequestRoute} />*/}
                                {/*<Route path="/hikes/profile/" exact component={ProfileRoute} />*/}

                                {/* accounts.urls */}
                                {/*<Route path="/accounts/login" exact component={LoginRoute} />*/}
                                {/*<Route path="/accounts/logout" exact component={LogoutRoute} />*/}
                                {/*<Route path="/accounts/signup" exact component={RegisterRoute} />*/}
                            </Switch>
                        </BrowserRouter>
                        {/*</Router>*/}
                    </main>

                </div>
            </React.Fragment>


        )
    }
}

BaseContainer.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(BaseContainer)