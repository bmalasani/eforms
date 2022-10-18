import { Connect, Plugin, ViteDevServer } from 'vite';
import * as http from 'http';
import path from 'path';
import fs from 'fs';
import chokidar from 'chokidar';

const PLUGIN_NAME = 'MOCK_SERVER';

const logInfo = (...optionalParams: any[]) => {
  console.info('[vite-plugin-mock-server]', optionalParams);
};

const logErr = (...optionalParams: any[]) => {
  console.error('[vite-plugin-mock-server]', optionalParams);
};

const loadMockFiles = async (options: any, watchDir: string) => {
  logInfo('recursive loading mock modules', watchDir);
  for (const [, name] of fs.readdirSync(watchDir).entries()) {
    const modName = path.join(watchDir, name);
    const stat = fs.statSync(modName);
    if (stat.isDirectory()) {
      loadMockFiles(options, modName);
      continue;
    }
    if (!stat.isFile()) return;
    const file: any = fs.readFileSync(modName);
    options.mocks.push(JSON.parse(file));
  }
};

const watchMockFiles = async (options = {}) => {
  const watchDir = path.resolve(process.cwd(), 'mocks');
  logInfo('watched root dir is', watchDir);
  await loadMockFiles(options, watchDir);
  chokidar
    .watch(watchDir, {
      ignoreInitial: true,
    })
    .on('all', async (event, path) => {
      console.log(path);
      debugger;
      logInfo('event', event, 'path', path);
      await loadMockFiles(options, watchDir);
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (options?: any): Plugin => {
  options = options || {};
  options.mocks = [];
  watchMockFiles(options).then(() => {
    console.log('[' + PLUGIN_NAME + '] mock server started. options =', options);
  });
  return {
    name: PLUGIN_NAME,
    configureServer: async (server: ViteDevServer) => {
      server.middlewares.use(
        (req: Connect.IncomingMessage, res: http.ServerResponse, next: Connect.NextFunction) => {
          if (!req.url?.startsWith('/mock')) {
            next();
          } else {
            console.log(req.url, options);
            const match = options.mocks.filter((x) => x.path === req.url);
            console.log(match);
            if (match) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(match[0].mock));
            }
          }
        }
      );
    },
  };
};
