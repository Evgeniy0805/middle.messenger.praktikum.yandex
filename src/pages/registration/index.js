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
import { validationExp, validateInput } from '../../utils/validation';

class Registration extends Component {
  constructor(props) {
    super('section', props);
  };

  render() {
    return this.compile(reg, this.props);
  };
}

const regPage = new Registration({
  form: new Form({
    title: 'РЕГИСТРАЦИЯ',
    inputs: [
      new Input({
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
          input: (e) => validateInput(e, validationExp.email.exp),
          focus: (e) => validateInput(e, validationExp.email.exp),
          blur: (e) => validateInput(e, validationExp.email.exp)
        }
      }),
      new Input({
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
          input: (e) => validateInput(e, validationExp.login.exp),
          focus: (e) => validateInput(e, validationExp.login.exp),
          blur: (e) => validateInput(e, validationExp.login.exp)
        }
      }),
      new Input({
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
          input: (e) => validateInput(e, validationExp.userName.exp),
          focus: (e) => validateInput(e, validationExp.userName.exp),
          blur: (e) => validateInput(e, validationExp.userName.exp)
        }
      }),
      new Input({
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
          input: (e) => validateInput(e, validationExp.userName.exp),
          focus: (e) => validateInput(e, validationExp.userName.exp),
          blur: (e) => validateInput(e, validationExp.userName.exp)
        }
      }),
      new Input({
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
          input: (e) => validateInput(e, validationExp.phone.exp),
          focus: (e) => validateInput(e, validationExp.phone.exp),
          blur: (e) => validateInput(e, validationExp.phone.exp)
        }
      }),
      new Input({
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
          input: (e) => validateInput(e, validationExp.password.exp),
          focus: (e) => validateInput(e, validationExp.password.exp),
          blur: (e) => validateInput(e, validationExp.password.exp)
        }
      }),
      new Input({
        inputClass: null,
        type: 'text',
        placeholder: 'ПАРОЛЬ (ЕЩЕ РАЗ)',
        inputName: 'password_repeat',
        inputIconClass: null,
        urlImg: passIcon,
        attr: {
          class: 'input input_registration'
        },
        events: {
          input: (e) => validateInput(e, validationExp.password.exp),
          focus: (e) => validateInput(e, validationExp.password.exp),
          blur: (e) => validateInput(e, validationExp.password.exp)
        }
      })
    ],
    button: new Button({
      text: 'РЕГИСТРАЦИЯ',
      attr: {
        class: 'button button_registration'
      }
    }),
    attr: {
      class: 'form'
    },
    events: {
      submit: (e) => {
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
  attr: {
    class: 'registration'
  }
});

export default regPage;