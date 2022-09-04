import chats from './chats.hbs';
import './chats.scss';
import Component from '../../utils/Component';
import Input from '../../components/input/index';
import ChatPreview from '../../components/chatPreview/index';
import Chat from '../../components/chat/index';
import Button from '../../components/button';
import EmptyChat from '../../components/emptyChat/index';
import profileIcon from '../../assets/icons/profile.svg';
import searchIcon from '../../assets/icons/search.svg';
import userIcon from '../../assets/icons/userIcon.svg';
import closeIcon from '../../assets/icons/close.svg';
import chatsIcon from '../../assets/icons/chatIcon.svg';
import plusIcon from '../../assets/icons/plus.svg';
import sendIcon from '../../assets/icons/send.svg';
import checkedIcon from '../../assets/icons/checked.svg';
import logoutIcon from '../../assets/icons/logout.svg'
import ChatMessage from '../../components/chatMessage';
import AuthController from '../../controllers/AuthController';
import ChatsController from '../../controllers/ChatsController';
import Router from '../../utils/Router';
import store, { StoreEvents } from '../../utils/Store';
import { renderDOM } from '../../utils/renderDOM';
import UserController from '../../controllers/UserController';
import isEqual from '../../utils/isEqual';

type ChatsProps = {
    logoutIcon: string,
    iconSrc: string,
    input: object,
    chats: object[],
    chat: object,
    attr: object,
    events?: object
};

class Chats extends Component<ChatsProps>{

    constructor(props: ChatsProps) {
        super('section', props);

        store.on(StoreEvents.Updated, () => {
            const state: any = store.getState();
            if (state.currentUser.avatar && (this.props.iconSrc as any) != `https://ya-praktikum.tech/api/v2/resources/${state.currentUser.avatar}`) {
                this.setProps({iconSrc: `https://ya-praktikum.tech/api/v2/resources/${(store.getState().currentUser as any).avatar}`});
            };

            if (store.getState().chats) {
                const chats = store.getState().chats;
                chatList.splice(0, chatList.length);
                (chats as object[]).forEach(chat => {
                    let classAttr = 'chat-preview';
                    if ((chat as any).id == store.getState().activeChat) {
                        classAttr = 'chat-preview chat-preview_active'
                    };
                    let time = '';
                    if ((chat as any).last_message) {
                        time = ((chat as any).last_message?.time.split('T'))[1].split('+')[0].split(':');
                        time = `${time[0]}:${time[1]}`
                    };
                    
                    let unreadCount = null;
                    if((chat as any).unread_count) {
                        unreadCount = (chat as any).unread_count;
                    };
                    chatList.push(new ChatPreview({
                        iconSrc: `https://ya-praktikum.tech/api/v2/resources/${(store.getState().currentUser as any).avatar}`,
                        title: (chat as any).title,
                        lastMsg: (chat as any).last_message?.content,
                        time: time,
                        number: unreadCount,
                        attr: {
                            class: `${classAttr}`,
                            'data-id': (chat as any).id
                        },
                        events: {
                            click: async (e: Event) => {
                                const t = e.currentTarget as HTMLElement;
                                const activeChatId = t.getAttribute('data-id');
                                store.set('activeChatId', activeChatId);
                                await ChatsController.getChats();
                                await ChatsController.getToken(Number(activeChatId));
                                let currentChat = null;
                                const aChat = document.querySelectorAll('.chat-preview');
                                aChat.forEach( chat => {
                                    if (chat != t) {
                                        chat.classList.remove('chat-preview_active');
                                    };
                                });
                                const chats = store.getState().chats;
                                (chats as any).forEach(chat => {
                                    if (chat.id == activeChatId) {
                                        currentChat = chat;
                                    } 
                                });
                                t.classList.add('chat-preview_active');
                                await ChatsController.getUsersById((currentChat as any).id);
                                let avatarUrl = plusIcon;
                                if ((store.getState().users as any)[0].avatar && (store.getState().users as any).length > 1) {
                                    avatarUrl = `https://ya-praktikum.tech/api/v2/resources/${(store.getState().users as any)[0].avatar}`;
                                }
                                chatArea.setProps({
                                    name: `${(currentChat as any).title}  ${(currentChat as any).id}`,
                                    avatar: avatarUrl
                                });
                            }
                        }
                    }));
                })
                
                chatsPage.setProps({chats: chatList});
            };

            
        });
        store.on(StoreEvents.UpdatedMessages, async () => {
            messagesList.splice(0, messagesList.length);
                const currentMessages: any = store.getState().currentMessages;
                const currentUser: any = store.getState().currentUser;
                for (let i = currentMessages.length - 1; i >= 0; i--) {
                    let msgClassName = '';
                    if (currentMessages[i].user_id === currentUser.id) {
                        msgClassName = 'chat-message';
                    } else {
                        msgClassName = 'chat-message chat-message_my';
                    };
                    let time = (currentMessages[i].time.split('T'))[1].split('+')[0].split(':');
                    messagesList.push(new ChatMessage({
                        text: currentMessages[i].content,
                        icon: null,
                        time: `${time[0]}:${time[1]}`,
                        attr: {
                            class: msgClassName
                        }
                    }))
                };
                const user: any = (store.getState().users as object[])[0];
                console.log(user)
                chatArea.setProps({
                    name: `${user.first_name} ${user.second_name}`,
                    messagesList: messagesList,
                    avatar: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
                });
                const activeChat = document.querySelector(`[data-id='${store.getState().activeChatId}']`);
                (activeChat as any).classList.add('chat-preview_active');
                renderDOM('.chats__chat', chatArea);
                const msgList: HTMLElement | null = document.querySelector('.chat__messages-list');
                ((msgList as HTMLElement).scrollTop as any) = msgList?.scrollHeight;
        }) 
    };

