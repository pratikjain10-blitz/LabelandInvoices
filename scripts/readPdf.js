import { readFileSync } from "fs";
import { resolve as _resolve } from "path";
import pdf from "pdf-parse";

export function readPdf (pathToPdf) {
  return new Promise(function (resolve) {
    const pdfPath = _resolve(pathToPdf);
    let dataBuffer = readFileSync(pdfPath);
    pdf(dataBuffer).then(function ({ text }) {
      resolve(text);
    });
  });
}
