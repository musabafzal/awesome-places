"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const react_native_1 = require("react-native");
const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
class OptionsProcessor {
    static processOptions(options) {
        _.forEach(options, (value, key) => {
            if (!value) {
                return;
            }
            if (_.isEqual(key, 'color') || _.endsWith(key, 'Color')) {
                options[key] = react_native_1.processColor(value);
            }
            if (_.isEqual(key, 'icon') || _.isEqual(key, 'image') || _.endsWith(key, 'Icon') || _.endsWith(key, 'Image')) {
                options[key] = resolveAssetSource(options[key]);
            }
            if (_.isObject(value) || _.isArray(value)) {
                OptionsProcessor.processOptions(value);
            }
        });
    }
}
exports.OptionsProcessor = OptionsProcessor;
