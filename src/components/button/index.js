import button from './button.hbs'
import './button.scss'

export default (buttonClass, text) => {
    return button({buttonClass, text})
};
