import profile from './profile.hbs';
import './profile.scss';
import Component from '../../utils/Component';
import Button from '../../components/button/index';
import Input from '../../components/input';
import ProfileItem from '../../components/profileItem/index';
import imgUrl from '../../assets/icons/iconProfile.svg'
import dataIcon from '../../assets/icons/changeDataIcon.svg';
import { validateInput } from '../../utils/validation'

type ProfileProps = {
    src: string,
    title: string,
    dataList: object[],
    buttons: object[],
    attr: object
};

class Profile extends Component<ProfileProps> {

    constructor(props: ProfileProps) {
        super('section', props);
    };

    render() {
        return this.compile(profile, this.props);
    };
};

const emailInput = new Input({
    inputClass: 'input_profile',
    type: 'email',
    placeholder: 'email',
    inputName: 'email',
    inputIconClass: null,
    urlImg: null,
    attr: {
        class: 'input'
    },
    events: {
        input: (e: Event) => validateInput(e),
        focus: (e: Event) => validateInput(e),
        blur: (e: Event) => validateInput(e),
    }
});

const emailItem = new ProfileItem({
    placeholder: 'ПОЧТА',
    text: emailInput,
    editIcon: dataIcon,
    attr: {
        class: 'profile-item'
    }
});

const loginInput = new Input({
    inputClass: 'input_profile',
    type: 'text',
    placeholder: 'логин',
    inputName: 'login',
    inputIconClass: null,
    urlImg: null,
    attr: {
        class: 'input'
    },
    events: {
        input: (e: Event) => validateInput(e),
        focus: (e: Event) => validateInput(e),
        blur: (e: Event) => validateInput(e),
    }
});

const loginItem = new ProfileItem({
    placeholder: 'ЛОГИН',
    text: loginInput,
    editIcon: dataIcon,
    attr: {
        class: 'profile-item'
    }
});

const firstNameInput = new Input({
    inputClass: 'input_profile',
    type: 'text',
    placeholder: 'имя',
    inputName: 'firstName',
    inputIconClass: null,
    urlImg: null,
    attr: {
        class: 'input'
    },
    events: {
        input: (e: Event) => validateInput(e),
        focus: (e: Event) => validateInput(e),
        blur: (e: Event) => validateInput(e),
    }
});

const firstNameItem = new ProfileItem({
    placeholder: 'ИМЯ',
    text: firstNameInput,
    editIcon: dataIcon,
    attr: {
        class: 'profile-item'
    }
});

const secondNameInput = new Input({
    inputClass: 'input_profile',
    type: 'text',
    placeholder: 'фамилия',
    inputName: 'secondName',
    inputIconClass: null,
    urlImg: null,
    attr: {
        class: 'input'
    },
    events: {
        input: (e: Event) => validateInput(e),
        focus: (e: Event) => validateInput(e),
        blur: (e: Event) => validateInput(e),
    }
});

const secondNameItem = new ProfileItem({
    placeholder: 'ФАМИЛИЯ',
    text: secondNameInput,
    editIcon: dataIcon,
    attr: {
        class: 'profile-item'
    }
});

const phoneInput = new Input({
    inputClass: 'input_profile',
    type: 'text',
    placeholder: 'телефон',
    inputName: 'phone',
    inputIconClass: null,
    urlImg: null,
    attr: {
        class: 'input'
    },
    events: {
        input: (e: Event) => validateInput(e),
        focus: (e: Event) => validateInput(e),
        blur: (e: Event) => validateInput(e),
    }
});

const phoneItem = new ProfileItem({
    placeholder: 'ТЕЛЕФОН',
    text: phoneInput,
    editIcon: dataIcon,
    attr: {
        class: 'profile-item'
    }
});

const profileItems = [
    emailItem,
    loginItem,
    firstNameItem,
    secondNameItem,
    phoneItem
];

const profileInputs = [
    emailInput,
    loginInput,
    firstNameInput,
    secondNameInput,
    phoneInput
];

const profilePage = new Profile({
    src: imgUrl,
    title: 'Джеки Чан',
    dataList: profileItems,
    buttons: [
        new Button({
            text: 'СОХРАНИТЬ',
            attr: {
                class: 'button button_profile'
            },
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    const inputs = document.querySelectorAll('input');
                    const userData = {};
                    inputs.forEach(input => {
                        const inputName = input.name;
                        userData[inputName] = input.value;
                        input.value = '';
                    });
                    console.log(userData);
                }
            }
        }),
        new Button({
            text: 'ВЫЙТИ',
            attr: {
                class: 'button button_profile'
            },
            events: {
                click: (e: Event) => {
                    e.preventDefault();
                    window.location.href = '/chats';
                }
            }
        }),
    ],
    attr: {
        class: 'profile'
    }
});

export default profilePage;