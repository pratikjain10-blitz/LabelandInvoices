/// <reference types="Cypress" />
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
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.wait(5000)
    })
    it('labeldownload',function()
    {
        
    cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click()
    cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(($p1,number,$queue)=>
 {  
    cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(number).within(()=>
    {
    cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').then(($e1)=>
    {
    cy.wrap($e1.text()).as('orderid')
    })
    cy.get('@orderid').then((orderid)=>
    {
    cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/invoices-v2/created').as('res')
    cy.get('.PrintPackViewCard_card__Y4Iaa > :nth-child(1) > .rs-col-lg-3 > .action-btns-wrapper > :nth-child(2)').click()
    cy.wait('@res').then(({request , response}) =>
        {
        const invoicelink = response.body.data.url
        const downloadPath = 'cypress/downloads/';
         // Remove the specified substring 
         cy.wrap(invoicelink).as('invoice')
        })
      


    }).then(()=>{
  cy.get('@orderid').then((orderid)=>
  {
  cy.get('@invoice').then((invoice)=>
  {
    cy.log(invoice)
    const invoicelink = invoice.substring(51,(invoice.length))  
    const downloadPath = 'cypress/downloads/'; 
    const InvoiceContent = downloadPath+invoicelink
    cy.wait(5000)
    cy.task('readPdf',InvoiceContent)
      .should('contain', orderid)
    })
    })
    })
     })
    })
   })
  })
 

    
