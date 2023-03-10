export default class HTTPError extends Error {
  constructor({ code, status, message = "" }) {
    super(message);
    this.name = "HTTPError";
    this.code = code;
    this.status = status;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return { code: this.code, message: this.message }
  }
};