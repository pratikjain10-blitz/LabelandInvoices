const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const { readPdf } = require("./scripts/readPdf.js");
//const { promisify } = require("util");

module.exports = defineConfig({
  projectId: "rsfpzk",
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      on("task", {
        downloadFile,
        readPdf,
        // toHtml,
      });
      // return config; // You might uncomment this line if you need to modify the config object
    },
    specPattern: ["./PlaceOrder/"],
  },
});
