import chatPreview from './chatPreview.hbs'
import './chatPreview.scss'
import Component from '../../utils/Component';

type ChatPreviewProps = {
    iconSrc: string,
    title: string,
    lastMsg: string,
    time: string,
    number: string | null,
    attr: Record<'class', string> | Record<'class' | 'data-id', string>,
    events?: Record<'click', (e: Event) => Promise<void>>
};

class ChatPreview extends Component<ChatPreviewProps> {
    constructor(props: ChatPreviewProps) {
        super('div', props);
    };

    render() {
        return this.compile(chatPreview, this.props);;
    };

}

export default ChatPreview;
