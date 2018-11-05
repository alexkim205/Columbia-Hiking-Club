import React from 'react'
import ReactDOM from 'react-dom'
import {resolve} from 'url';

import Form from '../containers/Form'


function getPK(path_names)
{
    let path_array = path_names.split('/')
    return path_array[path_array.length - 2]
}

const wrapper = document.getElementById('react')
var api_pk = resolve(window.location.origin, "/api/hike-request/", getPK(window.location.pathname))


const App = () => {
    return (
        <Form endpoint={api_pk}/>
    )
}
wrapper ? ReactDOM.render(<App/>, wrapper) : null


module.hot.accept();