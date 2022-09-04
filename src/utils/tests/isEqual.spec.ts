import { expect } from "chai";
import isEqual from "../isEqual";

describe('Method isEqual', () => {

    it('Проверяем глубокое равенство двух объектов', () => {
        const a = {
            prop1: 1,
            prop2:
                {
                    prop3: 2,
                    prop4: 3
                }
        };
        const b = {
            prop1: 1,
            prop2:
                {
                    prop3: 2,
                    prop4: 3
                }
        }

        expect(a).to.deep.equal(b)
    });

    it('Проверяем глубокое равенство двух объектов', () => {
        const a = {
            prop1: 1,
            prop2:
                {
                    prop3: 2,
                    prop4: 3
                }
        };
        const b = {
            prop1: 1,
            prop2:
                {
                    prop3: 4,
                    prop4: 3
                }
        }

        expect(a).to.not.deep.equal(b)
    });

    it('Проверяем равенство двух объектов', () => {
        const a = undefined;
        const b = {
            prop1: 1,
            prop2:
                {
                    prop3: 4,
                    prop4: 3
                }
        }

        expect(a).to.not.deep.equal(b)
    });
});