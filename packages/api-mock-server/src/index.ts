import path from "path";
import cors from "cors";
import glob from "glob";
import morgan from "morgan";
import bodyParser from "body-parser";
import express, { Response, Request as expRequest } from "express";
import { STATUS_CODES } from "http";
import OpenAPIBackend, { Document, Request } from "openapi-backend";
import { Example, getAnExample, getAllExamples, saveExample } from "./utils";
import { mockResponseForOperation } from "./mock";
import { isEmpty, get } from "lodash";

const args = process.argv.slice(2);

const port = parseInt(args[0]) || 5001;

const corsOptions = {
  origin: (origin: any, callback: any) => {
    return callback(null, true);
  },
  credentials: true,
  exposedHeaders: "*",
};
const app = express();
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true, parameterLimit:5000}));
app.use(morgan("combined"));
app.use(express.json());

const validateReq = false;
const validateRes = false;

const apis: Array<OpenAPIBackend<Document>> = [];

glob("yml/*.y*ml", {}, function (er, files) {
  if (er) {
    console.error(er);
    return;
  }

  files.forEach((file: string) => {
    const fileName = file.split("/").pop();
    if (fileName.startsWith("_")) {
      return;
    }

    const api = new OpenAPIBackend({
      validate: validateReq,
      definition: path.join(file),
    });

    api.register("validationFail", async (c, _req: express.Request, res: express.Response) => {
      console.log("\x1b[36m%s\x1b[0m", "**** Validation Error ****");
      console.log("\x1b[36m%s\x1b[0m", JSON.stringify(c.validation.errors));
      console.log("\x1b[36m%s\x1b[0m", "**** Validation Error ****");
      return res.status(400).json({ err: c.validation.errors });
    });

    api.register("notImplemented", async (c, req: express.Request, res: express.Response) => {
      console.log(req.params, req.path);
      const cachedExamplesObj: Record<string, Array<Example>> = getAllExamples() || {};
      const cachedExamples: Array<Example> =
        Object.values(cachedExamplesObj).reduce((a, c) => {
          a = a.concat(c);
          return a;
        }, []) || [];

      const anExample = getAnExample(cachedExamplesObj, cachedExamples, req);
      if (!anExample || isEmpty(anExample)) {
        console.log("\x1b[36m%s\x1b[0m", "**** NO MATCH ****");
        console.log("\x1b[36m%s\x1b[0m", req.url, req.body);
        console.log("\x1b[36m%s\x1b[0m", "**** NO MATCH ****");
      }

      const { status, mock } = anExample && !isEmpty(anExample) ? anExample : mockResponseForOperation(c);

      const valid:any = validateRes ? c.api.validateResponse(mock, c.operation.operationId) : { errors: false };

      if (anExample && typeof anExample.responseHeaders === "object") {
        Object.entries(anExample.responseHeaders).forEach((v) => res.setHeader(v[0], v[1]));
      }

      if (anExample && anExample.contentType === "application/octet-stream") {
        res.setHeader("Content-Type", "application/octet-stream");
        let data = Buffer.from(anExample.mock as string, "base64");
        return res.status(200).send(data);
      }

      if (valid.errors) {
        return res.status(404).json({ err: "response validation fail", errors: valid.errors });
      } else {
        if (anExample && anExample.delay) {
          setTimeout(() => {
            res.status(status).json(mock);
          }, anExample.delay);
        } else {
          return res.status(status).json(mock);
        }
      }
    });

    api.register("notFound", async (_c, _req: express.Request, res: express.Response) =>
      res.status(404).json({ err: "not found" })
    );

    api.init();
    apis.push(api);
  });
});

app.use(async (req: Request, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.baseUrl || req.originalUrl} not found`,
    code: STATUS_CODES[404],
  });
});

app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || 500;
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({
    message: err.message,
    errors: err.errors,
    code: STATUS_CODES[status] || "Internal server error",
  });
});

// start server
app.listen(port, () => console.info(`api listening at http://localhost:${port}`));
