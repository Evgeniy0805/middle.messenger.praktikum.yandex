import HTTPTransport from "../utils/HTTPTransport";
import { AuthData, RegData } from "../type/interfaces";

export default class AuthApi {
    protected http: HTTPTransport
    constructor() {
        this.http = new HTTPTransport('/auth');
    };

    public signIn(data: AuthData, headers: object) {
        return this.http.post('/signin', {data: data, headers: headers});
    };

    public signUp(data: RegData, headers: object) {
        return this.http.post('/signup', {data: data, headers: headers});
    };

    public getUser() {
        return this.http.get('/user', {});
    };

    public logout() {
        return this.http.post('/logout', {});
    };
};
