import input from '../../components/input/index'
import chatPreview from '../../components/chatPreview/index'
import chat from '../../components/chat/index'
import profileIcon from '../../assets/icons/profile.svg';
import searchIcon from '../../assets/icons/search.svg';
import userIcon from '../../assets/icons/userIcon.svg'
import chats from './chats.hbs';
import './chats.scss'

const data = {
    iconSrc: profileIcon,
    input: input(
        'input_chats',
        'text',
        'ПОИСК',
        'search',
        searchIcon
    ),
    chats: [
        chatPreview(
            'Теодор',
            'Никогда не ошибается тот, кто ничего не делает',
            '10:00',
            '2',
            userIcon,
        ),
        chatPreview(
            'Стив',
            'Мы находимся здесь, чтобы внести свой вклад в этот мир. Иначе зачем мы здесь?',
            '13:00',
            '5',
            userIcon,
        ),
        chatPreview(
            'Джон',
            'Музыка заводит сердца так, что пляшет и поёт тело. А есть музыка, с которой хочется поделиться всем, что наболело',
            '20:00',
            '5',
            userIcon
        ),
        chatPreview(
            'Генри',
            'Если тебе тяжело, значит ты поднимаешься в гору. Если тебе легко, значит ты летишь в пропасть',
            '05:00',
            '3',
            userIcon
        ),
        chatPreview(
            'Брюс',
            'Тренируйся с теми, кто сильнее. Не сдавайся там, где сдаются другие. И победишь там, где победить нельзя',
            '15:00',
            '7',
            userIcon
        )
    ],
    chat: chat('ЧАТ НЕ ВЫБРАН')
};

export default chats(data);