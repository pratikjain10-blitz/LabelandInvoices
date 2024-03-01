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
     }
     )
     cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
     cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
     cy.get('[href="/orders/process-orders"] > .Text_body2__0FftJ').click()
     cy.wait(5000)
    })

 it('LabelofDuplicate',function()
 {
    //cy.get('.rs-flex-box-grid-item-4 > .rs-picker > .rs-picker-toggle').click()

    cy.get('.rs-flex-box-grid-item-4 > .rs-picker > .rs-picker-toggle').click().then(()=>
    { 
      cy.get('label[class="RadioPicker_radio-label__p6kzr"]').should('be.visible').contains('Duplicate').click()
      
    })
    cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').click()
    cy.wait(2000)
    cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(($p1,number,$queue)=>
    {   
    cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(number).within(()=>
    {
      cy.get('.PrintPackViewCard_card__Y4Iaa > :nth-child(2) > .rs-col-xl-5 > .Flexbox_flex-row__aKbHb.PrintPackViewCard_product-info__h99UQ > .PrintPackViewCard_product-info__h99UQ > :nth-child(1) > .Text_body2__0FftJ').then(($v1)=>{
      cy.wrap($v1.text()).as('product_name')
      cy.log($v1.text())
      })
      cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
    {
     cy.wrap($p1.text()).as('AWB')
    })
    cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').then(($e1)=>
    {
    cy.wrap($e1.text()).as('orderid')
    }).then(()=>
    {
    cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created').as('res')
    cy.get('.action-btns-wrapper > .Button_button-primary__9i0Rz').click()
    })
  })
  cy.get('@AWB').then((AWB)=>
    {
  cy.get('@orderid').then((orderid)=>
    {
      cy.wait(2000)
      cy.get('.rs-modal-footer >').contains('Print Anyways').click()
      cy.wait('@res').then(({request , response}) =>
        {
        const labellink = response.body.data.url
        const downloadPath = 'cypress/downloads/';
         // Remove the specified substring 
         cy.wrap(labellink).as('label')
        })
    }).then(()=>{
  cy.get('@product_name').then((product_name)=>
      {    
  cy.get('@AWB').then((AWB)=>
  {
  cy.get('@orderid').then((orderid)=>
  {
  cy.get('@label').then((label)=>
  {
    cy.log(AWB)
    const awb = AWB.substring(5,AWB.length-1)
    cy.log(awb)
    cy.log(label)
    const labellink = label.substring(51,(label.length))  
    const downloadPath = 'cypress/downloads/'; 
    const PdfContent = downloadPath+labellink
    cy.wait(10000)
    cy.task('readPdf',PdfContent).should('contain', orderid)
    cy.task('readPdf',PdfContent).should('contain',awb)
    cy.task('readPdf',PdfContent).should('contain',product_name)
    
      
  })
      })
    })
   })
  })
 })
})
})
it('Label of Non Duplicate',function()
 {
    //cy.get('.rs-flex-box-grid-item-4 > .rs-picker > .rs-picker-toggle').click()

    cy.get('.rs-flex-box-grid-item-4 > .rs-picker > .rs-picker-toggle').click().then(()=>
    { 
      cy.get('label[class="RadioPicker_radio-label__p6kzr"]').should('be.visible').contains('Non Duplicate').click()
      
    })
    cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').click()
    cy.wait(2000)
    cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(($p1,number,$queue)=>
    {   
    cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(number).within(()=>
    {
      cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
    {
     cy.wrap($p1.text()).as('AWB')
    })
    cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').then(($e1)=>
    {
    cy.wrap($e1.text()).as('orderid')
    }).then(()=>
    {
    cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created').as('res')
    cy.get('.action-btns-wrapper > .Button_button-primary__9i0Rz').click()
    })
  })
  
  cy.get('@AWB').then((AWB)=>
    {
  cy.get('@orderid').then((orderid)=>
    {
      cy.wait(2000)
      //cy.get('.rs-modal-footer >').contains('Print Anyways').click()
      cy.wait('@res').then(({request , response}) =>
        {
        const labellink = response.body.data.url
        const downloadPath = 'cypress/downloads/';
         // Remove the specified substring 
         cy.wrap(labellink).as('label')
        })
      


    }).then(()=>{
  cy.get('@AWB').then((AWB)=>
  {
  cy.get('@orderid').then((orderid)=>
  {
  cy.get('@label').then((label)=>
  {
    cy.log(AWB)
    const awb = AWB.substring(5,AWB.length-1)
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
 })
})
})
})
 
