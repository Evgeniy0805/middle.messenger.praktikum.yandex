import Component from "../Component";
import { expect } from "chai";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM('<main id="root"></main>',
{ url: 'https://localhost:3000' });
global.window = dom.window;
global.document = dom.window.document;

describe('Component', () => {

    type TestProps = {
        props: any
    };

    const template = (props) => {
        return props;
    };

    class TestComponent extends Component<TestProps> {
        public constructor(props: TestProps) {
            super('div', props);
        };

        render() {
            return this.compile(template, this.props);
        };
    };

    const instanceComponent = new TestComponent({
        props: 'Props'
    });

    it('Метод getContent() возвращает строку', () => {
        const content = instanceComponent.getContent();
        expect(content).to.be.not.a('string');
    });

    
    it('Метод hide() скрывает компонент', () => {
        instanceComponent.hide();
        const element = instanceComponent.getContent();
        const result = element.style.display;
        expect(result).to.be.equal('none');
    });

    it('Метод show() скрывает компонент', () => {
        instanceComponent.show();
        const element = instanceComponent.getContent();
        const result = element.style.display;
        expect(result).to.be.equal('block');
    });

    it('Метод setProps() обновляет свойство компонента', () => {
        instanceComponent.setProps({props: 'newProps'});
        const result = instanceComponent.props.props;
        expect(result).to.be.equal('newProps');
    });
    
});