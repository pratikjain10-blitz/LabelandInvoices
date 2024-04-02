const fs = require("fs");
const path = require("path");
// const pdf = require("pdf-parse");

exports.readPdf = function (pathToPdf) {
  return new Promise(function (resolve) {
    const pdfPath = path.resolve(pathToPdf);
    let dataBuffer = fs.readFileSync(pdfPath);
    console.log(">>>>>>>>>>>", pdfPath, dataBuffer);
    typeof window === "undefined" &&
      require("pdf-parse")(dataBuffer).then(function ({ text }) {
        resolve(text);
      });
  });
};
