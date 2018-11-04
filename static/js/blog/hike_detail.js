import React from 'react'
import ReactDOM from 'react-dom'
import DataProvider from '../containers/DataProvider'
import Detail from '../containers/Detail'

const {resolve} = require('url');
const api_link = resolve(window.location.origin, "/api/hike/")
const wrapper = document.getElementById('react')
const pathname = window.location.pathname

const App = () => {
    return (
        <DataProvider endpoint={api_link}
                      render={(data) => {

                      }}/>
    )
}

wrapper ? ReactDOM.render(<App/>, wrapper) : null

module.hot.accept();