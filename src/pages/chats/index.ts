import chats from './chats.hbs';
import './chats.scss';
import Component from '../../utils/Component';
import Input from '../../components/input/index';
import ChatPreview from '../../components/chatPreview/index';
import Chat from '../../components/chat/index';
import profileIcon from '../../assets/icons/profile.svg';
import searchIcon from '../../assets/icons/search.svg';
import userIcon from '../../assets/icons/userIcon.svg';
import closeIcon from '../../assets/icons/close.svg';
import chatsIcon from '../../assets/icons/chatIcon.svg';
import sendIcon from '../../assets/icons/send.svg';
import ChatMessage from '../../components/chatMessage';

class Chats extends Component {

    constructor(props) {
        super('section', props);
    };

    render() {
        return this.compile(chats, this.props);
    };
};

const chatsPage = new Chats({
    iconSrc: profileIcon,
    input: new Input({
        inputClass: 'input_chats',
        type: 'text',
        placeholder: 'ПОИСК',
        inputName: 'search',
        inputIconClass: null,
        urlImg: searchIcon,
        attr: {
            class: 'input'
        }
    }),
    chats: [
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Теодор',
            lastMsg: 'Никогда не ошибается тот, кто ничего не делает',
            time: '10:00',
            number: 2,
            attr: {
                class: 'chat-preview chat-preview_active'
            }
        }),
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Стив',
            lastMsg: 'Мы находимся здесь, чтобы внести свой вклад в этот мир. Иначе зачем мы здесь?',
            time: '13:00',
            number: 5,
            attr: {
                class: 'chat-preview'
            }
        }),
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Джон',
            lastMsg: 'Музыка заводит сердца так, что пляшет и поёт тело. А есть музыка, с которой хочется поделиться всем, что наболело',
            time: '20:00',
            number: 5,
            attr: {
                class: 'chat-preview'
            },
        }),
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Генри',
            lastMsg: 'Если тебе тяжело, значит ты поднимаешься в гору. Если тебе легко, значит ты летишь в пропасть',
            time: '05:00',
            number: 3,
            attr: {
                class: 'chat-preview'
            },
        }),
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Брюс',
            lastMsg: 'Тренируйся с теми, кто сильнее. Не сдавайся там, где сдаются другие. И победишь там, где победить нельзя',
            time: '15:00',
            number: 7,
            attr: {
                class: 'chat-preview'
            },
        }),
    ],
    chat: new Chat({
        avatar: chatsIcon,
        name: 'Джеки Чан',
        close: closeIcon,
        messages: [
            new ChatMessage({
                text: 'Привет. Как дела?',
                icon: null,
                time: '15:35',
                attr: {
                    class: 'chat-message'
                }
            }),
            new ChatMessage({
                text: 'Ты тут?',
                icon: null,
                time: '17:35',
                attr: {
                    class: 'chat-message'
                }
            }),
            new ChatMessage({
                text: 'Никогда не ошибается тот, кто ничего не делает',
                icon: null,
                time: '18:15',
                attr: {
                    class: 'chat-message chat-message_my'
                }
            })
        ],
        chatInput: new Input({
            inputClass: 'input_chat',
            type: 'text',
            placeholder: 'ВВЕДИТЕ СООБЩЕНИЕ',
            inputName: 'message',
            inputIconClass: null,
            urlImg: null,
            attr: {
              class: 'input input_chat_wrapper'
            }
        }),
        date: '17 июля',
        sendIcon: sendIcon,
        attr: {
            class: 'chat'
        },
        events: {
            click: (e: Event) => {
                const t = e.target as HTMLElement;
                const msgInput = document.querySelector<HTMLInputElement>('.input_chat');
                if (t && t.tagName === 'IMG' && msgInput) {
                    if (msgInput.value.length === 0) {
                        msgInput.style.border = 'solid 1px red';
                    } else {
                        msgInput.style.border = 'solid 1px #D9D9D9';
                        console.log(msgInput.value)
                        msgInput.value = '';
                    }
                } 
            }
        }
    }),
    attr: {
        class: 'chats'
    }
});

export default chatsPage;