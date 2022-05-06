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
};
