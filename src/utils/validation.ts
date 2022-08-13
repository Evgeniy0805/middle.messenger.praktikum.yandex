import { Exception } from "handlebars";

const validationExp = {
    login: {
        exp: /(^[а-яё-]+)|(^[a-z-]+)/u,
        msg: 'Логин может начинаться только с буквы'
    },
    userName: {
        exp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
        msg: 'Имя должно начинаться c большой буквы'
    },
    firstName: {
        exp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
        msg: 'Имя должно начинаться c большой буквы'
    },
    secondName: {
        exp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u,
        msg: 'Имя должно начинаться c большой буквы'
    },
    password: {
        exp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        msg: 'Пароль должен содержать минимум 1 большую букву и цифру'
    },
    passwordRepeat: {
        exp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        msg: 'Пароль должен содержать минимум 1 большую букву и цифру'
    },
    phone: {
        exp: /^([+]{1})?[0-9]{11,15}$/,
        msg: 'Телефон может содержать цифры и начинаться с +'
    },
    email: {
        exp: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/,
        msg: 'Формат почты ****@**.***'
    }
};

const validateInput = (e: Event): void => {
    const t: EventTarget | null = e.target;
    if (t && (t as HTMLInputElement).tagName === 'INPUT') {
        const exp = validationExp[(t as HTMLInputElement).name].exp;
        const check = exp.test((t as HTMLInputElement).value);
        const parent = (t as HTMLInputElement).parentElement;
        const inputChild: HTMLInputElement = (parent?.firstChild as HTMLInputElement);
        const inputChildCount: number | undefined = (parent?.childElementCount)
        if (inputChild.name === (t as HTMLInputElement).name) {
            if (!check) {
                (t as HTMLInputElement).classList.add('input__item_error');
                if (inputChildCount && inputChildCount < 3) {
                    parent?.append(createTooltip(validationExp[(t as HTMLInputElement).name].msg));
                }
            } else {
                (t as HTMLInputElement).classList.remove('input__item_error');
                if (inputChildCount && inputChildCount >= 3) {
                    parent?.lastChild?.remove();
                }
            }
            if (e.type === 'blur' && (t as HTMLInputElement).value.length === 0) {
                setTimeout(() => {(t as HTMLInputElement).classList.remove('input__item_error')}, 300);
                if (inputChildCount && inputChildCount >= 3) {
                    parent?.lastChild?.remove();
                }
            }
        };
    }
};

const validateSubmit = (e: Event): void => {
    e.preventDefault();
    const inputs = document.querySelectorAll('input');
    const userData = {};
    try {
        inputs.forEach(input => {
            if (!validationExp[input.name].exp.test(input.value)) {
                throw {
                    field: input.placeholder
                };
            } else {
                const inputName = input.name;
                userData[inputName] = input.value;
            }
        });
        inputs.forEach(input => {
            input.value = '';
        });
        console.log(userData);
    } catch({field}) {
        alert(`Введите корректные данные в поле "${field.toLowerCase()}"`)
    };
}

const createTooltip = (msg: string): HTMLElement => {
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
        padding: 5px;
        background-color: #fff;
        color: #000;
        font-size: 12px;
        position: absolute;
        left: 130%;
        right: -120%;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 5px;
        `;
    tooltip.innerHTML = msg;

    return tooltip;
}

export { validateInput, validateSubmit };