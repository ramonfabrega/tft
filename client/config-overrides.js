const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@body-background': '#151e2c',
      '@component-background': '#222',
      '@text-color': '#eee',
      '@input-border-color': '#1890ff',
      '@heading-color': '#eee',
      '@border-color-split': '#1890ff'
    }
  })
);
