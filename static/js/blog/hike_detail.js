import React from 'react'
import ReactDOM from 'react-dom'
import {resolve} from 'url';

import BaseContainer from '../containers/BaseContainer'
import DataProvider from '../containers/DataProvider'
import Detail from '../containers/Detail'

function getPK(path_names) {
    let path_array = path_names.split('/')
    return path_array[path_array.length - 2]
}

const wrapper = document.getElementById('react')
const api_pk = Urls['hike_api'](getPK(window.location.pathname))


const App = () => {
    return (
        <BaseContainer>
            <DataProvider endpoint={api_pk}
                          render={(data) => <Detail data={data}/>}/>
        </BaseContainer>

    )
}

wrapper ? ReactDOM.render(<App/>, wrapper) : null

module.hot.accept();