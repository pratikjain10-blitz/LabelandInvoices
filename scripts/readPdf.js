const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

module.exports.readPdf = function (pathToPdf) {
  return new Promise(function (resolve) {
    const pdfPath = path.resolve(pathToPdf);
    let dataBuffer = fs.readFileSync(pdfPath);
    pdf(dataBuffer).then(function ({ text }) {
      resolve(text);
    });
  });
};
