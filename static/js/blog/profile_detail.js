import React from 'react'
import ReactDOM from 'react-dom'

import BaseContainer from '../containers/BaseContainer'
import DataProvider from '../containers/DataProvider'
import List from '../containers/HikeList'


const wrapper = document.getElementById('react');
const api_link = Urls['hike_requests_api']();
let hike_detail_link = Urls['hike_request_api'];

const App = () => (
    <BaseContainer>
        <DataProvider endpoint={api_link}
                      render={data => <List data={data}
                                            elmnt_link={hike_detail_link}/>}/>
    </BaseContainer>

)

wrapper ? ReactDOM.render(<App/>, wrapper) : null


module.hot.accept();
