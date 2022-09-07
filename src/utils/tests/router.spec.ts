import Router from "../Router";
import { expect } from "chai";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM('<main id="root1"></main>',
        { url: 'https://localhost:3000' });
        global.window = dom.window
        global.document = dom.window.document;

describe('Router', () => {

    it('Проверяем добавление роутов', () => {
        const router = new Router('#root');
        router
            .use('/', '')
            .use('/login', '')
            .use('/sign-up', '')
            .start();
        
        expect(router.routes.length).to.equal(3);
    });

    it('Проверяем переход по роуту', () =>{
        const router = new Router('#root');
        router
            .use('/', '')
            .use('/login', '')
            .start();

        router.go('/login');
        expect(window.location.pathname).to.equal('/login');
    }); 
})