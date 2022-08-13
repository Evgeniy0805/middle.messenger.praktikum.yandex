import err from './err_500.hbs';
import './err_500.scss';
import Component from '../../utils/Component';
import Button from '../../components/button/index';
import errIcon from '../../assets/icons/err404.svg';

type ErrorProps = {
    errIcon: string,
    button: object,
    attr: object
};

class Error500 extends Component<ErrorProps> {
    constructor(props:ErrorProps) {
        super('section', props);
    };

    render() {
        return this.compile(err, this.props);
    };
}

const errorButton = new Button({
    text: 'НАЗАД',
    attr: {
        class: 'button button_err500'
    }
});

const error500Page = new Error500({
    button: errorButton,
    errIcon: errIcon,
    attr: {
        class: 'error500'
    }
});

export default error500Page;