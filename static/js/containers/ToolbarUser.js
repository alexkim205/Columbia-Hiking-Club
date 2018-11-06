import React, {Component} from "react"
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";

import DataProvider from "./DataProvider"


const current_user_api = Urls['current_user_api']();

const styles = theme => ({});

class ToolbarUser extends Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        is_authenticated: false,
        token: Cookies.get('token') || false,
        text: "Sign in"
    };

    componentDidMount() {
        // If user is logged in
        if (this.state.token) {
            this.setState({
                'is_authenticated': true,
                'text':
                    <DataProvider endpoint={current_user_api} render={data =>
                        <Typography variant="h3">
                            Hi {data.first_name}!
                        </Typography>
                    }/>
            })
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <div>
                    {this.state.text}
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ToolbarUser)