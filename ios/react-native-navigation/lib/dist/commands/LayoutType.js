"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutType;
(function (LayoutType) {
    LayoutType["Component"] = "Component";
    LayoutType["Stack"] = "Stack";
    LayoutType["BottomTabs"] = "BottomTabs";
    LayoutType["SideMenuRoot"] = "SideMenuRoot";
    LayoutType["SideMenuCenter"] = "SideMenuCenter";
    LayoutType["SideMenuLeft"] = "SideMenuLeft";
    LayoutType["SideMenuRight"] = "SideMenuRight";
    LayoutType["TopTabs"] = "TopTabs";
})(LayoutType = exports.LayoutType || (exports.LayoutType = {}));
function isLayoutType(name) {
    return !!LayoutType[name];
}
exports.isLayoutType = isLayoutType;
