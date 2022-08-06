import chatMsg from './chatMessage.hbs';
import './chatMessage.scss';
import Component from '../../utils/Component';

class ChatMessage extends Component {
    constructor(props) {
        super('div', props);
    };

    render() {
        return this.compile(chatMsg, this.props);
    };
};

export default ChatMessage;