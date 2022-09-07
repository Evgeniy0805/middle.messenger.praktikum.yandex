import emptyChat from './emptyChat.hbs';
import Button from '../button';
import './emptyChat.scss'
import Component from '../../utils/Component';

type EmptyChatProps = {
    title: string,
    subtitle: string,
    button: Button,
    attr?: Record<'class', string>,
    events?: Record<'click', (e:Event) => Promise<void>>
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
