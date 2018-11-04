import React from 'react'
import ReactDOM from 'react-dom'
import {resolve} from 'url';

import DataProvider from '../containers/DataProvider'
import List from '../containers/List'


const api_link = resolve(window.location.origin, "/api/hikes/")
const wrapper = document.getElementById('react')

let hike_detail_link = 'hike_detail'

const App = () => (
    <DataProvider endpoint={api_link}
                  render={data => <List data={data} url_base={hike_detail_link}/>}/>
)

wrapper ? ReactDOM.render(<App/>, wrapper) : null


module.hot.accept();
