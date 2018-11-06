import PropTypes from "prop-types";
import React, {Component} from "react";
import {resolve} from 'url';

import FieldRow from '../containers/FieldRow'


class Detail extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        // render: PropTypes.func.isRequired
    };

    render() {

        const {data} = this.props;

        let rows = [];
        let key_counter = 0
        for (const [field_tag, field_value] of Object.entries(data)) {
            rows.push(<FieldRow key={key_counter} tag={field_tag} value={field_value} />)
            key_counter ++;
        }

        return data === null ? (
            <p>This hike is not available!</p>
        ) : (
            <div>
                <h2>
                    {data.str_name}
                </h2>
                {rows}

            </div>
        )
    }
}

export default Detail