    render() {
        return this.compile(chats, this.props);
    };
};

const searchInput = new Input({
    inputClass: 'input_chats',
    type: 'text',
    placeholder: 'ПОИСК',
    inputName: 'search',
    inputIconClass: null,
    urlImg: searchIcon,
    attr: {
        class: 'input'
    }
});

const chatPreview = new ChatPreview({
    iconSrc: userIcon,
    title: 'Пустой чат',
    lastMsg: '',
    time: '',
    number: 0,
    attr: {
        class: 'chat-preview'
    }
});

let chatList = [
    chatPreview
];

const messagesList: any = []

const messageInput = new Input({
    inputClass: 'input_chat',
    type: 'text',
    placeholder: 'ВВЕДИТЕ СООБЩЕНИЕ',
    inputName: 'message',
    inputIconClass: null,
    urlImg: null,
    attr: {
      class: 'input input_chat_wrapper'
    }
});

const chatArea = new Chat({
    avatar: chatsIcon,
    name: '',
    close: closeIcon,
    messages: messagesList,
    chatInput: messageInput,
    sendIcon: sendIcon,
    attr: {
        class: 'chat'
    },
    events: {
        click: async (e: Event) => {
            const t = e.target as HTMLElement;
            const msgInput = document.querySelector<HTMLInputElement>('.input_chat');
            if (t && t.tagName === 'IMG' && msgInput) {
                if (msgInput.value.length === 0) {
                    msgInput.style.border = 'solid 1px red';
                } else {
                    msgInput.style.border = 'solid 1px #D9D9D9';
                    await ChatsController.sendMessage(msgInput.value);
                    msgInput.value = '';
                };
            };
            if ( t && t.className === 'chat__close') {
                await ChatsController.getChats();
                renderDOM('.chats__chat', emptyChatArea);
            } ;
        }
    }
});

const emptyChatArea = new EmptyChat({
    title: ' ЧАТ НЕ ВЫБРАН',
    subtitle: 'СОЗДАТЬ ЧАТ С ПОЛЬЗОВАТЕЛЕМ ID:',
    button: new Button({
        text: 'СОЗДАТЬ',
        attr: {
            class: 'button'
        }
    }),
    attr: {
        class: 'empty-chat'
    },
    events: {
        click: async (e: Event) => {
            const t = e.target as HTMLElement;
            const userID = (document.querySelector('.input_empty-chat') as HTMLInputElement).value
            if (t && t.tagName === 'BUTTON') {
                await ChatsController.createChat(JSON.stringify({title: `Пользователь с id: ${userID}`}) as any);
                const currentChat = (store.getState().currentChat as any).id;
                await ChatsController.addUser(JSON.stringify({chatId: currentChat, users: [userID]}));
                await ChatsController.getUsersById(currentChat);
                const user: any = (store.getState().users as object[])[0];
                console.log(`https://ya-praktikum.tech/api/v2/resources/${user.avatar}`)
                chatArea.setProps({
                    name: `${user.first_name} ${user.second_name}`,
                    avatar: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
                });
                await ChatsController.getChats();
                await ChatsController.getToken(currentChat);
                store.set('activeChatId', currentChat);
                const curChat = document.querySelector('[data-id="'+(store.getState().currentChat as any).id+'"]');
                curChat?.classList.add('chat-preview_active');
                (document.querySelector('.input_empty-chat') as HTMLInputElement).value = '';
                renderDOM('.chats__chat', chatArea);
            }
        }
    }
})

const chatsPage = new Chats({
    logoutIcon: logoutIcon,
    iconSrc: profileIcon,
    input: searchInput,
    chats: chatList,
    chat: emptyChatArea,
    attr: {
        class: 'chats'
    },
    events: {
        click: async (e: Event) => {
            const t = e.target as HTMLElement;
            if (t && t.id === 'logoutIcon') {
                await AuthController.logout();
            };
            if (t && t.id === 'avatarIcon') {
                const router = new Router('#root');
                router.go('/settings');
            };
        }
    }
});

export default chatsPage;