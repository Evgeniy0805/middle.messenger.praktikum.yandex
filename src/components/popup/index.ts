import popup from "./popup.hbs";
import './popup.scss'
import Component from '../../utils/Component';
import Input from '../input/index';
import Button from '../button/index';

type PopupProps = {
    closeIcon: string,
    inputs: Input[],
    button: Button,
    attr: Record<'class', string>,
    events?: Record<'click', (e:Event) => void>
};

class Popup extends Component<PopupProps> {
    constructor(props: PopupProps) {
        super('div', props);
    };

    render() {
        this.hide()
        return this.compile(popup, this.props);
    };

}

export default Popup;