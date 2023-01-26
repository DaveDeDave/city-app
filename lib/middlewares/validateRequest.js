import HTTPError from "../errors/HTTPError.js";

const handleSchemaValidation = (validator, valid, source) => {
  if (!valid) {
    console.log(validator.errors)
    throw new HTTPError({
      code: "ValidationFailed",
      status: 400,
      message: `${source}: ${validator.errors[0].message}`
    });
  }
}

const validateRequest = (schema) => ({ body, params, query }, res, next) => {
  const { bodyValidator, paramsValidator, queryValidator } = schema;

  if (bodyValidator !== undefined) {
    const valid = bodyValidator(body);
    handleSchemaValidation(bodyValidator, valid, "body");
  }
  
  if (paramsValidator !== undefined) {
    const valid = paramsValidator(params);
    handleSchemaValidation(paramsValidator, valid, "params");
  }
  
  if (queryValidator !== undefined) {
    const valid = queryValidator(query);
    handleSchemaValidation(queryValidator, valid, "querystring");
  }
  
  next();
};

export default validateRequest;