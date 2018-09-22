export declare class Commands {
    private nativeCommandsSender;
    private layoutTreeParser;
    private layoutTreeCrawler;
    constructor(nativeCommandsSender: any, layoutTreeParser: any, layoutTreeCrawler: any);
    setRoot(simpleApi: any): any;
    setDefaultOptions(options: any): void;
    setOptions(componentId: any, options: any): void;
    showModal(simpleApi: any): any;
    dismissModal(id: any): any;
    dismissAllModals(): any;
    push(onComponentId: any, componentData: any): any;
    pop(componentId: any, options: any): any;
    popTo(componentId: any): any;
    popToRoot(componentId: any): any;
    showOverlay(componentData: any): any;
    dismissOverlay(componentId: any): any;
}
