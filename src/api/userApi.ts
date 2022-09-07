import HTTPTransport from "../utils/HTTPTransport";
import { RegData, PassData } from "../type/interfaces";

export default class UserApi {
    protected http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport('/user');
    };

    public async changeProfile(data: RegData, headers: object) {
        return this.http.put('/profile', {data: data, headers: headers});
    };

    public async changeAvatar(data: FormData, headers: object) {
        return this.http.put('/profile/avatar', {data: data, headers: headers});
    };

    public async changePassword(data: PassData, headers: object) {
        const dataPass = JSON.stringify(data);
        return this.http.put('/password', {data: dataPass, headers: headers});
    };
}