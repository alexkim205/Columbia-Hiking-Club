import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from "react-router-dom";

import BaseContainer from '../containers/BaseContainer'
import DataProvider from '../containers/DataProvider'
import HikeList from '../containers/HikeList'
import LoginForm from "../containers/LoginForm";


const wrapper = document.getElementById('react');
const api_link = Urls['hike_list_api']();
const hike_detail_url = Urls['hike_detail'];
const hike_list_url = Urls['hike_list']();


const App = () => (
    <BaseContainer>
        <Route
            path={hike_list_url}
            render={(props) => <DataProvider endpoint={api_link}
                                             render={data => <HikeList {...props} data={data}
                                                                       elmnt_link={hike_detail_url}/>}/>}
        />

    </BaseContainer>

);

wrapper ? ReactDOM.render(<App/>, wrapper) : null;


module.hot.accept();
