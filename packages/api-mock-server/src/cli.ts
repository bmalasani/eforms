import glob from "glob";
import OpenAPIBackend from "openapi-backend";
import path from "path";
import fs from "fs-extra";
import { OpenAPIV3 } from "openapi-types";
import { mock, mockResponseHeaders } from "./mock";
import { Example } from "./utils";
import { exit } from "process";
import { get } from "lodash";

const args = process.argv.slice(2);

const force = args.includes("-f") || args.includes("--force");

const examlesFolder = "./examples";
const backupFolder = "./backup";
const mockFolder = "./mocks";

fs.ensureDirSync(examlesFolder);
fs.ensureDirSync(backupFolder);
fs.ensureDirSync(mockFolder);

const markdownJson: Record<string, string> = {};

const mockPatterns = fs.pathExistsSync(path.join(mockFolder, "_mockPatterns.json"))
  ? fs.readJsonSync(path.join(mockFolder, "_mockPatterns.json"))
  : {};

glob("yml/*.y*ml", {}, function (er, files) {
  if (er) {
    console.error(er);
    return;
  }
  const result = files.map(async (file: string) => {
    try {
      const fileName = file.split("/").pop();
      if (fileName.startsWith("_")) {
        return;
      }

      const api = new OpenAPIBackend({
        definition: path.join(file),
        quick: true,
      });
      await api.init();
      const apiPaths = api.definition.paths as Record<any, any>;
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
              const bodySchema =
                bodycontent && (bodycontent[Object.keys(bodycontent)[0]].schema as OpenAPIV3.SchemaObject);
              const schema = mediaResponse["schema"] as OpenAPIV3.SchemaObject;
              const exampleMock = mock(schema, [operationId]);
              const exampleResposeHeaders = response ? mockResponseHeaders(response, [operationId]) : "*";
              const exampleBody = "*";
              const ex: Example[] = [
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

              const anyMockPattern = get(mockPatterns, `${operationId}_${key}`, []);
              if (Array.isArray(anyMockPattern)) {
                (anyMockPattern as Array<any>).forEach((x, i) => {
                  ex.push({
                    weightage: 10 + i,
                    body: "*",
                    headers: "*",
                    query: "*",
                    responseHeaders: exampleResposeHeaders,
                    mock: {},
                    ...x,
                    path: pathKey,
                    contentType: mediaType,
                    method: key,
                    status: 200,
                  });
                });
              }

              if (force || !fs.pathExistsSync(path.join(examlesFolder, `${operationId}_${key}.json`))) {
                console.log("\x1b[36m%s\x1b[0m", `Example Writing for ${operationId}_${key}.json`);
                markdownJson[pathKey] = `[${operationId}_${key}.json](${examlesFolder}/${operationId}_${key}.json)`;
                fs.writeFileSync(path.join(examlesFolder, `${operationId}_${key}.json`), JSON.stringify(ex, null, 2));
              }
            }
          }
        }
    } catch (err) {
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
        fs.writeFileSync("examples.md", tableString);
        fs.writeJSONSync("examples.json", markdownJson);
      }
    })
    .catch((err) => {
      console.error(err);
      exit(1);
    });
});
