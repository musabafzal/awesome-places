import { ComponentProvider } from 'react-native';
export declare class ComponentRegistry {
    private store;
    constructor(store: any);
    registerComponent(componentName: string, getComponentClassFunc: ComponentProvider): void;
}
