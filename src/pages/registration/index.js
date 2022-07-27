import reg from './registration.hbs';
import './registration.scss';
import form from '../../components/form/index'
import input from '../../components/input/index';
import button from '../../components/button/index'
import emailIcon from '../../assets/icons/email.svg';
import addUserIcon from '../../assets/icons/addUser.svg';
import phoneIcon from '../../assets/icons/phone.svg';
import passIcon from '../../assets/icons/pass.svg';


const data = {
    form: form(
      'РЕГИСТРАЦИЯ',
      [
        input(
          'input_registration',
          'text',
          'ПОЧТА',
          'email',
          emailIcon
        ),
        input(
          'input_registration',
          'text',
          'ЛОГИН',
          'login',
          addUserIcon
        ),
        input(
          'input_registration',
          'text',
          'ИМЯ',
          'first_name',
          addUserIcon
        ),
        input(
          'input_registration',
          'text',
          'ИМЯ',
          'second_name',
          addUserIcon
        ),
        input(
          'input_registration',
          'text',
          'ТЕЛЕФОН',
          'phone',
          phoneIcon
        ),
        input(
          'input_registration',
          'text',
          'ПАРОЛЬ',
          'password',
          passIcon
        ),
        input(
          'input_registration',
          'text',
          'ПАРОЛЬ (ЕЩЕ РАЗ)',
          'password_repeat',
          passIcon
        )
      ],
      button(
      'button_registration',
      'РЕГИСТРАЦИЯ'
    )
  )
};

export default reg(data);