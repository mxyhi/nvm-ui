import { Command } from '@tauri-apps/api/shell';

export interface NvmListStatus {
  version: string;
  current?: boolean;
}

/**
 * 获取版本列表
 */
export const getNodeList = async (): Promise<NvmListStatus[]> => {
  const command = new Command('nvm', ['ls']);
  const res = await command.execute();
  (await command.spawn()).kill();
  return res.stdout
    .split('\n')
    .filter(it => it.trim())
    .map(it => {
      const version = it.trim();
      return version.startsWith('*')
        ? {
            version: version
              .replace('*', '')
              .replace(/(\(.*\)$)/, '')
              .trim(),
            current: true,
          }
        : { version };
    });
};

/**
 * 设置版本
 */
export const setNodeVersion = async (version: string) => {
  const command = new Command('nvm', ['use', version]);
  const res = await command.execute();
  (await command.spawn()).kill();
  return res.code === 0 ? res.stdout : res.stderr;
};

/**
 * 安装
 */
export const installNodeVersion = async (version: string) => {
  const command = new Command('nvm', ['install', version]);
  const res = await command.execute();
  (await command.spawn()).kill();
  return res.code === 0 ? res.stdout : res.stderr;
};

/**
 * 卸载
 */
export const uninstallNodeVersion = async (version: string) => {
  const command = new Command('nvm', ['uninstall', version]);
  const res = await command.execute();
  (await command.spawn()).kill();
  return res.code === 0 ? res.stdout : res.stderr;
};

/**
 * node换源
 */
export const setNodeMirror = async (mirror: string) => {
  const command = new Command('nvm', ['node_mirror', mirror]);
  const res = await command.execute();
  (await command.spawn()).kill();
  return res.code === 0 ? res.stdout : res.stderr;
};

/**
 * npm换源
 */
export const setNpmMirror = async (mirror: string) => {
  const command = new Command('nvm', ['npm_mirror', mirror]);
  const res = await command.execute();
  (await command.spawn()).kill();
  return res.code === 0 ? res.stdout : res.stderr;
};

/**
 * node重置源
 */
export const resetNodeMirror = async () => {
  const command = new Command('nvm', ['npm_mirror']);
  const res = await command.execute();
  (await command.spawn()).kill();
  return res.code === 0 ? res.stdout : res.stderr;
};

/**
 * npm重置源
 */
export const resetNpmMirror = async () => {
  const command = new Command('nvm', ['npm_mirror']);
  const res = await command.execute();
  (await command.spawn()).kill();
  return res.code === 0 ? res.stdout : res.stderr;
};
