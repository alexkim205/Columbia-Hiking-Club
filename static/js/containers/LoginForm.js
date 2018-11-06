import React, {Component} from "react";
import {withRouter} from 'react-router';
import {Redirect, Route} from 'react-router-dom'

import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import compose from 'recompose/compose';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import CSRFToken from './CSRFToken';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
})


class LoginForm extends Component {

    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        successpoint: PropTypes.string.isRequired,
        classes: PropTypes.object
    }

    state = {
        'is_authenticated': false,
        'email': '',
        'password': '',
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        let context = this.state;
        let csrftoken = Cookies.get('csrftoken');

        const conf = {
            method: "post",
            body: JSON.stringify(context),
            headers: new Headers({
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            })
        };
        fetch(this.props.endpoint, conf)
            .then(response => {
                // save token to local store
                Cookies.set('token', response.key);

                // If response success, redirect to success_url
                if (response.ok) {
                    console.log(this.props);

                    this.props.history.push(this.props.successpoint);
                    console.log(this.props);
                    // this.setState({'is_authenticated': true});
                    // this.forceUpdate()
                    // // return <Redirect to={this.props.successpoint} />
                } else {
                    console.log(response)
                }
            })
    }

    render() {
        const {email, password} = this.state;
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <CSRFToken/>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email"
                                   name="email"
                                   autoComplete="email"
                                   onChange={this.handleChange}
                                   autoFocus/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password"
                                   name="password"
                                   type="password"
                                   onChange={this.handleChange}
                                   autoComplete="current-password"/>
                        </FormControl>
                        {/*<FormControlLabel*/}
                        {/*control={<Checkbox value="remember" color="primary" />}*/}
                        {/*label="Remember me"*/}
                        {/*/>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(LoginForm)
