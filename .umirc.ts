import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'calabash',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
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
    // {
    //   title: 'GitHub',
    //   path: 'https://github.com/ant-design-colorful/ant-design-colorful',
    // },
  ],
});
