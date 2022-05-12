export default {
  cjs: 'babel',
  esm: {
    type: 'babel',
    importLibToEs: false,
  },
  umd: {
    name: 'crud-shared',
  },
  lessInBabelMode: true,
  preCommit: {
    eslint: true,
    prettier: true,
  },
  runtimeHelpers: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
