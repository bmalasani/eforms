"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const glob_1 = __importDefault(require("glob"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const openapi_backend_1 = __importDefault(require("openapi-backend"));
const utils_1 = require("./utils");
const mock_1 = require("./mock");
const lodash_1 = require("lodash");
const args = process.argv.slice(2);
const port = parseInt(args[0]) || 5001;
const corsOptions = {
    origin: (origin, callback) => {
        return callback(null, true);
    },
    credentials: true,
    exposedHeaders: "*",
};
const app = (0, express_1.default)();
app.options("*", (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }));
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
const validateReq = false;
const validateRes = false;
const apis = [];
(0, glob_1.default)("yml/*.y*ml", {}, function (er, files) {
    if (er) {
        console.error(er);
        return;
    }
    files.forEach((file) => {
        const fileName = file.split("/").pop();
        if (fileName.startsWith("_")) {
            return;
        }
        const api = new openapi_backend_1.default({
            validate: validateReq,
            definition: path_1.default.join(file),
        });
        api.register("validationFail", async (c, _req, res) => {
            console.log("\x1b[36m%s\x1b[0m", "**** Validation Error ****");
            console.log("\x1b[36m%s\x1b[0m", JSON.stringify(c.validation.errors));
            console.log("\x1b[36m%s\x1b[0m", "**** Validation Error ****");
            return res.status(400).json({ err: c.validation.errors });
        });
        api.register("notImplemented", async (c, req, res) => {
            console.log(req.params, req.path);
            const cachedExamplesObj = (0, utils_1.getAllExamples)() || {};
            const cachedExamples = Object.values(cachedExamplesObj).reduce((a, c) => {
                a = a.concat(c);
                return a;
            }, []) || [];
            const anExample = (0, utils_1.getAnExample)(cachedExamplesObj, cachedExamples, req);
            if (!anExample || (0, lodash_1.isEmpty)(anExample)) {
                console.log("\x1b[36m%s\x1b[0m", "**** NO MATCH ****");
                console.log("\x1b[36m%s\x1b[0m", req.url, req.body);
                console.log("\x1b[36m%s\x1b[0m", "**** NO MATCH ****");
            }
            const { status, mock } = anExample && !(0, lodash_1.isEmpty)(anExample) ? anExample : (0, mock_1.mockResponseForOperation)(c);
            const valid = validateRes ? c.api.validateResponse(mock, c.operation.operationId) : { errors: false };
            if (anExample && typeof anExample.responseHeaders === "object") {
                Object.entries(anExample.responseHeaders).forEach((v) => res.setHeader(v[0], v[1]));
            }
            if (anExample && anExample.contentType === "application/octet-stream") {
                res.setHeader("Content-Type", "application/octet-stream");
                let data = Buffer.from(anExample.mock, "base64");
                return res.status(200).send(data);
            }
            if (valid.errors) {
                return res.status(404).json({ err: "response validation fail", errors: valid.errors });
            }
            else {
                if (anExample && anExample.delay) {
                    setTimeout(() => {
                        res.status(status).json(mock);
                    }, anExample.delay);
                }
                else {
                    return res.status(status).json(mock);
                }
            }
        });
        api.register("notFound", async (_c, _req, res) => res.status(404).json({ err: "not found" }));
        api.init();
        apis.push(api);
    });
});
app.use(async (req, res, next) => {
    try {
        const match = apis.filter((v) => v.matchOperation(req) !== undefined);
        switch (match.length) {
            case 0:
                //Not found in any api
                next();
                break;
            case 1:
                match[0].handleRequest(req, req, res).catch(next);
                break;
            default:
                next({
                    status: 500,
                    message: `Possible operationId collision (${match.map((v) => v.definition.info.title).join(", ")})`,
                });
        }
    }
    catch (error) {
        next(error);
    }
});
app.use("*", (req, res) => {
    res.status(404).json({
        message: `${req.baseUrl || req.originalUrl} not found`,
        code: http_1.STATUS_CODES[404],
    });
});
app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    if (status >= 500) {
        console.error(err);
    }
    res.status(status).json({
        message: err.message,
        errors: err.errors,
        code: http_1.STATUS_CODES[status] || "Internal server error",
    });
});
// start server
app.listen(port, () => console.info(`api listening at http://localhost:${port}`));
//# sourceMappingURL=index.js.map