import ChatsApi from "../api/chatsApi";
import Router from "../utils/Router";
import store, { StoreEvents} from "../utils/Store";
import { ChatsData, UserData } from '../type/interfaces';
import isEqual from "../utils/isEqual";

class ChatsController {
    private _api: ChatsApi;
    private _socket: WebSocket | null

    constructor() {
        this._api = new ChatsApi();
        this._socket = null;
    };

    private send (data: Record<string, string>): void {
      this._socket?.send(JSON.stringify(data))
   }

    async createChat(chatsData: {title: 'string'}) {
        const response: any = await this._api.createChat(chatsData, {'Content-Type': 'application/json'});
        if (response.status == 200) {
            const currentChat = JSON.parse(response.response);
            store.set('currentChat', currentChat);
        }
    };

    async getChats() {
        const response: any = await this._api.getChats({}, {'Content-Type': 'application/json'});
        const chats = JSON.parse(response.response);
        store.set('chats', chats);
    };

    async addUser(chatsData: any) {
        const response: any = await this._api.addUser(chatsData, {'Content-Type': 'application/json'});
        console.log(response)
    };

    async getUsersById(id) {
        const response: any = await this._api.getUsersByChatId(id, {'Content-Type': 'application/json'});
        const users = JSON.parse(response.response);
        store.set('users', users);
    };

    async changeAvatar(data: any) {
      await this._api.changeAvatar(data);
    };

    async getToken(chatId) {
        const response: any = await this._api.getToken(chatId, {'Content-Type': 'application/json'});
        const token = JSON.parse(response.response);
        const state: any = store.getState();
        this._socket = new WebSocket(
            `wss://ya-praktikum.tech/ws/chats/${state.currentUser.id}/${chatId}/${token.token}`
        );

        this._socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this.send({
                content: '0',
                type: 'get old',
              })
          });

        this._socket.addEventListener("close", (event) => {
            if (event.wasClean) {
              console.log("Соединение закрыто чисто");
            } else {
              console.log("Обрыв соединения");
            }
      
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this._socket.addEventListener('message', async (event) => {
            const response = JSON.parse(event.data)
            if (Array.isArray(response)) {
              const currentMessages = store.getState().currentMessages;
              if (!currentMessages || !isEqual(currentMessages, response)) {
                store.set('currentMessages', response);
              }
            } else if (response.type === 'message') {
              this.send({
                  content: "0",
                  type: "get old",
                });
              };
           store.emit(StoreEvents.UpdatedMessages);
        });
    };

    async sendMessage(newMessage) {
        if (this._socket) {
          this.send({
              content: newMessage,
              type: "message",
            });
          this.send({
              content: "0",
              type: "get old",
            })
        }
    }
}

export default new ChatsController();