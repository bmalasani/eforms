import _, { first, get } from "lodash";
import path from "path";
import fs from "fs-extra";
import { OpenAPIV3 } from "openapi-types";
export type SchemaLike = OpenAPIV3.SchemaObject;

const mockFolder = "./mocks";
fs.ensureDirSync(mockFolder);

const array11 = [-1, 1];
const mockValues = fs.pathExistsSync(path.join(mockFolder, "_mock.json"))
  ? fs.readJsonSync(path.join(mockFolder, "_mock.json"))
  : {};
const mockKeys = Object.keys(mockValues);
const yn = ["y", "n"];
const tf = [true, false];

function* generateIndex(value: number) {
  let index = value;
  while (true) {
    yield index++;
  }
}

const cache: Record<string, any> = {};

function resolveAllOf(schema: SchemaLike): SchemaLike {
  if (schema.allOf && schema.allOf[0]) {
    schema = _.reduce(
      schema.allOf,
      (combined, subschema: SchemaLike) => _.merge({}, combined, resolveAllOf(subschema)),
      schema
    );
  }
  return schema;
}

function addDays(days: number) {
  var result = new Date();
  result.setDate(result.getDate() + days);
  return result;
}

const generateString = (myLength: number, type?: string) => {
  let chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz _-1234567890";
  if (type === "x-amount" || type === "x-float") chars = "123456.7890";
  if (type === "x-number") chars = "1234567890";
  const randomArray = Array.from({ length: myLength }, () => chars[Math.floor(Math.random() * chars.length)]);
  const randomString = randomArray.join("");
  const randomDateInt = array11[Math.floor(Math.random() * array11.length)];
  if (type === "x-amount") return parseFloat(randomString).toFixed(2);
  if (type === "x-number") return parseInt(randomString);
  if (type === "x-float") return parseFloat(randomString);
  if (type === "x-date")
    return new Date(+new Date() + randomDateInt * Math.floor(Math.random() * 10000000000)).toJSON().substr(0, 10);
  if (type === "x-date-time")
    return new Date(+new Date() + randomDateInt * Math.floor(Math.random() * 10000000000)).toJSON();
  if (type === "x-past") return addDays(-1 * Math.floor(Math.random() * 5)).toJSON();
  if (type === "x-future") return addDays(Math.floor(Math.random() * 5)).toJSON();

  return randomString;
};

const constructCondition = (schema: any) => [
  { when: [] as Array<any>, kind: get(schema, "x-type"), options: { size: get(schema, "x-size", 8) } },
];

let Index = generateIndex(0);

export function mock(schema: SchemaLike, props: string[], isBody?: boolean): any {
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
    return mock(schema.oneOf[0] as SchemaLike, props, isBody);
  }
  // anyOf, use first
  if (schema.anyOf && schema.anyOf[0]) {
    return mock(schema.anyOf[0] as SchemaLike, props, isBody);
  }
  // get type, use first if array
  const type = _.isArray(schema) ? _.first(schema.type) : schema.type;
  if (type === "object") {
    const obj = schema as OpenAPIV3.NonArraySchemaObject;
    const { properties } = obj;
    if (!properties) {
      return {};
    }
    return _.mapValues(properties, (p, k) => mock(p as SchemaLike, [...props, k], isBody));
  }
  if (type === "array") {
    Index = generateIndex(0);
    const array = schema as OpenAPIV3.ArraySchemaObject;
    const items = array.items as SchemaLike;
    if (!items) {
      return [];
    }
    const examples = [];
    let example = ((items.oneOf && items.oneOf[0]) || items) as SchemaLike;
    if (items.anyOf) {
      // include one of each example for anyOf and allOf
      for (const option of items.anyOf) {
        example = option as SchemaLike;
        examples.push(mock(example, props, isBody));
      }
    }
    // if minItems is set make sure we have at least that many items
    const minItems = isBody ? 1 : array.minItems || 1;
    while (examples.length < minItems) {
      examples.push(mock(example, props, isBody));
    }

    // limit to max items if applicable
    return array.maxItems ? _.take(examples, array.maxItems) : examples;
  }

  if (_.isArray(schema.enum)) {
    return schema.enum[Math.floor(Math.random() * schema.enum.length)];
  }

  if ("x-enum" in schema && _.isArray(schema["x-enum"])) {
    return schema["x-enum"][Math.floor(Math.random() * (schema["x-enum"] as Array<any>).length)];
  }

  if (isBody) {
    return "*";
  }

  if (mockKeys.includes(lastProp) || "x-type" in schema) {
    const conditions: Array<any> = "x-type" in schema ? constructCondition(schema) : get(mockValues, lastProp, []);
    let iterator = first(conditions.filter((y) => props.some((x) => y?.when.includes(x))));
    if (!iterator) iterator = first(conditions.filter((y) => y.when.length === 0));
    if (iterator) {
      const { when, kind, options }: { when: Array<any>; kind: string; options: any } = iterator;
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
            return generateString(get(options, "size", 8), kind);
          case "x-index":
            return Index.next().value;
          case "x-yesno":
            return yn[Math.floor(Math.random() * yn.length)];
          case "x-bool":
            return tf[Math.floor(Math.random() * yn.length)];
          case "x-unique":
            const existing: Array<any> = get(cache, lastProp, []);
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
    const formatExamples: { [format: string]: string } = {
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
    const maxlnByte = !_.isNil(schema.maxLength) ? schema.maxLength : 8;
    const defaultString = generateString(maxlnByte) as string;
    const val = formatExamples[format] || defaultString;
    const minln = !_.isNil(schema.minLength) ? schema.minLength : 0;
    const maxln = !_.isNil(schema.maxLength) ? schema.maxLength : val.length;
    if (val === formatExamples._default && val.length < minln) {
      return _.padEnd(val, minln, val);
    }
    const autoExample = (schema as any)["x-auto"] ? defaultString : example;
    return example ? autoExample : val.substr(0, _.clamp(val.length, minln, maxln));
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
    let min = !_.isNil(schemaMin) ? schemaMin : Number.MIN_SAFE_INTEGER;
    let max = !_.isNil(schemaMax) ? schemaMax : Number.MAX_SAFE_INTEGER;
    if (schema.multipleOf) {
      min = Math.ceil(min / schema.multipleOf) * schema.multipleOf;
      max = Math.floor(max / schema.multipleOf) * schema.multipleOf;
    }
    return schema.example ? schema.example : _.clamp(0, min, max);
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

export function mockResponseHeaders(headers: any, props: string[]) {
  if (headers && typeof headers === "object") {
    return Object.entries(headers).reduce((a: Record<string, any>, c) => {
      a[c[0] as string] = mock((c[1] as any).schema as SchemaLike, [...props, c[0]]);
      return a;
    }, {});
  }
  return "*";
}

export function mockResponseForOperation(c: any) {
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
