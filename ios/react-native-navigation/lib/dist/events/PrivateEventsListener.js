"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lifecycle_1 = require("../components/Lifecycle");
class PrivateEventsListener {
    constructor(nativeEventsReceiver, store) {
        this.nativeEventsReceiver = nativeEventsReceiver;
        this.lifecycle = new Lifecycle_1.Lifecycle(store);
    }
    listenAndHandlePrivateEvents() {
        this.nativeEventsReceiver.registerComponentDidAppear(this.lifecycle.componentDidAppear);
        this.nativeEventsReceiver.registerComponentDidDisappear(this.lifecycle.componentDidDisappear);
        this.nativeEventsReceiver.registerNavigationButtonPressed(this.lifecycle.onNavigationButtonPressed);
    }
}
exports.PrivateEventsListener = PrivateEventsListener;
