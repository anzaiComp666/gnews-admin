import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';

interface Configs {
  jwt: {
    secret: string;
  };
  db: {
    [key: string]: {
      host: string;
      username: string;
      password: string;
      database: string;
      timezone: string;
      synchronize?: boolean;
    };
  };
  redis: {
    host: string;
    port: number;
    username: string;
    password: string;
  };

  typesense: {
    host: string;
    port: number;
    protocol: string;
    apiKey: string;
  };

}

function initGlobalConfigs(): Configs {
  const file = fs.readFileSync(
    path.join(process.cwd(), 'config.yaml'),
    'utf8',
  );
  const config = YAML.parse(file) as Configs;
  return config;
}

export const globalConfigs: Configs = initGlobalConfigs();
