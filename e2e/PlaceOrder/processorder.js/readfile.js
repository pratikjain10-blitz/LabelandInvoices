const { execSync } = require('child_process');
const { readFile } = require('fs');
const path = require('path');
describe('should read the PDF content using pdftotext', () => {
it('should read the PDF content using pdftotext', () => {
  const check = 'C:/Users/LENOVO/OrdersPOD/cypress/downloads/SHP-47575-NSG1700341479946-DUMS268J3QA8.pdf';
  cy.task('readPdf',check)
  .should('contain', 'NSG1700341479946')
  .should('contain','DUMS268J3QA8')
})
})