const validationExp = {
    login: {
        exp: /(^[а-яё-]+)|(^[a-z-]+)/u
    },
    userName: {
        exp: /(^[А-ЯЁ]{1}[а-яё-]+)|(^[A-Z]{1}[a-z-]+)/u
    },
    password: {
        exp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,40}$/
    },
    phone: {
        exp: /^([+]{1})?[0-9]{11,15}$/
    },
    email: {
        exp: /^[a-zA-Z0-9_-]+[@][a-zA-Z]+[.][a-zA-Z]+/
    }
};

const validateInput = (e, exp) => {
    const t = e.target;
    if(!exp.test(t.value)) {
        t.style.border = 'solid 1px red'
    } else {
        t.style.border = 'solid 1px #D9D9D9'
    }
}

export { validationExp, validateInput };