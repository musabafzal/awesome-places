"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
class NativeEventsReceiver {
    constructor() {
        this.emitter = new react_native_1.NativeEventEmitter(react_native_1.NativeModules.RNNEventEmitter);
    }
    registerComponentDidAppear(callback) {
        this.emitter.addListener('RNN.componentDidAppear', callback);
    }
    registerComponentDidDisappear(callback) {
        this.emitter.addListener('RNN.componentDidDisappear', callback);
    }
    registerAppLaunched(callback) {
        this.emitter.addListener('RNN.appLaunched', callback);
    }
    registerNavigationCommands(callback) {
        this.emitter.addListener('RNN.navigationCommands', callback);
    }
    registerComponentLifecycle(callback) {
        this.emitter.addListener('RNN.componentLifecycle', callback);
    }
    registerNavigationButtonPressed(callback) {
        this.emitter.addListener('RNN.navigationButtonPressed', callback);
    }
}
exports.NativeEventsReceiver = NativeEventsReceiver;
