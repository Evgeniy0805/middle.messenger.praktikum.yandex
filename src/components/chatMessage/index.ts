import chatMsg from './chatMessage.hbs';
import './chatMessage.scss';
import Component from '../../utils/Component';

type ChatMessageProps = {
    text: string,
    icon: string | null,
    time: string,
    attr: Record<'class', string>
};

class ChatMessage extends Component<ChatMessageProps> {
    constructor(props: ChatMessageProps) {
        super('div', props);
    };

    render() {
        return this.compile(chatMsg, this.props);
    };
};

export default ChatMessage;