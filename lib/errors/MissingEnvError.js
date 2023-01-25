export default class MissingEnvError extends Error {
  constructor(env) {
    super("");
    this.name = "MissingEnv";
    this.message = `${env.toUpperCase()} environment variable is undefined`;
  }
};