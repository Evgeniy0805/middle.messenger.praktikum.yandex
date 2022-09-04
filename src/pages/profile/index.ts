import profile from './profile.hbs';
import './profile.scss';
import Component from '../../utils/Component';
import Button from '../../components/button/index';
import Input from '../../components/input';
import Popup from '../../components/popup';
import ProfileItem from '../../components/profileItem/index';
import imgUrl from '../../assets/icons/iconProfile.svg'
import closeIcon from '../../assets/icons/close.svg'
import dataIcon from '../../assets/icons/changeDataIcon.svg';
import { validateInput } from '../../utils/validation';
import store, { StoreEvents } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import Router from '../../utils/Router';

type ProfileProps = {
    src: string,
    title: string,
    dataList: object[],
    buttons: object[],
    popup: object,
    events: object,
    attr: object
};

class Profile extends Component<ProfileProps> {

    constructor(props: ProfileProps) {
        super('section', props);
        store.on(StoreEvents.Updated, () => {
            emailInput.setProps({placeholder: (store.getState().currentUser as any).email});
            loginInput.setProps({placeholder: (store.getState().currentUser as any).login});
            firstNameInput.setProps({placeholder: (store.getState().currentUser as any).first_name});
            secondNameInput.setProps({placeholder: (store.getState().currentUser as any).second_name});
            phoneInput.setProps({placeholder: (store.getState().currentUser as any).phone});
            const display_name = `${(store.getState().currentUser as any).first_name} ${(store.getState().currentUser as any).second_name}`;
            this.setProps({title: display_name});
            if ((store.getState().currentUser as any).avatar) {
                this.setProps({iconSrc: `https://ya-praktikum.tech/api/v2/resources/${(store.getState().currentUser as any).avatar}`});
            }
        });
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
    inputName: 'first_name',
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
    inputName: 'second_name',
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

const oldPasswordInput = new Input({
    inputClass: 'input_profile',
    type: 'text',
    placeholder: 'СТАРЫЙ ПАРОЛЬ',
    inputName: 'old_password',
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

const newPasswordInput = new Input({
    inputClass: 'input_profile',
    type: 'text',
    placeholder: 'НОВЫЙ ПАРОЛЬ',
    inputName: 'new_password',
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

const profilePage = new Profile({
    src: imgUrl,
    title: '',
    dataList: profileItems,
    popup: new Popup({
        closeIcon: closeIcon,
        inputs: [
            new Input({
                inputClass: 'input__item_popup',
                type: 'text',
                placeholder: 'СТАРЫЙ ПАРОЛЬ',
                inputName: 'oldPassword',
                inputIconClass: null,
                urlImg: null,
                attr: {
                    class: 'input input_popup'
                },
                events: {
                    input: (e: Event) => validateInput(e),
                    focus: (e: Event) => validateInput(e),
                    blur: (e: Event) => validateInput(e),
                }
            }),
            new Input({
                inputClass: 'input__item_popup',
                type: 'text',
                placeholder: 'НОВЫЙ ПАРОЛЬ',
                inputName: 'newPassword',
                inputIconClass: null,
                urlImg: null,
                attr: {
                    class: 'input input_popup'
                },
                events: {
                    input: (e: Event) => validateInput(e),
                    focus: (e: Event) => validateInput(e),
                    blur: (e: Event) => validateInput(e),
                }
            })
        ],
        button: new Button({
            text: 'СОХРАНИТЬ',
            attr: {
                class: 'button'
            },
            events: {
                click: (e:Event) => {
                    const inputs: NodeList | null = document.querySelectorAll('.input__item_popup');
                    let data = {
                        oldPassword: '',
                        newPassword: ''
                    };
                    inputs.forEach(input => {
                        const inputName = (input as HTMLInputElement).name;
                        if ((input as HTMLInputElement).value) {
                            data[inputName] = (input as HTMLInputElement).value;
                            (input as HTMLInputElement).value = '';
                        }
                    });
                    UserController.changePassword(data);
                }
            } 
        }),
        attr: {
            class: 'popup'
        },
        events: {
            click: (e: Event) => {
                const t = e.target;
                if (t && (t as HTMLElement).className === 'popup__close') {
                    const popup = document.querySelector('.popup');
                    popup?.setAttribute('style', 'display: none;');
                }
            }
        }
    }),
    buttons: [
        new Button({
            text: 'СМЕНИТЬ ПАРОЛЬ',
            attr: {
                class: 'button button_profile'
            },
            events: {
                click: (e: Event) => {
                    const popup: HTMLDivElement | null = document.querySelector('.popup');
                    popup?.setAttribute('style', 'display: block');
                }
            }
        }),
        new Button({
            text: 'СОХРАНИТЬ',
            attr: {
                class: 'button button_profile'
            },
            events: {
                click: async (e: Event) => {
                    e.preventDefault();
                    const inputs = document.querySelectorAll('input');
                    const userData: any = {};
                    inputs.forEach(input => {
                        const inputName = input.name;
                        if (input.value) {
                            userData[inputName] = input.value;
                            input.value = '';
                        } else {
                            userData[inputName] = input.placeholder;
                        }
                    });
                    userData.display_name = `${userData.first_name} ${userData.second_name}`
                    UserController.changeProfile(JSON.stringify(userData) as any);
                }
            }
        }),
        new Button({
            text: 'ВЫЙТИ',
            attr: {
                class: 'button button_profile'
            },
            events: {
                click: async (e: Event) => {
                    const router = new Router('#root');
                    router.go('/messenger');
                }
            }
        }),
    ],
    events: {
        change: async (e: Event) => {
            const t = e.target as HTMLInputElement;
            if (t && t.id === 'avatar') {
                const inputFile: HTMLInputElement | null = document.querySelector('#avatar');
                if (inputFile && inputFile.files) {
                    const formData: any = new FormData();
                    formData.append('avatar', inputFile.files[0]);
                    await UserController.changeAvatar(formData);
                };
                await AuthController.getUser();
                profilePage.setProps({src: `https://ya-praktikum.tech/api/v2/resources/${(store.getState().currentUser as any).avatar}`});
            };
        }
    },
    attr: {
        class: 'profile'
    }
});

export default profilePage;