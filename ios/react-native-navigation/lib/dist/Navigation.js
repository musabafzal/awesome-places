"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NativeCommandsSender_1 = require("./adapters/NativeCommandsSender");
const NativeEventsReceiver_1 = require("./adapters/NativeEventsReceiver");
const UniqueIdProvider_1 = require("./adapters/UniqueIdProvider");
const Store_1 = require("./components/Store");
const ComponentRegistry_1 = require("./components/ComponentRegistry");
const Commands_1 = require("./commands/Commands");
const LayoutTreeParser_1 = require("./commands/LayoutTreeParser");
const LayoutTreeCrawler_1 = require("./commands/LayoutTreeCrawler");
const PrivateEventsListener_1 = require("./events/PrivateEventsListener");
const PublicEventsRegistry_1 = require("./events/PublicEventsRegistry");
const Element_1 = require("./adapters/Element");
class Navigation {
    constructor() {
        this.Element = Element_1.Element;
        this.store = new Store_1.Store();
        this.nativeEventsReceiver = new NativeEventsReceiver_1.NativeEventsReceiver();
        this.uniqueIdProvider = new UniqueIdProvider_1.UniqueIdProvider();
        this.componentRegistry = new ComponentRegistry_1.ComponentRegistry(this.store);
        this.layoutTreeParser = new LayoutTreeParser_1.LayoutTreeParser();
        this.layoutTreeCrawler = new LayoutTreeCrawler_1.LayoutTreeCrawler(this.uniqueIdProvider, this.store);
        this.nativeCommandsSender = new NativeCommandsSender_1.NativeCommandsSender();
        this.commands = new Commands_1.Commands(this.nativeCommandsSender, this.layoutTreeParser, this.layoutTreeCrawler);
        this.publicEventsRegistry = new PublicEventsRegistry_1.PublicEventsRegistry(this.nativeEventsReceiver);
        this.privateEventsListener = new PrivateEventsListener_1.PrivateEventsListener(this.nativeEventsReceiver, this.store);
        this.privateEventsListener.listenAndHandlePrivateEvents();
    }
    /**
     * Every navigation component in your app must be registered with a unique name. The component itself is a traditional React component extending React.Component.
     * @param {string} componentName Unique component name
     * @param {function} getComponentClassFunc generator function, typically `() => require('./myComponent')`
     */
    registerComponent(componentName, getComponentClassFunc) {
        this.componentRegistry.registerComponent(componentName, getComponentClassFunc);
    }
    /**
     * Reset the navigation stack to a new component (the stack root is changed).
     * @param {Root} root
     */
    setRoot(params) {
        return this.commands.setRoot(params);
    }
    /**
     * Set default options to all screens. Useful for declaring a consistent style across the app.
     * @param {options:Options} options
     */
    setDefaultOptions(options) {
        this.commands.setDefaultOptions(options);
    }
    /**
     * Change a components navigation options
     * @param {string} componentId The component's id.
     * @param {options:Options} options
     */
    setOptions(componentId, options) {
        this.commands.setOptions(componentId, options);
    }
    /**
     * Show a screen as a modal.
     * @param {object} params
     */
    showModal(params) {
        return this.commands.showModal(params);
    }
    /**
     * Dismiss a modal by componentId. The dismissed modal can be anywhere in the stack.
     * @param {string} componentId The component's id.
     */
    dismissModal(componentId) {
        return this.commands.dismissModal(componentId);
    }
    /**
     * Dismiss all Modals
     */
    dismissAllModals() {
        return this.commands.dismissAllModals();
    }
    /**
     * Push a new screen into this screen's navigation stack.
     * @param {string} componentId The component's id.
     * @param {Component} component
     */
    push(componentId, component) {
        return this.commands.push(componentId, component);
    }
    /**
     * Pop a component from the stack, regardless of it's position.
     * @param {string} componentId The component's id.
     * @param {*} params
     */
    pop(componentId, params) {
        return this.commands.pop(componentId, params);
    }
    /**
     * Pop the stack to a given component
     * @param {string} componentId The component's id.
     */
    popTo(componentId) {
        return this.commands.popTo(componentId);
    }
    /**
     * Pop the component's stack to root.
     * @param {*} componentId
     */
    popToRoot(componentId) {
        return this.commands.popToRoot(componentId);
    }
    /**
     * Show overlay on top of the window
     * @param {*} params
     */
    showOverlay(params) {
        return this.commands.showOverlay(params);
    }
    /**
     * dismiss overlay by componentId
     * @param {string} componentId
     */
    dismissOverlay(componentId) {
        return this.commands.dismissOverlay(componentId);
    }
    /**
     * Obtain the events registry instance
     */
    events() {
        return this.publicEventsRegistry;
    }
}
exports.Navigation = Navigation;
