import React, {Component} from "react";
import PropTypes from "prop-types";

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
import DateAndTimePickers from './DateAndTimePickers';

import CSRFToken from './CSRFToken';
import Cookies from "js-cookie";

const styles = theme => ({
    // container: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    // },
    // textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
    //   width: 200,
    // },
});

class HikeRequestForm extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired
    };

    state = {
        'datetime_of_hike': '',
        'destination': '',
        'description': '',
        'difficulty': '',
        'want_to_lead': true,
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const context = this.state;
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
            .then(response => console.log(response))
    };

    render() {
        const {datetime_of_hike, destination, description, difficulty, want_to_lead} = this.state

        return (
            <React.Fragment>
                <CssBaseline/>

                <Paper>
                    <Typography component="h1" variant="h5">
                        Register for a Hike
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <CSRFToken />
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="datetime_of_hike">Date and Time of the Hike</InputLabel>
                            <DateAndTimePickers id="datetime_of_hike" onChange={this.handleChange} />
                        </FormControl>
                        {/*<FormControl margin="normal" required fullWidth>*/}
                        {/*<InputLabel htmlFor="datetime_of_hike"></InputLabel>*/}
                        {/*<DateAndTimePickers id="datetime_of_hike"/>*/}
                        {/*</FormControl>*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                        >
                            Request this hike
                        </Button>
                    </form>
                </Paper>

            </React.Fragment>
        )
    }
}

export default withStyles(styles)(HikeRequestForm)