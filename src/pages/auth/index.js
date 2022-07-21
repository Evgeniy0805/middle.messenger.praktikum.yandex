import auth from './auth.hbs';
import form from '../../components/form/index'
import input from '../../components/input/index';
import button from '../../components/button/index'
import userIcon from '../../assets/icons/user.svg'
import passIcon from '../../assets/icons/pass.svg'

const data = {
  form: form(
    'ВХОД',
    [
      input(
        'input_login',
        'text',
        'ПОЛЬЗОВАТЕЛЬ',
        'login',
        userIcon
      ),
      input(
        'input_login',
        'text',
        'ПАРОЛЬ',
        'password',
        passIcon
      )
    ],
    button('button_login', 'ВОЙТИ'),
  )
};

export default auth(data);
