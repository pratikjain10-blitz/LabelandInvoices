//code for checking all orders in print section has correct AWB and orderid 
//this checks all single orders in print have correct AWB and order id Duplicate and Non Duplicate

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
     cy.get('.rs-input').type('9495760332')
     cy.get('.Button_button-primary__9i0Rz').contains('Generate OTP').click()
     cy.wait(2000)
     cy.get('.rs-input').type('0000') 
     cy.get('.Button_button-primary__9i0Rz').contains('Verify OTP').click()
     cy.on('window:confirm',(str)=>
     {
         cy.wait(5000)            
     }
     )
     cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
     cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
     cy.get('[href="/orders/track-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
     cy.wait(5000)
  })

 it('LabelofDuplicate',function()
 { 
    var data = 0 ;
    
    cy.get('.rs-col-xl-4.rs-col-sm-7 > :nth-child(1) > .Flexbox_flex-row__aKbHb > .Text_body3__jmTqb').click()
    cy.wait(2000)
    cy.get('.Table_margin-top__WE3dn > :nth-child(2) > .rs-picker > .rs-picker-toggle').click()
    cy.get('.rs-anim-fade').within(()=>{
    cy.get('[data-key="100"] > .rs-picker-select-menu-item').click()
    })
    cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($p1,number,$queue)=>
    {   
    cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-stretch__jf368 Flexbox_nowrap__8vOkG rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').eq(data).within(()=>
    {
      cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
    {
     cy.wrap($p1.text()).as('AWB')
    })
    cy.get('.rs-col-xl-3.rs-col-lg-4 > :nth-child(4)').then(($e1)=>
    {
    cy.wrap($e1.text()).as('orderid')
    }).then(()=>
    {
      cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/order/invoices').as('res')
      cy.get('.rs-col-lg-3 > .Flexbox_flex-column__cNkZ2 > .Button_button-ghost__rieSu').click()
  })
  })
  
  cy.get('@AWB').then((AWB)=>
    {
  cy.get('@orderid').then((orderid)=>
    {
      cy.wait(2000)
      cy.wait('@res').then(({request , response}) =>
        {
        const labellink = response.body.data.url
        const downloadPath = 'cypress/downloads/';
         // Remove the specified substring 
         cy.wrap(labellink).as('label')
        })
      })
  }).then(()=>{
  cy.get('@AWB').then((AWB)=>
  {
  cy.get('@orderid').then((orderid)=>
  {
  cy.get('@label').then((label)=>
  {
    cy.log(AWB)
    const awb = AWB.substring(5)
    cy.log(awb)
    cy.log(label)
    const labellink = label.substring(51,(label.length))  
    const downloadPath = 'cypress/downloads/'; 
    const PdfContent = downloadPath+labellink
    cy.wait(10000)
    cy.task('readPdf',PdfContent).should('contain', orderid)
    cy.task('readPdf',PdfContent).should('contain',awb)
      })
     })
    })
   })
   data = data + 1;
  })
 })
})
 
