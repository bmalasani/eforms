"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const openapi_backend_1 = __importDefault(require("openapi-backend"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const mock_1 = require("./mock");
const process_1 = require("process");
const lodash_1 = require("lodash");
const args = process.argv.slice(2);
const force = args.includes("-f") || args.includes("--force");
const examlesFolder = "./examples";
const backupFolder = "./backup";
const mockFolder = "./mocks";
fs_extra_1.default.ensureDirSync(examlesFolder);
fs_extra_1.default.ensureDirSync(backupFolder);
fs_extra_1.default.ensureDirSync(mockFolder);
const markdownJson = {};
const mockPatterns = fs_extra_1.default.pathExistsSync(path_1.default.join(mockFolder, "_mockPatterns.json"))
    ? fs_extra_1.default.readJsonSync(path_1.default.join(mockFolder, "_mockPatterns.json"))
    : {};
(0, glob_1.default)("yml/*.y*ml", {}, function (er, files) {
    if (er) {
        console.error(er);
        return;
    }
    const result = files.map(async (file) => {
        try {
            const fileName = file.split("/").pop();
            if (fileName.startsWith("_")) {
                return;
            }
            const api = new openapi_backend_1.default({
                definition: path_1.default.join(file),
                quick: true,
            });
            await api.init();
            const apiPaths = api.definition.paths;
            if (typeof api.definition.paths === "object")
                for (const pathKey of Object.keys(apiPaths)) {
                    const element = apiPaths[pathKey];
                    for (const key of Object.keys(element)) {
                        if (["post", "get", "delete", "patch", "put"].includes(key)) {
                            const pathMethod = element[key];
                            const operationId = pathMethod["operationId"];
                            const content = pathMethod["responses"]["200"]["content"];
                            const response = pathMethod["responses"]["200"]["headers"];
                            const bodycontent = pathMethod["requestBody"] && pathMethod["requestBody"]["content"];
                            const mediaType = Object.keys(content)[0];
                            const mediaResponse = content[mediaType];
                            const bodySchema = bodycontent && bodycontent[Object.keys(bodycontent)[0]].schema;
                            const schema = mediaResponse["schema"];
                            const exampleMock = (0, mock_1.mock)(schema, [operationId]);
                            const exampleResposeHeaders = response ? (0, mock_1.mockResponseHeaders)(response, [operationId]) : "*";
                            const exampleBody = "*";
                            const ex = [
                                {
                                    path: pathKey,
                                    contentType: mediaType,
                                    method: key,
                                    status: 200,
                                    delay: 0,
                                    weightage: 0,
                                    body: exampleBody,
                                    headers: "*",
                                    query: "*",
                                    mock: exampleMock,
                                    responseHeaders: exampleResposeHeaders,
                                    mockPattern: {
                                        mock: undefined,
                                        resultFrom: undefined,
                                    },
                                },
                            ];
                            const anyMockPattern = (0, lodash_1.get)(mockPatterns, `${operationId}_${key}`, []);
                            if (Array.isArray(anyMockPattern)) {
                                anyMockPattern.forEach((x, i) => {
                                    ex.push(Object.assign(Object.assign({ weightage: 10 + i, body: "*", headers: "*", query: "*", responseHeaders: exampleResposeHeaders, mock: {} }, x), { path: pathKey, contentType: mediaType, method: key, status: 200 }));
                                });
                            }
                            if (force || !fs_extra_1.default.pathExistsSync(path_1.default.join(examlesFolder, `${operationId}_${key}.json`))) {
                                console.log("\x1b[36m%s\x1b[0m", `Example Writing for ${operationId}_${key}.json`);
                                markdownJson[pathKey] = `[${operationId}_${key}.json](${examlesFolder}/${operationId}_${key}.json)`;
                                fs_extra_1.default.writeFileSync(path_1.default.join(examlesFolder, `${operationId}_${key}.json`), JSON.stringify(ex, null, 2));
                            }
                        }
                    }
                }
        }
        catch (err) {
            console.log(file, err);
        }
    });
    Promise.all(result)
        .then(() => {
        console.log("Examples Generated.!");
        if (Object.keys(markdownJson).length > 0) {
            let tableString = `| Path | Example |\n| :--------- | :------------ |`;
            Object.entries(markdownJson).forEach((v) => {
                tableString = tableString + `\n| ${v[0]} | ${v[1]} |`;
            });
            fs_extra_1.default.writeFileSync("examples.md", tableString);
            fs_extra_1.default.writeJSONSync("examples.json", markdownJson);
        }
    })
        .catch((err) => {
        console.error(err);
        (0, process_1.exit)(1);
    });
});
//# sourceMappingURL=cli.js.map