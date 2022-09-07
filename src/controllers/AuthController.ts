import AuthApi from "../api/authApi";
import Router from "../utils/Router";
import { AuthData, RegData } from "../type/interfaces";
import store from "../utils/Store";
import ChatsController from "./ChatsController";

class AuthController {
    private _api: AuthApi;

    constructor() {
        this._api = new AuthApi();
    };

    async login(authData: AuthData) {
        const response: any = await this._api.signIn(authData, {'Content-Type': 'application/json'});
        if (response.status == 401) {
            alert('Некорректные логин или пароль')
        } else if (response.status == 200) {
            await this.getUser();
            const router = new Router('#root');
            router.go('/messenger');
            await ChatsController.getChats();
        }
    };

    async signUp(regData: RegData) {
        const response: any = await this._api.signUp(regData, {'Content-Type': 'application/json'});
        if (response.status == 200) {
            await this.getUser();
            const router = new Router('#root');
            router.go('/messenger');
            await ChatsController.getChats();
        }
    };

    async getUser() {
        const response: any = await this._api.getUser();
        if (response.status == 200) {
            const currentUser = JSON.parse(response.response);
            store.set('currentUser', currentUser);
        }
    };

    async logout() {
        const response: any = await this._api.logout();
        if (response.status == 200) {
            const router = new Router('#root');
            router.go('/');
        }
    };
};

export default new AuthController();