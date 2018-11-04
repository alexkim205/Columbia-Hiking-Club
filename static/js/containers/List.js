import PropTypes from "prop-types";
import React from "react";

const List = ({data, url_base}) =>
    !data.length ? (
        <p>No Hikes to show!</p>
    ) : (
        <div>
            <h2>
                There are {data.length} hikes coming up.
            </h2>
            <ul>
                {data.map(row => (
                    <li key={row.id}>
                        <a href={Urls[url_base](row.id)}>
                            {row.str_name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )

List.propTypes = {
    data: PropTypes.array.isRequired,
    url_base: PropTypes.string.isRequired
}

export default List