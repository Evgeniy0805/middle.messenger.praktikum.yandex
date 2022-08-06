import chat from './chat.hbs';
import './chat.scss'
import Component from '../../utils/Component';

class Chat extends Component {
    constructor(props) {
        super('div', props);
    };

    render() {
        return this.compile(chat, this.props);
    };
}

export default Chat;
