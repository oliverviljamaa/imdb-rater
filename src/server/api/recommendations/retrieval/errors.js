module.exports = {
  InvalidCookieError: class extends Error {
    constructor() {
      super();

      this.name = this.constructor.name;
      this.message = 'Invalid cookie.';
      this.status = 403;
    }
  },
};
