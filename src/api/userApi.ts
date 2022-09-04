import HTTPTransport from "../utils/HTTPTransport";
import { RegData, PassData } from "../type/interfaces";

export default class UserApi {
    protected http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport('/user');
    };

    public changeProfile(data: RegData, headers: object) {
        return this.http.put('/profile', {data: data, headers: headers});
    };

    public changeAvatar(data: FormData, headers: object) {
        return this.http.put('/profile/avatar', {data: data, headers: headers});
    };

    public changePassword(data: PassData, headers: object) {
        return this.http.put('/profile/password', {data: data, headers: headers});
    };
}