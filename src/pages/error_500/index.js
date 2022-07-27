import err from './err_500.hbs';
import './err_500.scss';
import button from '../../components/button/index';
import errIcon from '../../assets/icons/err404.svg';

const data = {
    button: button('button_err500', 'НАЗАД'),
    errIcon: errIcon
}

export default err(data);