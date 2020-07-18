import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
// import RedisStore from 'rate-limit-redis';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import routes from './routes';
import authenticate from './middleware/authenticate';

// App config and documentation setup
const app = express();
const baseApiRoute = '/v1';
const swaggerYaml = yaml.load(path.join(__dirname, '../docs/generated/swagger.yaml'));
const swaggerOptions = {
  customCss: '.servers {display: none}',
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  // store: new RedisStore({}), // We would want to use a single source of truth since we are clustering nodejs
});

// Middleware
app.use(helmet()); // Generic security abstraction
app.use(limiter); // Generic rate limiting on all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/docs/generated/swagger.yaml', express.static('docs/generated/swagger.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml, swaggerOptions));
app.use('/coverage', express.static('coverage/'));
app.use('/_healthz', (req, res) => { res.status(200).json('OK'); });

// TODO: Add request caching middleware
app.use(baseApiRoute, authenticate, routes);

export default app;
