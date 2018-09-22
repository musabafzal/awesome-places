export declare class NativeEventsReceiver {
    private emitter;
    constructor();
    registerComponentDidAppear(callback: any): void;
    registerComponentDidDisappear(callback: any): void;
    registerAppLaunched(callback: any): void;
    registerNavigationCommands(callback: any): void;
    registerComponentLifecycle(callback: any): void;
    registerNavigationButtonPressed(callback: any): void;
}
