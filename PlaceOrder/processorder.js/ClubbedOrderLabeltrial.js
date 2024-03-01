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
            cy.get('[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
            cy.wait(5000)            
        }
        )
        cy.wait(4000)
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.wait(5000)
    })

    it('labeldownload', function () {
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
        cy.get('.PrintPackViewCard_clubbed-parent-card__-FWzM > .PrintPackViewCard_clubbed-parent-divider__DSLtw > .Text_body2__0FftJ').eq(0).then(($z1)=>
            { // Wrap the text content of the element and alias it as 'order'
                cy.wrap($z1.text()).as('order');
                // Access the aliased 'order' and perform actions
                cy.get('@order').then((order) => {
                // Modify 'order' to avoid naming conflict
                const len = order.length;
                const modifiedOrder = order.substring(4, len);

                // Intercept the POST request
                cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created').as('res');

                // Click the button and perform actions
                cy.get('.rs-col-lg-3 > .action-btns-wrapper > .Button_button-primary__9i0Rz').eq(0).click().then(()=>
                    {
                    cy.wait(5000)
                   // cy.get('.rs-modal-footer > .Button_button-ghost__rieSu').click()
                    // Wait for the intercepted request and extract the label link
                    cy.wait('@res').then(({ response }) => {
                        const labellink = response.body.data.url;
                        const downloadPath = 'cypress/downloads/';
                        // Wrap the label link and alias it as 'label'
                        cy.wrap(labellink).as('label');
                        }).then(() => {
                                // Access the aliased 'label' and perform actions
                                cy.get('@label').then((label) => {
                                cy.log(label);
                                const labellink = label.substring(51, label.length);
                                const downloadPath = 'cypress/downloads/';
                                const PdfContent = downloadPath + labellink;

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