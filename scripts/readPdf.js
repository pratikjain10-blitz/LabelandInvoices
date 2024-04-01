import { fs }from 'fs';
const path = require("path");
const pdf = require("pdf-parse");

exports.readPdf = function (pathToPdf) {
  return new Promise(function (resolve) {
    const pdfPath = path.resolve(pathToPdf);
    let dataBuffer = fs.readFileSync(pdfPath);
    pdf(dataBuffer).then(function ({ text }) {
      resolve(text);
    });
  });
};
