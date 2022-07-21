import Handlebars from 'handlebars';
import input from "./input.hbs";
import './input.scss'

Handlebars.registerPartial('input', input);

export default (inputWrap, type, placeholder, inputName, urlImg, inputClass, inputIconClass) => {
    return input({inputWrap, type, placeholder, inputName, urlImg, inputClass, inputIconClass});
};