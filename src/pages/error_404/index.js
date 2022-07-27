import err from './err_404.hbs';
import './err_404.scss';
import button from '../../components/button/index';
import errIcon from '../../assets/icons/err404.svg';

const data = {
    button: button('button_err404', 'НАЗАД'),
    errIcon: errIcon
}

export default err(data);