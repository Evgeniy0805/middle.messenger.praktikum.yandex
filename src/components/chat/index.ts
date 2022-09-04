import chat from './chat.hbs';
import './chat.scss'
import Component from '../../utils/Component';

type ChatProps = {
    avatar: string,
    name: string,
    close: string,
    messages: object[],
    chatInput: object,
    sendIcon: string,
    attr: object,
    events: object
};

class Chat extends Component<ChatProps> {
    constructor(props: ChatProps) {
        super('div', props);
    };

    render() {
        return this.compile(chat, this.props);
    };
}

export default Chat;
