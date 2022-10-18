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
exports.mockResponseForOperation = exports.mockResponseHeaders = exports.mock = void 0;
const lodash_1 = __importStar(require("lodash"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const mockFolder = "./mocks";
fs_extra_1.default.ensureDirSync(mockFolder);
const array11 = [-1, 1];
const mockValues = fs_extra_1.default.pathExistsSync(path_1.default.join(mockFolder, "_mock.json"))
    ? fs_extra_1.default.readJsonSync(path_1.default.join(mockFolder, "_mock.json"))
    : {};
const mockKeys = Object.keys(mockValues);
const yn = ["y", "n"];
const tf = [true, false];
function* generateIndex(value) {
    let index = value;
    while (true) {
        yield index++;
    }
}
const cache = {};
function resolveAllOf(schema) {
    if (schema.allOf && schema.allOf[0]) {
        schema = lodash_1.default.reduce(schema.allOf, (combined, subschema) => lodash_1.default.merge({}, combined, resolveAllOf(subschema)), schema);
    }
    return schema;
}
function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}
const generateString = (myLength, type) => {
    let chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz _-1234567890";
    if (type === "x-amount" || type === "x-float")
        chars = "123456.7890";
    if (type === "x-number")
        chars = "1234567890";
    const randomArray = Array.from({ length: myLength }, () => chars[Math.floor(Math.random() * chars.length)]);
    const randomString = randomArray.join("");
    const randomDateInt = array11[Math.floor(Math.random() * array11.length)];
    if (type === "x-amount")
        return parseFloat(randomString).toFixed(2);
    if (type === "x-number")
        return parseInt(randomString);
    if (type === "x-float")
        return parseFloat(randomString);
    if (type === "x-date")
        return new Date(+new Date() + randomDateInt * Math.floor(Math.random() * 10000000000)).toJSON().substr(0, 10);
    if (type === "x-date-time")
        return new Date(+new Date() + randomDateInt * Math.floor(Math.random() * 10000000000)).toJSON();
    if (type === "x-past")
        return addDays(-1 * Math.floor(Math.random() * 5)).toJSON();
    if (type === "x-future")
        return addDays(Math.floor(Math.random() * 5)).toJSON();
    return randomString;
};
const constructCondition = (schema) => [
    { when: [], kind: (0, lodash_1.get)(schema, "x-type"), options: { size: (0, lodash_1.get)(schema, "x-size", 8) } },
];
let Index = generateIndex(0);
function mock(schema, props, isBody) {
    const lastProp = props[props.length - 1];
    // allOf, merge all subschemas
    schema = resolveAllOf(schema);
    // // use specified example
    // use default
    if ("x-example" in schema && schema["x-example"] !== undefined) {
        return schema["x-example"];
    }
    // use default
    if (schema.default !== undefined) {
        return schema.default;
    }
    // oneOf, use first
    if (schema.oneOf && schema.oneOf[0]) {
        return mock(schema.oneOf[0], props, isBody);
    }
    // anyOf, use first
    if (schema.anyOf && schema.anyOf[0]) {
        return mock(schema.anyOf[0], props, isBody);
    }
    // get type, use first if array
    const type = lodash_1.default.isArray(schema) ? lodash_1.default.first(schema.type) : schema.type;
    if (type === "object") {
        const obj = schema;
        const { properties } = obj;
        if (!properties) {
            return {};
        }
        return lodash_1.default.mapValues(properties, (p, k) => mock(p, [...props, k], isBody));
    }
    if (type === "array") {
        Index = generateIndex(0);
        const array = schema;
        const items = array.items;
        if (!items) {
            return [];
        }
        const examples = [];
        let example = ((items.oneOf && items.oneOf[0]) || items);
        if (items.anyOf) {
            // include one of each example for anyOf and allOf
            for (const option of items.anyOf) {
                example = option;
                examples.push(mock(example, props, isBody));
            }
        }
        // if minItems is set make sure we have at least that many items
        const minItems = isBody ? 1 : array.minItems || 1;
        while (examples.length < minItems) {
            examples.push(mock(example, props, isBody));
        }
        // limit to max items if applicable
        return array.maxItems ? lodash_1.default.take(examples, array.maxItems) : examples;
    }
    if (lodash_1.default.isArray(schema.enum)) {
        return schema.enum[Math.floor(Math.random() * schema.enum.length)];
    }
    if ("x-enum" in schema && lodash_1.default.isArray(schema["x-enum"])) {
        return schema["x-enum"][Math.floor(Math.random() * schema["x-enum"].length)];
    }
    if (isBody) {
        return "*";
    }
    if (mockKeys.includes(lastProp) || "x-type" in schema) {
        const conditions = "x-type" in schema ? constructCondition(schema) : (0, lodash_1.get)(mockValues, lastProp, []);
        let iterator = (0, lodash_1.first)(conditions.filter((y) => props.some((x) => y === null || y === void 0 ? void 0 : y.when.includes(x))));
        if (!iterator)
            iterator = (0, lodash_1.first)(conditions.filter((y) => y.when.length === 0));
        if (iterator) {
            const { when, kind, options } = iterator;
            if (props.some((x) => when.includes(x)) || when.length === 0) {
                switch (kind) {
                    case "x-string":
                    case "x-amount":
                    case "x-number":
                    case "x-float":
                    case "x-date":
                    case "x-date-time":
                    case "x-past":
                    case "x-future":
                        return generateString((0, lodash_1.get)(options, "size", 8), kind);
                    case "x-index":
                        return Index.next().value;
                    case "x-yesno":
                        return yn[Math.floor(Math.random() * yn.length)];
                    case "x-bool":
                        return tf[Math.floor(Math.random() * yn.length)];
                    case "x-unique":
                        const existing = (0, lodash_1.get)(cache, lastProp, []);
                        const ind = existing.length;
                        existing.push(ind);
                        cache[lastProp] = existing.length === options.length ? [] : existing;
                        return options[ind];
                    case "x-random":
                        return options[Math.floor(Math.random() * options.length)];
                }
            }
        }
    }
    if (type === "string") {
        const { format, example } = schema;
        const randomDateInt = array11[Math.floor(Math.random() * array11.length)];
        const formatExamples = {
            email: "user@example.com",
            hostname: "example.com",
            ipv4: "8.8.8.8",
            ipv6: "2001:4860:4860::8888",
            uri: "https://example.com/path",
            "uri-reference": "/path#anchor",
            "uri-template": "/path/{param}",
            "json-pointer": "/foo/bar",
            "date-time": new Date(+new Date() + randomDateInt * Math.floor(Math.random() * 10000000000)).toJSON(),
            date: new Date(+new Date() + randomDateInt * Math.floor(Math.random() * 10000000000)).toJSON().substr(0, 10),
            uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            binary: "UmVzcG9uc2UgZnJvbSBPcGVuQVBJTW9jayBUb29sCkJ5IE1hbGFzYW5pCg==",
            _default: "string",
        };
        const maxlnByte = !lodash_1.default.isNil(schema.maxLength) ? schema.maxLength : 8;
        const defaultString = generateString(maxlnByte);
        const val = formatExamples[format] || defaultString;
        const minln = !lodash_1.default.isNil(schema.minLength) ? schema.minLength : 0;
        const maxln = !lodash_1.default.isNil(schema.maxLength) ? schema.maxLength : val.length;
        if (val === formatExamples._default && val.length < minln) {
            return lodash_1.default.padEnd(val, minln, val);
        }
        const autoExample = schema["x-auto"] ? defaultString : example;
        return example ? autoExample : val.substr(0, lodash_1.default.clamp(val.length, minln, maxln));
    }
    if (type === "number") {
        let min = schema.minimum ? schema.minimum : -Math.floor(Math.random() * 10000000);
        let max = schema.maximum ? schema.maximum : Math.floor(Math.random() * 10000000);
        if (schema.multipleOf) {
            min = Math.ceil(min / schema.multipleOf) * schema.multipleOf;
            max = Math.floor(max / schema.multipleOf) * schema.multipleOf;
        }
        return schema.example ? schema.example : Math.floor(Math.random() * 1000);
    }
    if (type === "integer") {
        const schemaMin = schema.minimum && schema.exclusiveMinimum ? schema.minimum + 1 : schema.minimum;
        const schemaMax = schema.maximum && schema.exclusiveMaximum ? schema.maximum - 1 : schema.maximum;
        let min = !lodash_1.default.isNil(schemaMin) ? schemaMin : Number.MIN_SAFE_INTEGER;
        let max = !lodash_1.default.isNil(schemaMax) ? schemaMax : Number.MAX_SAFE_INTEGER;
        if (schema.multipleOf) {
            min = Math.ceil(min / schema.multipleOf) * schema.multipleOf;
            max = Math.floor(max / schema.multipleOf) * schema.multipleOf;
        }
        return schema.example ? schema.example : lodash_1.default.clamp(0, min, max);
    }
    if (type === "null") {
        return null;
    }
    if (type === "boolean") {
        return [true, false][Math.floor(Math.random() * 2)];
    }
    // unknown type
    return schema.example ? schema.example : {};
}
exports.mock = mock;
function mockResponseHeaders(headers, props) {
    if (headers && typeof headers === "object") {
        return Object.entries(headers).reduce((a, c) => {
            a[c[0]] = mock(c[1].schema, [...props, c[0]]);
            return a;
        }, {});
    }
    return "*";
}
exports.mockResponseHeaders = mockResponseHeaders;
function mockResponseForOperation(c) {
    let status = 200;
    const operationId = c.operation.operationId;
    const operation = c.api.router.getOperation(operationId);
    const { responses } = operation;
    let response;
    response = responses["200"];
    const { content } = response;
    const mediaResponse = content[Object.keys(content)[0]];
    const { schema } = mediaResponse;
    if (schema) {
        return { status, mock: mock(schema, [operationId]) };
    }
    return c.api.mockResponseForOperation(operationId);
}
exports.mockResponseForOperation = mockResponseForOperation;
//# sourceMappingURL=mock.js.map