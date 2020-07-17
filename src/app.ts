import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import routes from './routes';

// App config and documentation setup
const app = express();
const base = '/v1';
const swaggerYaml = yaml.load(path.join(__dirname, '../docs/generated/swagger.yaml'));
const swaggerOptions = {
  customCss: '.servers {display: none}',
};

// Middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// TODO: Add logging middleware

// Routes
app.use('/docs/generated/swagger.yaml', express.static('docs/generated/swagger.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml, swaggerOptions));
app.use('/coverage', express.static('coverage/'));
app.use('/_healthz', (req, res) => { res.status(200).json('OK'); });

app.use(base, routes);

export default app;
