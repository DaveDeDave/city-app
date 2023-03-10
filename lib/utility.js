import MissingEnvError from "./errors/MissingEnvError.js";
import mongoose from 'mongoose';
import Ajv from "ajv";
const ajv = new Ajv({ removeAdditional: true });

/**
 * Logs the error
 * @param {Error} error - the error 
 */
const logError = (error) => {
  console.log(error.toString());
};

/**
 * Retrieves the specified environment variables' values
 * @param {string[]} envs - list of environment variables' names 
 * @returns {Object.<string, string>}
 */
const getEnvs = (envs) => {
  const fetchedEnvs = {};
  envs.forEach((env) => {
    if (process.env.hasOwnProperty(env) === false) throw new MissingEnvError(env);
    fetchedEnvs[env] = process.env[env]; 
  });
  return fetchedEnvs;
}

/**
 * Compiles the input schema with ajv
 * @param {Object} schema - the input schema
 * @returns the schema validator
 */
const compileSchema = (schema) => ajv.compile(schema);

const connectToMongo = async () => {
  const { MONGODB_URI } = getEnvs(["MONGODB_URI"]);
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to mongodb");
  } catch (e) { console.log("error", e); };
}

/**
 * Wraps async request controllers in order to make the error handler work
 */
const wrapAsyncController = fn => (...args) => fn(...args).catch(args[2]);

const calculateSkip = (quantity, page) => quantity*(page-1);

export { 
  logError,
  getEnvs,
  compileSchema,
  connectToMongo,
  wrapAsyncController,
  calculateSkip
};