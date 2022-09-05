import chat from './chat.hbs';
import './chat.scss'
import Component from '../../utils/Component';
import ChatMessage from '../chatMessage/index';
import Input from '../input/index';

type ChatProps = {
    avatar: string,
    name: string,
    close: string,
    messages: ChatMessage[],
    chatInput: Input,
    sendIcon: string,
    attr: Record<'class', string>,
    events:Record<'click', (e: Event) => Promise<void>>
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
