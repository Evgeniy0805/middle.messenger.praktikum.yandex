import profileItem from './profileItem.hbs';
import './profileItem.scss';
import Component from '../../utils/Component';

class ProfileItem extends Component {
    constructor(props) {
        super('div', props);
    };

    render() {
        return this.compile(profileItem, this.props);
    };
}

export default ProfileItem;
