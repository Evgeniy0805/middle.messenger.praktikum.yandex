import Router from './utils/Router';
import authPage from './pages/auth/index';
import regPage from './pages/registration/index';
import chatsPage from './pages/chats/index';
import profilePage from './pages/profile/index';
import error404Page from './pages/error_404/index';
import error500Page from './pages/error_500/index';

window.addEventListener('DOMContentLoaded', () => {
    
    const router = new Router('#root');

    router
        .use('/', authPage)
        .use('/sign-up', regPage)
        .use('/messenger', chatsPage)
        .use('/settings', profilePage)
        .use('/err500', error500Page)
        .use('/err404', error404Page)
        .start();
});

