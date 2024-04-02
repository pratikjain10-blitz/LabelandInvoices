const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const { readPdf } = require("./scripts/readPdf.js");
//const { promisify } = require("util");
let savedValue = {};

module.exports = defineConfig({
  projectId: "rsfpzk",
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      on("task", {
        downloadFile,
        readPdf,
        save: (args) => {
          console.log(">>", args);
          console.log("Saving value:", args.value);

          // If the key 'v' doesn't exist in savedValue, create it
          savedValue[args.v] = args.value; // Assign the value to savedValue[v]

          return null;
        },
        load: ({ v }) => {
          console.log("Loading value:", savedValue);
          return savedValue[v] || null;
        },
      });
      // return config; // You might uncomment this line if you need to modify the config object
    },
    specPattern: ["./PlaceOrder/"],
  },
});
