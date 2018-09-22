"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lifecycle_1 = require("./Lifecycle");
const Store_1 = require("../components/Store");
describe('Lifecycle', () => {
    let store;
    let uut;
    let mockRef;
    beforeEach(() => {
        mockRef = {
            didAppear: jest.fn(),
            didDisappear: jest.fn(),
            onNavigationButtonPressed: jest.fn()
        };
        store = new Store_1.Store();
        store.setRefForComponentId('myUniqueId', mockRef);
        uut = new Lifecycle_1.Lifecycle(store);
    });
    describe('componentDidAppear', () => {
        it('calls didAppear on component ref from store', () => {
            uut.componentDidAppear('myUniqueId');
            expect(mockRef.didAppear).toHaveBeenCalledTimes(1);
        });
        it('skips undefined refs', () => {
            uut.componentDidAppear('myUniqueId2');
            expect(mockRef.didAppear).not.toHaveBeenCalled();
        });
        it('skips unimplemented didAppear', () => {
            mockRef = {};
            expect(mockRef.didAppear).toBeUndefined();
            store.setRefForComponentId('myUniqueId', mockRef);
            uut.componentDidAppear('myUniqueId');
        });
    });
    describe('componentDidDisappear', () => {
        it('calls didDisappear on component ref from store', () => {
            uut.componentDidDisappear('myUniqueId');
            expect(mockRef.didDisappear).toHaveBeenCalledTimes(1);
        });
        it('skips undefined refs', () => {
            uut.componentDidDisappear('myUniqueId2');
            expect(mockRef.didDisappear).not.toHaveBeenCalled();
        });
        it('skips unimplemented didDisappear', () => {
            mockRef = {};
            expect(mockRef.didDisappear).toBeUndefined();
            store.setRefForComponentId('myUniqueId', mockRef);
            uut.componentDidDisappear('myUniqueId');
        });
    });
    describe('onNavigationButtonPressed', () => {
        it('calls onNavigationButtonPressed on component ref from store', () => {
            uut.onNavigationButtonPressed({
                componentId: 'myUniqueId',
                buttonId: 'myButtonId'
            });
            expect(mockRef.onNavigationButtonPressed).toHaveBeenCalledTimes(1);
        });
        it('skips undefined refs', () => {
            uut.onNavigationButtonPressed('myButtonId');
            expect(mockRef.didDisappear).not.toHaveBeenCalled();
        });
        it('skips unimplemented onNavigationButtonPressed', () => {
            mockRef = {};
            expect(mockRef.onNavigationButtonPressed).toBeUndefined();
            store.setRefForComponentId('myUniqueId', mockRef);
            uut.componentDidAppear('myUniqueId');
        });
    });
});
