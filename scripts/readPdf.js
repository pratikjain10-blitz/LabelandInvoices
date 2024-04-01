const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

exports.readPdf = function (pathToPdf) {
  return new Promise(function (resolve, reject) {
    const pdfPath = path.resolve(pathToPdf);
    fs.readFile(pdfPath, function (err, dataBuffer) {
      if (err) {
        reject(err);
        return;
      }
      pdf(dataBuffer).then(function ({ text }) {
        resolve(text);
      }).catch(function (error) {
        reject(error);
      });
    });
  });
};
