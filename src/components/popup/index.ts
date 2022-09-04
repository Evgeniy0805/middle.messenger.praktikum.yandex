import popup from "./popup.hbs";
import './popup.scss'
import Component from '../../utils/Component';

type PopupProps = {
    closeIcon: string,
    inputs: object[],
    button: object,
    attr: object,
    events?: object
};

class Popup extends Component<PopupProps> {
    constructor(props: PopupProps) {
        super('div', props);
    };

    render() {
        return this.compile(popup, this.props);;
    };

}

export default Popup;