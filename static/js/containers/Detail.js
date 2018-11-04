import PropTypes from "prop-types";
import React from "react";

const Detail = ({data, pathname}) =>
    data == null ? (
        <p>The hike that you requested is not available!</p>
    ) : (
        <div>
            <h2>

            </h2>
        </div>
    )

Detail.propTypes = {
    data: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
}