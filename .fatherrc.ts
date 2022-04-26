export default {
  cjs: 'babel',
  esm: {
    type: 'babel',
    importLibToEs: true,
    mjs: true,
  },
  umd: {
    name: 'calabash',
  },
  lessInBabelMode: true,
  preCommit: {
    eslint: true,
    prettier: true,
  },
  runtimeHelpers: true,
};
