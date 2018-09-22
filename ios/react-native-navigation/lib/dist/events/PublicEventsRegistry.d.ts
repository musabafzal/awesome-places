export declare class PublicEventsRegistry {
    private nativeEventsReceiver;
    constructor(nativeEventsReceiver: any);
    onAppLaunched(callback: any): void;
    navigationCommands(callback: any): void;
    componentLifecycle(callback: any): void;
}
