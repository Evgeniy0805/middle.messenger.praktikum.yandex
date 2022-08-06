## Описание

- **Настроена среда разработки;**
- **Подключены необходимые инструменты;**
- **Сверстаны основные страницы;**
- **Проект развернут на netlify;**
- **Внедрен TypeScript;**
- **Добавлен компонентный подход;**
- **Внедрены и настроены ESLint и Stylelint. Код проходит все проверки;**

---

## Ссылки:
- **[Макет Figma](https://www.figma.com/file/nWqRXj2Y0DQMlILIXWWhxk/web_messenger)**
- **[Проект на netlify](https://deploy--genuine-puffpuff-ab7d3c.netlify.app/)**

---

## Команды:

- `npm run dev` - запуск dev сервера;
- `npm run build` - сборка проекта;
- `npm run start` - запуск express.js сервера на 3000 порту;
- `npx stylelint "**/*.scss"` - проверка stylelint;

---

## Комментарии

+ Список путей:
  + "/";
  + "/registration";
  + "chats";
  + "profile";
  + "err404";
  + "err500".

+ Также переход можно осуществить следующим образом:
  + Ссылка "ЕЩЕ НЕ ЗАРЕГЕСТРИРОВАНЫ?" на стартовом экране ведет на страницу регистрации;
  + Ссылка "ВОЙТИ" на экране регистрации ведет к списку чатов;
  + Нажатие на аватар пользователя на странице чатов ведет на страницу профиля;
  + Кнопки "СОХРАНИТЬ" и "ВЫЙТИ" в профиле ведут на страницу со списком чатов;
  + Несуществующий путь ведет на страницу ошибки 404;
