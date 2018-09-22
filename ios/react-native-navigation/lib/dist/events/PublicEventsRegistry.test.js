"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PublicEventsRegistry_1 = require("./PublicEventsRegistry");
const NativeEventsReceiver_mock_1 = require("../adapters/NativeEventsReceiver.mock");
describe('PublicEventsRegistry', () => {
    let uut;
    let nativeEventsReceiver;
    beforeEach(() => {
        nativeEventsReceiver = new NativeEventsReceiver_mock_1.NativeEventsReceiver();
        uut = new PublicEventsRegistry_1.PublicEventsRegistry(nativeEventsReceiver);
    });
    it('exposes onAppLaunch event', () => {
        const cb = jest.fn();
        uut.onAppLaunched(cb);
        expect(nativeEventsReceiver.registerAppLaunched).toHaveBeenCalledTimes(1);
        expect(nativeEventsReceiver.registerAppLaunched).toHaveBeenCalledWith(cb);
    });
    it('exposes navigationCommands events', () => {
        const cb = jest.fn();
        uut.navigationCommands(cb);
        expect(nativeEventsReceiver.registerNavigationCommands).toHaveBeenCalledTimes(1);
        expect(nativeEventsReceiver.registerNavigationCommands).toHaveBeenCalledWith(cb);
    });
    it('exposes componentLifecycle events', () => {
        const cb = jest.fn();
        uut.componentLifecycle(cb);
        expect(nativeEventsReceiver.registerComponentLifecycle).toHaveBeenCalledTimes(1);
        expect(nativeEventsReceiver.registerComponentLifecycle).toHaveBeenCalledWith(cb);
    });
});
