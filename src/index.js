import { root } from './consts';
import auth from './pages/auth/index';
import reg from './pages/registration/index';
import chats from './pages/chats/index';
import profile from './pages/profile/index';
import err404 from './pages/error_404/index';
import err500 from './pages/error_500/index';

window.addEventListener('DOMContentLoaded', () => {
    switch (location.pathname) {
        case '/':
            root.innerHTML = auth;
            break;
        case '/registration':
            root.innerHTML = reg;
            break;
        case '/chats':
            root.innerHTML = chats;
            break;
        case '/profile':
            root.innerHTML = profile;
            break;
        case '/err500':
            root.innerHTML = err500;
            break;
        case '/err404':
            root.innerHTML = err404;
            break;
        default:
            root.innerHTML = err404;
            break;
    };
});

