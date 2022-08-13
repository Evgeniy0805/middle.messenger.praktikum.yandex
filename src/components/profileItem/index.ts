import profileItem from './profileItem.hbs';
import './profileItem.scss';
import Component from '../../utils/Component';

type ProfileItemProps = {
    placeholder: string,
    text: object,
    editIcon: string,
    attr: object
};

class ProfileItem extends Component<ProfileItemProps> {
    constructor(props: ProfileItemProps) {
        super('div', props);
    };

    render() {
        return this.compile(profileItem, this.props);
    };
}

export default ProfileItem;
