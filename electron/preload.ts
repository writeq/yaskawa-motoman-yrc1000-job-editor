import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('jobEditor', {
  version: process.env.npm_package_version ?? '0.0.0',
});
