"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveExample = exports.getAnExample = exports.getAllExamples = exports.extractPath = void 0;
const glob_1 = __importDefault(require("glob"));
const fs_1 = __importDefault(require("fs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const _ = __importStar(require("lodash"));
const path_1 = __importDefault(require("path"));
// export const ContentType {
//   'application/octet-stream':,
//   JSON = 'application/json'
// }
function extractPath(original, match) {
    let params = {};
    let originalArray = original.split("/") || [];
    let matchArray = match.split("/") || [];
    if (matchArray.length !== originalArray.length)
        return null;
    for (let index = 0; index < matchArray.length; index++) {
        if (originalArray[index].startsWith("{") && originalArray[index].endsWith("}")) {
            const param = originalArray[index].substring(1, originalArray[index].length - 1);
            params[param] = matchArray[index];
        }
        else {
            if (matchArray[index] !== originalArray[index]) {
                return null;
            }
        }
    }
    return params;
}
exports.extractPath = extractPath;
function hasMatch(original, match, evalProps) {
    if (original === undefined || original === "*")
        return true;
    switch (typeof original) {
        case "object":
            if (Array.isArray(original)) {
                return isEqualArray(original, match, evalProps);
            }
            if (Object.prototype.hasOwnProperty.call(original, "eval")) {
                const { body, headers, query, urlParams } = evalProps; // needed for eval
                const lodash = _; //needed for eval
                return Boolean(eval(original["eval"]));
            }
            else {
                return isEqualObject(original, match, evalProps);
            }
        case "string":
            return _.isEqual(original, match);
        default:
            return _.isEqual(original, match);
    }
}
function isEqualArray(original = [], match = [], evalProps) {
    let equal = true;
    for (let i = 0; i < original.length; i++) {
        equal = hasMatch(original[i], match[i], evalProps);
        if (!equal)
            return equal;
    }
    return equal;
}
function isEqualObject(original, match, evalProps) {
    let equal = true;
    for (const key in original) {
        if (Object.prototype.hasOwnProperty.call(match, key)) {
            equal = hasMatch(original[key], match[key], evalProps);
            if (!equal)
                return equal;
        }
    }
    return equal;
}
function getAllExamples() {
    const examples = {};
    const files = glob_1.default.sync("examples/*.json", {});
    files.forEach((file) => {
        const fileSplit = file.replace(/\s+/g, "_").split("/");
        const filekey = fileSplit[1].split(".")[0];
        const ex = JSON.parse(fs_1.default.readFileSync(file, "utf-8"));
        const exArray = Array.isArray(ex) ? ex : [ex];
        examples[filekey] = exArray;
    });
    return examples;
}
exports.getAllExamples = getAllExamples;
function extractResponse(cachedExamplesObj, example, req) {
    try {
        let result = _.cloneDeep(example);
        if (result.mockPattern && result.mockPattern.resultFrom) {
            const resultFrom = _.get(cachedExamplesObj, result.mockPattern.resultFrom);
            if (!resultFrom)
                return result;
            const urlParams = extractPath(example.path, req.path);
            const lodash = _;
            const { body, headers, query } = req;
            switch (typeof result.mockPattern.mock) {
                case "string":
                    result.mock = eval(result.mockPattern.mock);
                    break;
                case "object":
                    if (_.isPlainObject(result.mockPattern.mock)) {
                        let mock = result.mockPattern.mock;
                        Object.entries(mock).forEach((k) => {
                            var _a;
                            if (_.isPlainObject(k[1]) && Object.prototype.hasOwnProperty.call(k[1], "eval")) {
                                mock[k[0]] = typeof k[1] !== "string" ? eval((_a = k[1]) === null || _a === void 0 ? void 0 : _a.eval) : k[1];
                            }
                        });
                        result.mock = mock;
                    }
                    break;
            }
        }
        return result;
    }
    catch (er) {
        console.error("Mock Pattern is in correct", example);
        console.error(er);
        return example;
    }
}
function hasRequestMatch(ex, req) {
    const { body, headers, query } = req;
    const urlParams = extractPath(ex.path, req.path);
    if (!urlParams)
        return false;
    const evalProps = {
        body,
        headers,
        query,
        urlParams,
    };
    const headerMatch = hasMatch(ex.headers, req.headers, evalProps);
    if (!headerMatch)
        return false;
    const queryMatch = hasMatch(ex.query, req.query, evalProps);
    if (!queryMatch)
        return false;
    const bodyMatch = hasMatch(ex.body, req.body, evalProps);
    if (!bodyMatch)
        return false;
    return true;
}
function getAnExample(cachedExamplesObj, allExamples, req) {
    const result = _.first(allExamples
        .filter((ex) => hasRequestMatch(ex, req))
        .sort((x, y) => ((x.weightage || 0) < (y.weightage || 0) ? 1 : -1)));
    return result && extractResponse(cachedExamplesObj, result, req);
}
exports.getAnExample = getAnExample;
function saveExample(file, data) {
    fs_extra_1.default.writeJSONSync(path_1.default.resolve("examples", `${file}.json`), data);
}
exports.saveExample = saveExample;
//# sourceMappingURL=utils.js.map