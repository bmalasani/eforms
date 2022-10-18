import glob from "glob";
import fs from "fs";
import fsxtra from "fs-extra";
import express from "express";
import * as _ from "lodash";
import path from "path";

export interface MockPattern {
  resultFrom: any;
  mock: any;
}
export interface Example {
  path: string;
  method: string;
  contentType: string;
  status: number;
  delay?: number;
  weightage?: number;
  query?: string | Record<string, any>;
  headers?: string | Record<string, any>;
  body?: string | Record<string, any>;
  mock?: string | Record<string, any>;
  mockPattern?: MockPattern;
  responseHeaders?: string | Record<string, any>;
}

// export const ContentType {
//   'application/octet-stream':,
//   JSON = 'application/json'
// }

export function extractPath(original: string, match: string): Record<string, string> | null {
  let params: Record<string, string> = {};
  let originalArray = original.split("/") || [];
  let matchArray = match.split("/") || [];
  if (matchArray.length !== originalArray.length) return null;
  for (let index = 0; index < matchArray.length; index++) {
    if (originalArray[index].startsWith("{") && originalArray[index].endsWith("}")) {
      const param = originalArray[index].substring(1, originalArray[index].length - 1);
      params[param] = matchArray[index];
    } else {
      if (matchArray[index] !== originalArray[index]) {
        return null;
      }
    }
  }
  return params;
}

function hasMatch(original: any, match: any, evalProps: Record<string, any>): boolean {
  if (original === undefined || original === "*") return true;
  switch (typeof original) {
    case "object":
      if (Array.isArray(original)) {
        return isEqualArray(original, match, evalProps);
      }
      if (Object.prototype.hasOwnProperty.call(original, "eval")) {
        const { body, headers, query, urlParams } = evalProps; // needed for eval
        const lodash = _; //needed for eval
        return Boolean(eval(original["eval"]));
      } else {
        return isEqualObject(original, match, evalProps);
      }
    case "string":
      return _.isEqual(original, match);
    default:
      return _.isEqual(original, match);
  }
}

function isEqualArray(original: any[] = [], match: any[] = [], evalProps: Record<string, any>): boolean {
  let equal = true;
  for (let i = 0; i < original.length; i++) {
    equal = hasMatch(original[i], match[i], evalProps);
    if (!equal) return equal;
  }
  return equal;
}

function isEqualObject(original: Record<any, any>, match: Record<any, any>, evalProps: Record<string, any>): boolean {
  let equal = true;
  for (const key in original) {
    if (Object.prototype.hasOwnProperty.call(match, key)) {
      equal = hasMatch(original[key], match[key], evalProps);
      if (!equal) return equal;
    }
  }
  return equal;
}

export function getAllExamples(): Record<string, Array<Example>> {
  const examples: Record<string, Array<Example>> = {};
  const files = glob.sync("examples/*.json", {});
  files.forEach((file: string) => {
    const fileSplit: string[] = file.replace(/\s+/g, "_").split("/");
    const filekey: string = fileSplit[1].split(".")[0];
    const ex = JSON.parse(fs.readFileSync(file, "utf-8"));
    const exArray = Array.isArray(ex) ? ex : [ex];
    examples[filekey] = exArray;
  });
  return examples;
}

function extractResponse(
  cachedExamplesObj: Record<string, Array<Example>>,
  example: Example,
  req: express.Request
): Example {
  try {
    let result = _.cloneDeep(example);
    if (result.mockPattern && result.mockPattern.resultFrom) {
      const resultFrom = _.get(cachedExamplesObj, result.mockPattern.resultFrom);
      if (!resultFrom) return result;
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
            Object.entries(mock).forEach((k: [string, string | { eval?: string }]) => {
              if (_.isPlainObject(k[1]) && Object.prototype.hasOwnProperty.call(k[1], "eval")) {
                mock[k[0]] = typeof k[1] !== "string" ? eval(k[1]?.eval) : k[1];
              }
            });
            result.mock = mock;
          }
          break;
      }
    }
    return result;
  } catch (er) {
    console.error("Mock Pattern is in correct", example);
    console.error(er);
    return example;
  }
}

function hasRequestMatch(ex: Example, req: express.Request) {
  const { body, headers, query } = req;
  const urlParams = extractPath(ex.path, req.path);
  if (!urlParams) return false;
  const evalProps = {
    body,
    headers,
    query,
    urlParams,
  };
  const headerMatch = hasMatch(ex.headers, req.headers, evalProps);
  if (!headerMatch) return false;
  const queryMatch = hasMatch(ex.query, req.query, evalProps);
  if (!queryMatch) return false;
  const bodyMatch = hasMatch(ex.body, req.body, evalProps);
  if (!bodyMatch) return false;

  return true;
}

export function getAnExample(
  cachedExamplesObj: Record<string, Array<Example>>,
  allExamples: Array<Example>,
  req: express.Request
) {
  const result = _.first(
    allExamples
      .filter((ex) => hasRequestMatch(ex, req))
      .sort((x, y) => ((x.weightage || 0) < (y.weightage || 0) ? 1 : -1))
  );
  return result && extractResponse(cachedExamplesObj, result, req);
}

export function saveExample(file: string, data: any) {
  fsxtra.writeJSONSync(path.resolve("examples", `${file}.json`), data);
}
