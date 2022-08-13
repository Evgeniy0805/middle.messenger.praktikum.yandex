import form from "./form.hbs";
import './form.scss';
import Component from '../../utils/Component';

type FormProps = {
   title: string,
   inputs: object[],
   button: object,
   attr: object, 
   events: object
}

class Form extends Component<FormProps> {
    constructor(props: FormProps) {
        super('form', props);
    };

    render() {
        return this.compile(form, this.props);
    };
}

export default Form;
