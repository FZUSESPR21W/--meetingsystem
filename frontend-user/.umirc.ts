import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
  },
  antd: {},
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://47.98.152.179:8000',
      changeOrigin: true,
    },
  },
});
