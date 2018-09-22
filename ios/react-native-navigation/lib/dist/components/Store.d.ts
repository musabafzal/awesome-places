export declare class Store {
    private propsByComponentId;
    private componentsByName;
    private refsById;
    constructor();
    setPropsForComponentId(componentId: any, props: any): void;
    getPropsForComponentId(componentId: any): any;
    setOriginalComponentClassForName(componentName: any, ComponentClass: any): void;
    getOriginalComponentClassForName(componentName: any): any;
    setRefForComponentId(id: any, ref: any): void;
    getRefForComponentId(id: any): any;
    cleanId(id: any): void;
}
