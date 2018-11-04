import PropTypes from "prop-types";
import React, {Component} from "react";

class List extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        url_base: PropTypes.string.isRequired,
        // render: PropTypes.func.isRequired
    };

    state = {
        upcoming_hikes: [],
        past_hikes: [],
    };

    componentDidMount() {
        let today = new Date();
        let all_hikes = this.props.data.reverse()

        all_hikes.forEach(hike => {
            if (new Date(hike.date_of_hike) <= today) {
                this.setState(prevState => ({
                    past_hikes: [...prevState.past_hikes, hike]
                }))
            } else {
                this.setState(prevState => ({
                    upcoming_hikes: [...prevState.upcoming_hikes, hike]
                }))
            }
        });
    }

    render() {
        const {upcoming_hikes, past_hikes} = this.state;
        const {data, url_base} = this.props;

        return !data.length ? (
            <p>No Hikes to show!</p>
        ) : (
            <div>
                <h2>
                    Upcoming hike(s)
                </h2>
                <ul>
                    {upcoming_hikes.map(row => (
                        <li key={row.id}>
                            <a href={Urls[url_base](row.id)}>
                                {row.str_name}
                            </a>
                        </li>
                    ))}
                </ul>
                <h2>
                    Past hike(s)
                </h2>
                <ul>
                    {past_hikes.map(row => (
                        <li key={row.id}>
                            <a href={Urls[url_base](row.id)}>
                                {row.str_name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default List