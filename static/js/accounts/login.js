import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {createBrowserHistory as createHistory} from "history";

import BaseContainer from '../containers/BaseContainer'
import LoginForm from '../containers/LoginForm'

const wrapper = document.getElementById('react');
const login_url = Urls['login']();
const endpoint_api = Urls['auth_login']();
const success_url = Urls['hike_list']();

var history = createHistory();
import HikeList from '../containers/HikeList'

const App = () => {
    return (
        <BaseContainer>

            <Route
                path={login_url}
                render={(props) => <LoginForm {...props}
                                              successpoint={success_url}
                                              endpoint={endpoint_api}/>}
            />
        </BaseContainer>
    )
};
wrapper ? ReactDOM.render(<App/>, wrapper) : null;


module.hot.accept();