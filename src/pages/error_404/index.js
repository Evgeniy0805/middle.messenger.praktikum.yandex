import err from './err_404.hbs';
import './err_404.scss';
import Component from '../../utils/Component';
import Button from '../../components/button/index';
import errIcon from '../../assets/icons/err404.svg';

class Error404 extends Component {

    constructor(props) {
        super('section', props);
    };

    render() {
        return this.compile(err, this.props);
    };
};

const error404Page = new Error404({
    button: new Button({
        text: 'НАЗАД',
        attr: {
            class: 'button button_err404'
        }
    }),
    errIcon: errIcon,
    attr: {
        class: 'error404'
    }
});

export default error404Page;