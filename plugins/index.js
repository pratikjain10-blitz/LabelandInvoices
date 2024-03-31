import "./commands";
const {
  downloadFile,
} = require("node_modules/cypress-downloadfile/lib/addPlugin.js");
module.exports = (on, config) => {
  on("task", { downloadFile });
};
