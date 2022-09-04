import reg from './registration.hbs';
import './registration.scss';
import Component from '../../utils/Component';
import Form from '../../components/form/index'
import Input from '../../components/input/index';
import Button from '../../components/button/index'
import emailIcon from '../../assets/icons/email.svg';
import addUserIcon from '../../assets/icons/addUser.svg';
import phoneIcon from '../../assets/icons/phone.svg';
import passIcon from '../../assets/icons/pass.svg';
import { validateInput, validateSubmit } from '../../utils/validation';
import AuthController from '../../controllers/AuthController';
import Router from '../../utils/Router';

type RegProps = {
  form: object,
  attr: object,
  events: object
};

class Registration extends Component<RegProps> {
  constructor(props: RegProps) {
    super('section', props);
  };

  render() {
    return this.compile(reg, this.props);
  };
};

const emailInput = new Input({
  inputClass: null,
  type: 'email',
  placeholder: 'ПОЧТА',
  inputName: 'email',
  inputIconClass: null,
  urlImg: emailIcon,
  attr: {
    class: 'input input_registration'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const loginInput = new Input({
  inputClass: null,
  type: 'text',
  placeholder: 'ЛОГИН',
  inputName: 'login',
  inputIconClass: null,
  urlImg: addUserIcon,
  attr: {
    class: 'input input_registration'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const firstNameInput = new Input({
  inputClass: null,
  type: 'text',
  placeholder: 'ИМЯ',
  inputName: 'first_name',
  inputIconClass: null,
  urlImg: addUserIcon,
  attr: {
    class: 'input input_registration'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const secondNameInput = new Input({
  inputClass: null,
  type: 'text',
  placeholder: 'ФАМИЛИЯ',
  inputName: 'second_name',
  inputIconClass: null,
  urlImg: addUserIcon,
  attr: {
    class: 'input input_registration'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const phoneInput = new Input({
  inputClass: null,
  type: 'text',
  placeholder: 'ТЕЛЕФОН',
  inputName: 'phone',
  inputIconClass: null,
  urlImg: phoneIcon,
  attr: {
    class: 'input input_registration'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const passInput = new Input({
  inputClass: null,
  type: 'text',
  placeholder: 'ПАРОЛЬ',
  inputName: 'password',
  inputIconClass: null,
  urlImg: passIcon,
  attr: {
    class: 'input input_registration'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const repeatPassInput = new Input({
  inputClass: null,
  type: 'text',
  placeholder: 'ПАРОЛЬ (ЕЩЕ РАЗ)',
  inputName: 'passwordRepeat',
  inputIconClass: null,
  urlImg: passIcon,
  attr: {
    class: 'input input_registration'
  },
  events: {
    input: (e: Event) => validateInput(e),
    focus: (e: Event) => validateInput(e),
    blur: (e: Event) => validateInput(e),
  }
});

const inputsReg = [
  emailInput,
  loginInput,
  firstNameInput,
  secondNameInput,
  phoneInput,
  passInput,
  repeatPassInput
]

const regButton = new Button({
  text: 'РЕГИСТРАЦИЯ',
  attr: {
    class: 'button button_registration'
  }
});

const regForm = new Form({
  title: 'РЕГИСТРАЦИЯ',
  inputs: inputsReg,
  button: regButton,
  attr: {
    class: 'form'
  },
  events: {
    submit: async (e: Event) => {
      e.preventDefault();
      try {
        const inputs = document.querySelectorAll('input');
        let firstPass = '';
        let secondPass = '';
        inputs.forEach(input => {
          if (input.name === 'password') {
            firstPass = input.value;
          };
          if (input.name === 'passwordRepeat') {
            secondPass = input.value;
          };
          if (firstPass && secondPass && firstPass != secondPass) {
            throw {
              msg: 'Пароли отличаются'
            }
          }
        });
        const userData = validateSubmit(e);
        userData.display_name = `${userData.first_name} ${userData.second_name}`;
        await AuthController.signUp(JSON.stringify(userData) as any);
      } catch({msg}) {
        alert(msg);
      } 
    }
  }
});

const regPage = new Registration({
  form: regForm,
  attr: {
    class: 'registration'
  },
  events: {
    click: (e: Event) => {
      const t = e.target as HTMLElement;
      if (t && t.className === 'registration__login-link') {
        const router = new Router('#root');
        router.go('/');
      };
    }
  }
});

export default regPage;