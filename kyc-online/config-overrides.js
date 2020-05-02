const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#DA3832",
      "@font-family": "Helvetica",
      "@btn-border-radius-base": "7px",
      "@btn-default-bg": "transparent ",
      "@btn-default-color": "#000",
      "@tooltip-color": "#787878",
      "@tooltip-bg": "#fff",
      "@input-hover-border-color": "#c4161c",
      "@table-header-bg": "@primary-color",
      "@table-header-color": "#fff",
      "@table-row-hover-bg": "#c5c5c5",
    }
  })
);
