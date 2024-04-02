const fs = require("fs");
const path = require("path");
// const pdf = require("pdf-parse");

exports.readPdf = function (pathToPdf) {
  return new Promise(function (resolve, reject) {
    const pdfPath = path.resolve(pathToPdf);
<<<<<<< HEAD
    let dataBuffer = fs.readFileSync(pdfPath);
    console.log(">>>>>>>>>>>", pdfPath, dataBuffer);
    typeof window === "undefined" &&
      require("pdf-parse")(dataBuffer).then(function ({ text }) {
        resolve(text);
      });
=======

    // Read the PDF file asynchronously
    fs.readFile(pdfPath, function (err, dataBuffer) {
      if (err) {
        // If there's an error reading the file, reject the promise
        reject(err);
        return;
      }

      // Parse the PDF data
      pdf(dataBuffer)
        .then(function ({ text }) {
          // Resolve the promise with the extracted text
          resolve(text);
        })
        .catch(function (err) {
          // If there's an error parsing the PDF, reject the promise
          reject(err);
        });
    });
>>>>>>> 901340fcbec88faaee1a1585a2e1c0d32ae5bc4d
  });
};
