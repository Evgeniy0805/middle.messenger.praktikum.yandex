import auth from './auth.hbs';
import './auth.scss';
import Form from '../../components/form/index'
import Input from '../../components/input/index';
import userIcon from '../../assets/icons/user.svg'
import passIcon from '../../assets/icons/pass.svg'
import Button from '../../components/button/index';
import Component from '../../utils/Component';
import { validationExp, validateInput } from '../../utils/validation';

class Auth extends Component {
    constructor(props) {
        super('section', props);
    };

    render() {
        return this.compile(auth, this.props);
    };
}

const authPage = new Auth({
  form: new Form({
    title: 'ВХОД',
    inputs: [
        new Input({
            inputClass: null,
            type: 'text',
            placeholder: 'ПОЛЬЗОВАТЕЛЬ',
            inputName: 'login',
            inputIconClass: null,
            urlImg: userIcon,
            attr: {
              class: 'input input_login'
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
            placeholder: 'ПАРОЛЬ',
            inputName: 'password',
            inputIconClass: null,
            urlImg: passIcon,
            attr: {
              class: 'input input_login'
            },
            events: {
              input: (e) => validateInput(e, validationExp.password.exp),
              focus: (e) => validateInput(e, validationExp.password.exp),
              blur: (e) => validateInput(e, validationExp.password.exp)
            }
        }),
    ],
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
    class: 'login'
  }
});

export default authPage;