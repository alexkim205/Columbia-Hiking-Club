import React, {Component} from "react";
import PropTypes from "prop-types";

class Form extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired
    };

    state = {
        // fields
        formFields: [],
        formAnswers: {}

    };

    componentDidMount() {

        const context = {}

        this.setState({
            // formAnswers:
        })

    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault()
        const context = {[e.target.name]: e.target.value}
        const conf = {
            method: "post",
            body: JSON.stringify(context),
            headers: new Headers({"Content-Type": "application/json"})
        };
        fetch(this.props.endpoint, conf)
            .then(response => console.log(response))
    }

    render() {
        let fields = this.state.formFields.map((field) => {
            return (
                <input type="text" value={field.value}
                       onChange={this.handleChange} name={field.name}/>
            )
        });
        return (
            <div className="container">
                <form action="">
                    {fields}
                    <button onClick={this.handleSubmit.bind(this)}>Save</button>
                </form>
            </div>
        )

    }
}

export default Form