import React from 'react'

const FieldRow = (props) => {

    const tag = props.tag;
    const value = props.value;
    return (
        <p><strong>{tag}: </strong>{value}</p>
    )
}

export default FieldRow