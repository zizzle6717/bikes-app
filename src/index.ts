import cluster from 'cluster';
import fs from 'fs';
import https from 'https';
import os from 'os';
import app from './app';

let devServer;

if (!process.env.PORT) {
  console.error('Missing ENV varaibles...Exiting!');
  process.exit(1);
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// Run npm start <custom-port>
const port: number = (process.env.NODE_ENV !== 'production' && parseInt(process.argv[2], 10))
  || parseInt(process.env.PORT, 10);

// Start server
// NOTE: I'm using nodejs cluster here, although best practice as far as know is to design
// containers with single responsibility and a single process. I just wanted to show that this is another option
// that could be implemented depending on circumstances.
if (cluster.isMaster) {
  // Convoluted way of selecting the MAX_WORKERS env variable or using all cpus on the machine
  const numWorkers = Math.min(os.cpus().length, parseInt(process.env.MAX_WORKERS || String(os.cpus().length), 10));

  console.info(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', worker => {
    console.info(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.warn(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.info('Starting a new worker');
    cluster.fork();
  });
} else if (process.env.NODE_ENV !== 'development') {
  const options = {
    key: fs.readFileSync(process.env.CERT_KEY || ''),
    cert: fs.readFileSync(process.env.CERT_FILE || ''),
  };

  https.createServer(options, app).listen(port, () => {
    console.info(`server started on ${port}, with process id, ${process.pid}`);
  });
} else {
  devServer = app.listen(port, () => {
    console.info(`server started on ${port}, with process id, ${process.pid}`);
  });
}

// Hot Module Reloading
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (devServer && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => devServer.close());
}
