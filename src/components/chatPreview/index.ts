import chatPreview from './chatPreview.hbs'
import './chatPreview.scss'
import Component from '../../utils/Component';

class ChatPreview extends Component {
    constructor(props) {
        super('div', props);
    };

    render() {
        return this.compile(chatPreview, this.props);;
    };

}

export default ChatPreview;
