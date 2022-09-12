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
import logoutIcon from '../../assets/icons/logout.svg'
import ChatMessage from '../../components/chatMessage';
import AuthController from '../../controllers/AuthController';
import ChatsController from '../../controllers/ChatsController';
import Router from '../../utils/Router';
import store, { StoreEvents } from '../../utils/Store';
import { renderDOM } from '../../utils/renderDOM';
import Config from '../../utils/config';

type ChatsProps = {
    logoutIcon: string,
    iconSrc: string,
    input: Input,
    chats: ChatPreview[],
    chat: Chat,
    attr: Record<'class', string>,
    events?: Record<'click', (e:Event) => void>
};

class Chats extends Component<ChatsProps>{

    constructor(props: ChatsProps) {
        super('section', props);

        store.on(StoreEvents.Updated, () => {
            const state: any = store.getState();
            if (state.currentUser.avatar && (this.props.iconSrc as any) != `${Config.resourcesUrl}${state.currentUser.avatar}`) {
                this.setProps({iconSrc: `${Config.resourcesUrl}${store.getState().currentUser?.avatar}`});
            };

            if (store.getState().chats) {
                const chats = store.getState().chats;
                chatList.splice(0, chatList.length);
                chats?.forEach(chat => {
                    let classAttr = 'chat-preview';
                    if (chat.id == store.getState().activeChat) {
                        classAttr = 'chat-preview chat-preview_active'
                    };
                    let time = '';
                    if (chat.last_message) {
                        const aTime = (chat.last_message.time.split('T'))[1].split('+')[0].split(':');
                        time = `${aTime[0]}:${aTime[1]}`
                    };
                    
                    let unreadCount: string | null = null;
                    if(chat.unread_count) {
                        unreadCount = chat.unread_count;
                    };
                    chatList.push(new ChatPreview({
                        iconSrc: `${Config.resourcesUrl}${store.getState().currentUser?.avatar}`,
                        title: chat.title,
                        lastMsg: chat.last_message?.content,
                        time: time,
                        number: unreadCount,
                        attr: {
                            class: `${classAttr}`,
                            'data-id': chat.id
                        },
                        events: {
                            click: async (e: Event) => {
                                const t = <HTMLElement>e.currentTarget;
                                const activeChatId = t.getAttribute('data-id');
                                store.set('activeChatId', activeChatId);
                                await ChatsController.getChats();
                                await ChatsController.getToken(Number(activeChatId));
                                let currentChat = {
                                    title: '',
                                    id: ''
                                };
                                const aChat = document.querySelectorAll('.chat-preview');
                                aChat.forEach( chat => {
                                    if (chat != t) {
                                        chat.classList.remove('chat-preview_active');
                                    };
                                });
                                const chats = store.getState().chats;
                                chats?.forEach(chat => {
                                    if (chat.id == activeChatId) {
                                        currentChat = chat;
                                    } 
                                });
                                t.classList.add('chat-preview_active');
                                await ChatsController.getUsersById(currentChat.id);
                                let avatarUrl = plusIcon;
                                if ((store.getState().users as object)[0].avatar && (store.getState().users as []).length > 1) {
                                    avatarUrl = `${Config.resourcesUrl}${(store.getState().users as object)[0].avatar}`;
                                }
                                chatArea.setProps({
                                    name: `${currentChat.title}  ${currentChat.id}`,
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
                const user = (store.getState().users as object)[0];
                console.log(user)
                chatArea.setProps({
                    name: `${user.first_name} ${user.second_name}`,
                    messagesList: messagesList,
                    avatar: `${Config.resourcesUrl}${user.avatar}`
                });
                const activeChat = document.querySelector<HTMLElement>(`[data-id='${store.getState().activeChatId}']`);
                activeChat?.classList.add('chat-preview_active');
                renderDOM('.chats__chat', chatArea);
                const msgList = document.querySelector<HTMLElement>('.chat__messages-list');
                if (msgList) {
                    msgList.scrollTop = msgList.scrollHeight;
                }  
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
    number: '0',
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
            const t = <HTMLElement>e.target;
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
            const t = <HTMLElement>e.target;
            const userID = document.querySelector<HTMLInputElement>('.input_empty-chat')?.value
            if (t && t.tagName === 'BUTTON') {
                await ChatsController.createChat(JSON.stringify({title: `Пользователь с id: ${userID}`}) as any);
                const currentChat = store.getState().currentChat?.id;
                await ChatsController.addUser(JSON.stringify({chatId: currentChat, users: [userID]}));
                await ChatsController.getUsersById(currentChat);
                const user: any = (store.getState().users as any)[0];
                chatArea.setProps({
                    name: `${user.first_name} ${user.second_name}`,
                    avatar: `${Config.resourcesUrl}${user.avatar}`
                });
                await ChatsController.getChats();
                await ChatsController.getToken(currentChat);
                store.set('activeChatId', currentChat);
                const curChat = document.querySelector('[data-id="'+store.getState().currentChat?.id+'"]');
                curChat?.classList.add('chat-preview_active');
                const inputField = document.querySelector<HTMLInputElement>('.input_empty-chat');
                if (inputField) {
                    inputField.value = '';
                }
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
            const t = <HTMLElement>e.target;
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