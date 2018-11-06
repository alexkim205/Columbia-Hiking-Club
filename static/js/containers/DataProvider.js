import React, {Component} from "react";
import PropTypes from "prop-types";


class DataProvider extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired
    };

    state = {
        data: {},
        loaded: false,
        placeholder: "Loading..."
    };
    componentWillMount() {
        console.log("WILL MOUNT")
    }
    componentDidCatch() {
        console.log("DID CATCH")
    }
    componentDidUpdate() {
        console.log("DID UPDATE")
    }

    componentDidMount() {
        console.log("DID MOUNT")
        fetch(this.props.endpoint)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({placeholder: "Something went wrong"});
                }
                console.log(response)
                response.json().then(data => {
                    console.log(data);
                    this.setState({data: data, loaded: true});
                });
            })
            .catch(err => {
                console.log('Fetching error', err)
            })
    }

    render() {
        const {data, loaded, placeholder} = this.state;
        return loaded ? this.props.render(data) : <p>{placeholder}</p>;
    }
}

export default DataProvider;