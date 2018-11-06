import PropTypes from "prop-types";
import React, {Component} from "react";

const ArrayBullets = (props) => (
    <ul>
        {props.array.map(row => (
            <li key={row.id}>
                <a href={props.link(row.id)}>
                    {row.str_name}
                </a>
            </li>
        ))}
    </ul>
);

class HikeList extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        elmnt_link: PropTypes.func.isRequired
        // render: PropTypes.func.isRequired
    };

    state = {
        upcoming_hikes: [],
        past_hikes: []
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
        const {data, elmnt_link} = this.props;

        return !data.length ? (
            <p>No Hikes to show!</p>
        ) : (
            <div>
                <h2>
                    Upcoming hike(s)
                </h2>
                <ArrayBullets array={upcoming_hikes} link={elmnt_link}/>
                <h2>
                    Past hike(s)
                </h2>
                <ArrayBullets array={past_hikes} link={elmnt_link}/>
            </div>
        )
    }
}

export default HikeList