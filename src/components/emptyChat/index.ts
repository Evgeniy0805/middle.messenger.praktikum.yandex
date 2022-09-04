import emptyChat from './emptyChat.hbs';
import './emptyChat.scss'
import Component from '../../utils/Component';

type EmptyChatProps = {
    title: string,
    subtitle: string,
    button: object,
    attr?: object,
    events?: object
};

class Chat extends Component<EmptyChatProps> {
    constructor(props: EmptyChatProps) {
        super('div', props);
    };

    render() {
        return this.compile(emptyChat, this.props);
    };
}

export default Chat;
