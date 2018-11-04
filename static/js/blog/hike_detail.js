import React from 'react'
import ReactDOM from 'react-dom'
import {resolve} from 'url';

import DataProvider from '../containers/DataProvider'
import Detail from '../containers/Detail'

function getPK(path_names)
{
    let path_array = path_names.split('/')

    return path_array[path_array.length - 2]
}

const api_link = resolve(window.location.origin, "/api/hike/")
const wrapper = document.getElementById('react')
const pathname = window.location.pathname

var api_pk = resolve(api_link, getPK(pathname))

const App = () => {
    return (
        <DataProvider endpoint={api_pk}
                      render={(data) => <Detail data={data} pathname={pathname}/>}/>
    )
}

wrapper ? ReactDOM.render(<App/>, wrapper) : null

module.hot.accept();