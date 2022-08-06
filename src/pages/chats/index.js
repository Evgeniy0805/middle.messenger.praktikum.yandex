import chats from './chats.hbs';
import './chats.scss';
import Component from '../../utils/Component';
import Input from '../../components/input/index';
import ChatPreview from '../../components/chatPreview/index';
import Chat from '../../components/chat/index';
import profileIcon from '../../assets/icons/profile.svg';
import searchIcon from '../../assets/icons/search.svg';
import userIcon from '../../assets/icons/userIcon.svg';

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
        inputClass: null,
        type: 'text',
        placeholder: 'ПОИСК',
        inputName: 'search',
        inputIconClass: null,
        urlImg: searchIcon,
        attr: {
            class: 'input input_chats'
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
                class: 'chatPreview'
            }
        }),
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Стив',
            lastMsg: 'Мы находимся здесь, чтобы внести свой вклад в этот мир. Иначе зачем мы здесь?',
            time: '13:00',
            number: 5,
            attr: {
                class: 'chatPreview'
            }
        }),
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Джон',
            lastMsg: 'Музыка заводит сердца так, что пляшет и поёт тело. А есть музыка, с которой хочется поделиться всем, что наболело',
            time: '20:00',
            number: 5,
            attr: {
                class: 'chatPreview'
            },
        }),
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Генри',
            lastMsg: 'Если тебе тяжело, значит ты поднимаешься в гору. Если тебе легко, значит ты летишь в пропасть',
            time: '05:00',
            number: 3,
            attr: {
                class: 'chatPreview'
            },
        }),
        new ChatPreview({
            iconSrc: userIcon,
            title: 'Брюс',
            lastMsg: 'Тренируйся с теми, кто сильнее. Не сдавайся там, где сдаются другие. И победишь там, где победить нельзя',
            time: '15:00',
            number: 7,
            attr: {
                class: 'chatPreview'
            },
        }),
    ],
    chat: new Chat({
        title: 'ЧАТ НЕ ВЫБРАН',
        attr: {
            class: 'chat'
        }
    }),
    attr: {
        class: 'chats'
    }
});

export default chatsPage;