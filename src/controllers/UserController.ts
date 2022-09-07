import UserApi from "../api/userApi";
import Router from "../utils/Router";
import { RegData, PassData } from "../type/interfaces";
import store from "../utils/Store";

class UserController {
    private _api: UserApi;

    constructor() {
        this._api = new UserApi();
    };

    async changeProfile(data: RegData) {
        const response: any = await this._api.changeProfile(data, {'Content-Type': 'application/json'});
        const currentUser = JSON.parse(response.response);
        store.set('currentUser', currentUser);
    };

    async changeAvatar(data: FormData) {
        await this._api.changeAvatar(data, {});
    };

    async changePassword(data: PassData) {
        const response: any = await this._api.changePassword(data, {'Content-Type': 'application/json'});
        console.log(response)
    };

};

export default new UserController();