"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutType_1 = require("./LayoutType");
describe.only('LayoutType', () => {
    it('is an enum', () => {
        expect(LayoutType_1.LayoutType.Component).toEqual('Component');
        expect(LayoutType_1.LayoutType.Stack).toEqual('Stack');
        const name = 'Stack';
        expect(LayoutType_1.LayoutType[name]).toEqual(LayoutType_1.LayoutType.Stack);
        expect(LayoutType_1.LayoutType['asdasd']).toEqual(undefined); //tslint:disable-line
    });
    it('isLayoutType', () => {
        expect(LayoutType_1.isLayoutType('')).toBe(false);
        expect(LayoutType_1.isLayoutType('asdasd')).toBe(false);
        expect(LayoutType_1.isLayoutType('TopTabs')).toBe(true);
        expect(LayoutType_1.isLayoutType('isLayoutType')).toBe(false);
    });
});
