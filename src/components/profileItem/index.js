import profileItem from './profileItem.hbs';
import './profileItem.scss';

export default (placeholder, text, editIcon) => {
    return profileItem({text, placeholder, editIcon});
};
