//code is done just need to check why is it not able to see the content inside the label 
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
let id1;
let id2;
let count;
Cypress.on('uncaught:exception', (err, runnable) => {
  // Log the error without failing the test
  console.error('Uncaught Exception:', err.message);
  // Prevent Cypress from failing the test
  return false;
})
function stringToBinary(str) {
    const binaryArray = [];
    for (let i = 0; i < str.length; i++) {
      const binaryChar = str.charCodeAt(i).toString(2);
      binaryArray.push(binaryChar);
    }
    return binaryArray.join(' ');
  }
  for(let i=0;i<10;i++)
  {
  describe('NONduplicateOrderflow',function()
  { 
    beforeEach('Login',function()
    {
       cy.visit("http://v2.nushop-dashboard.kaip.in/login/");
       cy.get('.rs-input').type('9495760332')
       cy.get('.Button_button-primary__9i0Rz').contains('Generate OTP').click()
       cy.wait(2000)
       cy.get('.rs-input').type('0000') 
       cy.get('.Button_button-primary__9i0Rz').contains('Verify OTP').click()
       cy.wait(10000)
       cy.on('window:confirm',(str)=>
       {
        return false;
       }
       )
       cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(4)').click()
       cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb').contains('Orders').click()
       cy.get('[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
       cy.wait(5000)
       Cypress.on('uncaught:exception', (err, runnable) => {
        // Your custom handling logic goes here
        // For example, you can log the error or take other actions
        console.error('Uncaught exception:', err.message);
        // Optionally, you can prevent the default behavior (fail the test)
        // by returning false
        return false;
      })
   cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click()
   cy.get('.TableHeader_card-container-header__rp1eA > :nth-child(4) > .Text_body3__jmTqb').click()
   cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Handover').click()
   cy.wait(4000)
   cy.get(':nth-child(3) > .rs-picker > .rs-picker-toggle').click().then(() => {
   cy.get('.rs-radio-checker > :nth-child(1) > .RadioPicker_radio-label__p6kzr').contains('Clubbed').click()
   cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()
  })
 })// closing braces of before each block
 it('Expired Clubbed AWB', function () {
    cy.get('div[class="HandoverChildViewCard_card__6hKXd"]').eq(0).then(($e1)=>{
    cy.get('.HandoverCard_flex-box-wrapper__PRITZ > .HandoverCard_right-arrow-icon__kBHoD').eq(0).click()
    cy.wait(2000)
    cy.get('div[class="HandoverChildViewCard_card__6hKXd"]').eq(0).within(()=>{
    cy.get('.Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item-8 > :nth-child(2)').then(($p1)=>{
    var id1 = $p1.text().substring(18)
    cy.wrap(id1).as('orderid')
    cy.log(id1)
    })
    cy.get('.Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item-8 > .Text_subtitles-colored__s5ggG').then(($x1)=>
    {
      var id2 =$x1.text().substring(3)
      cy.wrap(id2).as('Awb')
      cy.log(id2)
    })
  })
      cy.get('.Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item-5 > [data-sd-event="logisticHandOver"]').eq(0).click()
        .then(()=>{
        cy.get(':nth-child(4) > .Input_input-group__c6y0f').clear().type('700019')
        cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').click()
        cy.get('.rs-modal-footer > .Button_button-primary__9i0Rz').click()
        cy.wait(4000)
        cy.get('.Button_button-default__NeJ4p').each(($x1,index,list)=>
              { 
                if(($x1.text()).includes('Clubbed'))
               {
                cy.get('.Button_button-default__NeJ4p').eq(index).click()
               }
            })
        cy.get('@orderid').then((orderid)=>
        {
        cy.get('.rs-input').type(orderid)
        cy.get('.rs-input-group-addon').click()
        cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(0).within(()=>
    {
    cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
     {
    cy.wrap($p1.text().substring(5)).as('NewAWB')
     })
    })
    .then(()=>
    {
    cy.wait(7000)
    cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created').as('res')
    cy.get('.action-btns-wrapper > .Button_button-primary__9i0Rz').eq(0).click()
    })
  
  cy.get('@NewAWB').then((NewAWB)=>
  {
  cy.get('@Awb').then((Awb)=>
    {
  cy.get('@orderid').then((orderid)=>
    {
        if(Awb != NewAWB)
        {
      cy.wait(2000)
      cy.get('.rs-modal-footer >').contains('Print All').click()
      cy.wait('@res').then(({request , response}) =>
        {
         const labellink = response.body.data.url
         cy.wrap(labellink).as('label')
        })
        }
       })
      })
     })
    .then(()=>{
  cy.get('@NewAWB').then((NewAWB)=>
  {
  cy.get('@Awb').then((Awb)=>
  {
  cy.get('@orderid').then((orderid)=>
  {
  cy.get('@label').then((label)=>
  {
    cy.log(Awb)
    cy.log(label)
    const labellink = label.substring(51)  
    const downloadPath = 'cypress/downloads/'; 
    const PdfContent = downloadPath+labellink
    cy.wait(10000)
    cy.task('readPdf',PdfContent).should('contain', orderid)
    cy.task('readPdf',PdfContent).should('contain',NewAWB)
    cy.task('readPdf',PdfContent).should('contain','700019')

  })
  })
  })     
  })
      })

        })
      }) 
    })
   })
 }) // closing braces of describe block
}