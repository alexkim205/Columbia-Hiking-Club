import React from 'react'
import ReactDOM from 'react-dom'
import {resolve} from 'url';

import HikeRequestForm from '../containers/HikeRequestForm'
import BaseContainer from '../containers/BaseContainer'

function getPK(path_names) {
    let path_array = path_names.split('/');
    return path_array[path_array.length - 2]
}

const wrapper = document.getElementById('react');
const request_form_api = Urls['hike_request_form_api']();
const request_api = Urls['hike_request_api'](getPK(window.location.pathname))

const App = () => {
    return (
        <BaseContainer>
            <HikeRequestForm endpoint={request_form_api}/>
        </BaseContainer>

    )
}
wrapper ? ReactDOM.render(<App/>, wrapper) : null


module.hot.accept();