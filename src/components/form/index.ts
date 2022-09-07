import form from "./form.hbs";
import './form.scss';
import Component from '../../utils/Component';
import Input from '../input/index';
import Button from '../button/index';

type FormProps = {
   title: string,
   inputs: Input[],
   button: Button,
   attr: Record<'class', string>, 
   events: Record<'submit', (e: Event) => Promise<void>>
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
