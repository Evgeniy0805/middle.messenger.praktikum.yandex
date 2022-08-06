import { root } from './consts';
import { renderDOM } from './utils/renderDOM';
import authPage from './pages/auth/index';
import regPage from './pages/registration/index';
import chatsPage from './pages/chats/index';
import profilePage from './pages/profile/index';
import error404Page from './pages/error_404/index';
import error500Page from './pages/error_500/index';

window.addEventListener('DOMContentLoaded', () => {
    switch (location.pathname) {
        case '/':
            renderDOM('#root', authPage);
            break;
        case '/registration':
            renderDOM('#root', regPage);
            break;
        case '/chats':
            renderDOM('#root', chatsPage);
            break;
        case '/profile':
            renderDOM('#root', profilePage);
            break;
        case '/err500':
            renderDOM('#root', error500Page);
            break;
        case '/err404':
            renderDOM('#root', error404Page);
            break;
        default:
            renderDOM('#root', error404Page);
            break;
    };
});

