export declare class NativeCommandsSender {
    private nativeCommandsModule;
    constructor();
    setRoot(layoutTree: object): any;
    setDefaultOptions(options: object): void;
    setOptions(componentId: string, options: object): void;
    push(onComponentId: string, layout: object): Promise<any>;
    pop(componentId: string, options: object): any;
    popTo(componentId: string): any;
    popToRoot(componentId: string): any;
    showModal(layout: object): Promise<any>;
    dismissModal(componentId: string): any;
    dismissAllModals(): any;
    showOverlay(layout: object): any;
    dismissOverlay(componentId: string): any;
}
