import HTTPTransport from "../utils/HTTPTransport";
import { ChatData, ChatsData } from "../type/interfaces";

export default class ChatsApi {
    protected http: HTTPTransport
    constructor() {
        this.http = new HTTPTransport('/chats');
    };

    public async createChat(data: ChatData, headers: object) {
        return this.http.post('', {data: data, headers: headers});
    };

    public async getChats(data: {}, headers: object) {
        return this.http.get('?limit=5', {data, headers: headers});
    };

    public async addUser(data: any, headers: object) {
        return this.http.put('/users', {data: data, headers: headers});
    };

    public async getUsersByChatId(id, headers: object) {
        return this.http.get(`/${id}/users`, {headers: headers});
    };

    public async getToken(id, headers:object) {
        return this.http.post(`/token/${id}`, {headers: headers});
    };

    public async changeAvatar(data: any) {
        return this.http.put('/avatar', {data: data});
    };

};
