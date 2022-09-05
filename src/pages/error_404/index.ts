import err from './err_404.hbs';
import './err_404.scss';
import Component from '../../utils/Component';
import Button from '../../components/button/index';
import errIcon from '../../assets/icons/err404.svg';

type ErrorProps = {
    errIcon: string,
    button: Button,
    attr: Record<'class', string>
};

class Error404 extends Component<ErrorProps> {

    constructor(props: ErrorProps) {
        super('section', props);
    };

    render() {
        return this.compile(err, this.props);
    };
};

const errorButton = new Button({
    text: 'НАЗАД',
    attr: {
        class: 'button button_err404'
    }
});

const error404Page = new Error404({
    button: errorButton,
    errIcon: errIcon,
    attr: {
        class: 'error404'
    }
});

export default error404Page;