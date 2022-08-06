import profile from './profile.hbs';
import './profile.scss';
import Component from '../../utils/Component';
import Button from '../../components/button/index';
import Input from '../../components/input';
import ProfileItem from '../../components/profileItem/index';
import imgUrl from '../../assets/icons/iconProfile.svg'
import dataIcon from '../../assets/icons/changeDataIcon.svg';
import { validateInput, validationExp } from '../../utils/validation'

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
            text: new Input({
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
                    input: (e: Event) => validateInput(e, validationExp.email.exp),
                    focus: (e: Event) => validateInput(e, validationExp.email.exp),
                    blur: (e: Event) => validateInput(e, validationExp.email.exp)
                }
            }),
            editIcon: dataIcon,
            attr: {
                class: 'profile-item'
            }
        }),
        new ProfileItem({
            placeholder: 'ЛОГИН',
            text: new Input({
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
                    input: (e: Event) => validateInput(e, validationExp.login.exp),
                    focus: (e: Event) => validateInput(e, validationExp.login.exp),
                    blur: (e: Event) => validateInput(e, validationExp.login.exp)
                }
            }),
            editIcon: dataIcon,
            attr: {
                class: 'profile-item'
            }
        }),
        new ProfileItem({
            placeholder: 'ИМЯ',
            text: new Input({
                inputClass: 'input_profile',
                type: 'text',
                placeholder: 'имя',
                inputName: 'first_name',
                inputIconClass: null,
                urlImg: null,
                attr: {
                    class: 'input'
                },
                events: {
                    input: (e: Event) => validateInput(e, validationExp.userName.exp),
                    focus: (e: Event) => validateInput(e, validationExp.userName.exp),
                    blur: (e: Event) => validateInput(e, validationExp.userName.exp)
                }
            }),
            editIcon: dataIcon,
            attr: {
                class: 'profile-item'
            }
        }),
        new ProfileItem({
            placeholder: 'ФАМИЛИЯ',
            text: new Input({
                inputClass: 'input_profile',
                type: 'text',
                placeholder: 'фамилия',
                inputName: 'second_name',
                inputIconClass: null,
                urlImg: null,
                attr: {
                    class: 'input'
                },
                events: {
                    input: (e: Event) => validateInput(e, validationExp.userName.exp),
                    focus: (e: Event) => validateInput(e, validationExp.userName.exp),
                    blur: (e: Event) => validateInput(e, validationExp.userName.exp)
                }
            }),
            editIcon: dataIcon,
            attr: {
                class: 'profile-item'
            }
        }),
        new ProfileItem({
            placeholder: 'ТЕЛЕФОН',
            text: new Input({
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
                    input: (e: Event) => validateInput(e, validationExp.phone.exp),
                    focus: (e: Event) => validateInput(e, validationExp.phone.exp),
                    blur: (e: Event) => validateInput(e, validationExp.phone.exp)
                }
            }),
            editIcon: dataIcon,
            attr: {
                class: 'profile-item'
            }
        }),
    ],
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