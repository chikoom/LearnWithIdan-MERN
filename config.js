const env  = process.env;

export const noneEnv = env.NODE_ENV || 'development';

export default {
  mongodbUri: 'mongodb://localhost:27017',
  mongodbDB: 'learningwidan',
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};