import Store, { StoreEvents } from "../Store";
import { expect } from "chai";

Store.on(StoreEvents.Updated, () => {});

describe('Store', () => {

    it('Метод set() устанавливает значение', () => {
        Store.set('test', 'value');
        const result = Store.getState().test;
        expect(result).to.equal('value');
    });
});