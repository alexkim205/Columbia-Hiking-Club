import React from 'react'
import ReactDOM from 'react-dom'
import DataProvider from '../containers/DataProvider'
import List from '../containers/List'

const {resolve} = require('url');
const api_link = resolve(window.location.origin, "/api/hikes/")
console.log(api_link)
const wrapper = document.getElementById('react')

let hike_detail_link = 'hike_detail'

const App = () => (
    <DataProvider endpoint={api_link}
                  render={data => <List url_base={hike_detail_link} data={data}/>}/>
)

wrapper ? ReactDOM.render(<App/>, wrapper) : null


module.hot.accept();
