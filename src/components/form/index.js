import form from "./form.hbs";
import './form.scss';

export default (title, inputs, button) => {
    return form({title, inputs, button});
};