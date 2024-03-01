// <reference types="Cypress" />
/// <reference types="cypress-downloadfile"/>
const { execSync } = require('child_process');
const { readFile } = require('fs');
const path = require('path');
var id;
const fs = require('fs');
const pdf = require('pdf-parse');
var invoiceid;
var labelpdf = '';
function stringToBinary(str) {
    const binaryArray = [];
    for (let i = 0; i < str.length; i++) {
      const binaryChar = str.charCodeAt(i).toString(2);
      binaryArray.push(binaryChar);
    }
    return binaryArray.join(' ');
  }
describe('Placeorderhappyflow',function()
{ 
  
    beforeEach('Login',function()
     {
        cy.visit("http://v2.nushop-dashboard.kaip.in/login/");
        cy.get('.rs-input').type('7908961320')
        cy.get('.Button_button-primary__9i0Rz').contains('Generate OTP').click()
        cy.wait(2000)
        cy.get('.rs-input').type('0000') 
        cy.get('.Button_button-primary__9i0Rz').contains('Verify OTP').click()
        cy.on('window:confirm',(str)=>
        {
            cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
            cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
            cy.get('[href="/orders/process-orders"] > .Text_body2__0FftJ').click()
            cy.wait(5000)            
        })
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.wait(5000)
    })

    it('invoicedownload', function () {
        cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click()
        cy.get('.Button_button-default__NeJ4p').each(($x1,index,list)=>
              { 
                if(($x1.text()).includes('Clubbed'))
               {
                cy.get('.Button_button-default__NeJ4p').eq(index).click()
               }
         })

        // Iterate over the elements using each
        cy.get('.PrintPackViewCard_clubbed-parent-card__-FWzM > .PrintPackViewCard_clubbed-parent-divider__DSLtw > .Text_body2__0FftJ')
            .each(($e1,index,list) => {
        
    cy.get('.PrintPackViewCard_clubbed-parent-card__-FWzM > .PrintPackViewCard_clubbed-parent-divider__DSLtw > .Text_body2__0FftJ').eq(index).then(($z1)=>
            { // Wrap the text content of the element and alias it as 'order'
                cy.wrap($z1.text()).as('order');

                // Access the aliased 'order' and perform actions
                cy.get('@order').then((order) => {
                    // Modify 'order' to avoid naming conflict
                    const len = order.length;
                    const modifiedOrder = order.substring(4, len);

                    // Intercept the POST request
                    cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/invoices-v2/created').as('res');
                    cy.get(' .rs-col-lg-3 > .action-btns-wrapper > :nth-child(2)').eq(index).click().then(()=>
                    {
                       //cy.get('.rs-modal-footer > .Button_button-ghost__rieSu').click()
                       cy.wait('@res').then(({ response }) => {
                            const invoicelink = response.body.data.url;
                            const downloadPath = 'cypress/downloads/';

                            // Wrap the label link and alias it as 'label'
                            cy.wrap(invoicelink).as('invoice');
                        }).then(() => {
                            // Access the aliased 'label' and perform actions
                            cy.get('@invoice').then((invoice) => {
                                cy.log(invoice);
                                const invoicelink = invoice.substring(51, invoice.length);
                                const downloadPath = 'cypress/downloads/';
                                const PdfContent = downloadPath + invoicelink;

                                // Wait for some time before reading the PDF
                                cy.wait(5000);

                                // Task to read the PDF and assert its content
                                cy.task('readPdf', PdfContent).then((pdfContent) => {
                                    expect(pdfContent).to.contain(modifiedOrder);
                                });
                            });
                        });
                    });
                });
            });
    });
});
})
