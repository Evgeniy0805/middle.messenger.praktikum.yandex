import auth from './auth.hbs';
import './auth.scss';
import Form from '../../components/form/index'
import Input from '../../components/input/index';
import userIcon from '../../assets/icons/user.svg'
import passIcon from '../../assets/icons/pass.svg'
import Button from '../../components/button/index';
import Component from '../../utils/Component';
import { validateInput, validateSubmit } from '../../utils/validation';

type AuthProps = {
  form: object,
  attr: object,
  events?: object
}

class Auth extends Component<AuthProps>{
    constructor(props: AuthProps) {
        super('section', props);
    };

    render() {
        return this.compile(auth, this.props);
    };
}

const inputLogin = new Input({
  inputClass: null,
  type: 'text',
  placeholder: 'ПОЛЬЗОВАТЕЛЬ',
  inputName: 'userName',
  inputIconClass: null,
  urlImg: userIcon,
  attr: {
    class: 'input input_login'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const inputPassword = new Input({
  inputClass: null,
  type: 'text',
  placeholder: 'ПАРОЛЬ',
  inputName: 'password',
  inputIconClass: null,
  urlImg: passIcon,
  attr: {
    class: 'input input_login'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const inputsAuth = [
  inputLogin,
  inputPassword
];

const authForm = new Form({
  title: 'ВХОД',
  inputs: inputsAuth,
  button: new Button({
    text:  'ВОЙТИ',
    attr: {
      class: 'button button_login'
    }
  }),
  attr: {
    class: 'form'
  },
  events: {
    submit: (e: Event) => validateSubmit(e)
  }
});

const authPage = new Auth({
  form: authForm,
  attr: {
    class: 'login'
  }
});

export default authPage;