const fs = require('fs');
const path = require('path');

const swaggerYaml = fs.readFileSync(path.join(__dirname, '../docs/swagger.yaml'), 'utf8');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const env = process.env.NODE_ENV;
let host;

if (env === 'development') {
  host = `http://localhost:${process.env.PORT}`;
} else {
  // host = `https://${process.env.DOMAIN}`;
  host = `http://localhost:${process.env.PORT}`;
}

const generatedYaml = swaggerYaml.replace('${SERVICE_HOST}', host); // eslint-disable-line no-template-curly-in-string
if (!fs.existsSync(path.join(__dirname, '../docs/generated/'))) {
  fs.mkdirSync(path.join(__dirname, '../docs/generated/'));
}
fs.writeFileSync(path.join(__dirname, '../docs/generated/swagger.yaml'), generatedYaml);
