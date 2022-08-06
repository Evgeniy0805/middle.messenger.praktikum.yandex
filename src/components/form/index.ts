import form from "./form.hbs";
import './form.scss';
import Component from '../../utils/Component';

class Form extends Component {
    constructor(props) {
        super('form', props);
    };

    render() {
        return this.compile(form, this.props);
    };
}

export default Form;
