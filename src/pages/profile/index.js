import profile from './profile.hbs';
import './profile.scss';
import Component from '../../utils/Component';
import Button from '../../components/button/index';
import ProfileItem from '../../components/profileItem/index';
import imgUrl from '../../assets/icons/iconProfile.svg'
import dataIcon from '../../assets/icons/changeDataIcon.svg';

class Profile extends Component {

    constructor(props) {
        super('section', props);
    };

    render() {
        return this.compile(profile, this.props);
    };
};

const profilePage = new Profile({
    src: imgUrl,
    title: 'Джеки Чан',
    dataList: [
        new ProfileItem({
            placeholder: 'ПОЧТА',
            text: 'email',
            editIcon: dataIcon,
            attr: {
                class: 'profileItem'
            }
        }),
        new ProfileItem({
            placeholder: 'ЛОГИН',
            text: 'Jacky',
            editIcon: dataIcon,
            attr: {
                class: 'profileItem'
            }
        }),
        new ProfileItem({
            placeholder: 'ИМЯ',
            text: 'Джеки',
            editIcon: dataIcon,
            attr: {
                class: 'profileItem'
            }
        }),
        new ProfileItem({
            placeholder: 'ФАМИЛИЯ',
            text: 'Чан',
            editIcon: dataIcon,
            attr: {
                class: 'profileItem'
            }
        }),
        new ProfileItem({
            placeholder: 'ТЕЛЕФОН',
            text: '+7-777-777-77-77',
            editIcon: dataIcon,
            attr: {
                class: 'profileItem'
            }
        }),
    ],
    buttons: [
        new Button({
            text: 'СОХРАНИТЬ',
            attr: {
                class: 'button button_profile'
            }
        }),
        new Button({
            text: 'ВЫЙТИ',
            attr: {
                class: 'button button_profile'
            }
        }),
    ],
    attr: {
        class: 'profile'
    }
});

export default profilePage;