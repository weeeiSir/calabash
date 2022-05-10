import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'crud-shared',
  favicon: 'https://fulu-item11-zjk.oss-cn-zhangjiakou.aliyuncs.com/images/logo.png',
  logo: 'https://fulu-item11-zjk.oss-cn-zhangjiakou.aliyuncs.com/images/logo.png',
  outputPath: 'docs-dist',
  hash: true,
  base: '/crud-shared/',
  publicPath: '/crud-shared/',
  exportStatic: {},
  mode: 'site',
  // more config: https://d.umijs.org/config
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  menus: {
    '/guide': [
      {
        children: ['guide/index', 'guide/how-to-use'],
      },
    ],
  },
  navs: [
    { title: '介 绍', path: '/guide' },
    { title: '组 件', path: '/components' },
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
});
