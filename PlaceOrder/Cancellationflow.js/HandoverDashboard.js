//pending testing unduplicate orders are not handled
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

  describe('NONduplicateOrderflow',function()
  { 
    beforeEach('Login',function()
    {
       cy.visit("http://v2.nushop-dashboard.kaip.in/login/");
       cy.get('.rs-input').type('8309333400')
       cy.get('.Button_button-primary__9i0Rz').contains('Generate OTP').click()
       cy.wait(2000)
       cy.get('.rs-input').type('0000') 
       cy.get('.Button_button-primary__9i0Rz').contains('Verify OTP').click()
       cy.wait(10000)
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
   it('Expired Clubbed AWB', function () {
    //reaching clubbed section of handover state 
  cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click()
  cy.get('.TableHeader_card-container-header__rp1eA > :nth-child(4) > .Text_body3__jmTqb').click()
  cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Handover').click()
  cy.wait(4000)
  cy.get(':nth-child(3) > .rs-picker > .rs-picker-toggle').click().then(() => {
  cy.get('.rs-radio-checker > :nth-child(1) > .RadioPicker_radio-label__p6kzr').contains('Clubbed').click()
    })
  cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()
     .then(()=>{
  cy.get('div[class="HandoverChildViewCard_card__6hKXd"]').each(($e1,index,list)=>{
  cy.get('.HandoverCard_flex-box-wrapper__PRITZ > .HandoverCard_right-arrow-icon__kBHoD').eq(index).click()
  cy.wait(2000)
  cy.get('div[class="HandoverChildViewCard_card__6hKXd"]').each(($p1,num,sequence)=>{
  cy.get('.Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item-5 > [data-sd-event="detailsHandover"]').eq(num).click()
      .then(()=>{
        cy.get('div[class="HandoverChildViewCard_card__6hKXd"]').then(()=>
        {
            cy.get(':nth-child(4) > :nth-child(1) > .Text_headings-colored__kF2dK').then(($a1)=>{
            cy.wrap($e1).as('AWB')
            })
            cy.get('.rs-drawer-body > :nth-child(2) > :nth-child(1) > .Text_headings-colored__kF2dK').then(($b1)=>{
            cy.wrap($b1).as('Clubbedorderid')
            })
           // cy.get('.KeyValue_wrapper__vJVde > :nth-child(6)').each(($c1,index,list)=>{
            cy.get('.KeyValue_wrapper__vJVde > :nth-child(6)').its('length').then(($z)=>{
                count = $z
                count = count-1
                if(count === 2)
                {
                cy.get('.KeyValue_wrapper__vJVde > :nth-child(6)').each(($c1,index,list)=>{
                let order = $c1.text()
                if(order.includes('Sub-Order ID'))
                {
                    if(id1===id2)
                    {
                    id1 = order.substring(12)
                    cy.log(id1)
                    }
                    else
                    {
                        id2 = order.substring(12)
                        cy.log(id2) 
                    }
                }
            })
            cy.get('.rs-drawer-header-close').click()
            cy.get('div[class="HandoverChildViewCard_card__6hKXd"]').eq(num).then(()=>{
            cy.get('.Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item-5 > .button-link').contains('Cancel').click() 
        })
          
           cy.get('.rs-modal-content').within(()=>
           {
           cy.get('.rs-modal-footer > :nth-child(2)').contains('Cancel Order').click()  
           cy.wait(4000)
           }).then(()=>{
           cy.get('.rs-drawer-body').within(()=>{
           cy.get(':nth-child(1) > .rs-flex-box-grid-item-8 > :nth-child(2)').each(($v1,index,list)=>
           {
           let p = $v1.text()
           cy.log(p)
            if(p===id2)
            {
             cy.get(':nth-child(1) > .rs-flex-box-grid-item-3 > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper').eq(index).click()
             cy.wait(1000)
             cy.get('[class="rs-picker-toggle-caret rs-icon"]').click({ force: true })                                                                                   
            }
           })
          })        
       }).then(()=>{
              cy.get('span[class="rs-picker-select-menu-item"]').contains('Doubtful customer').click()
              cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').contains('Cancel Order').click()
              cy.wait(4000)
             //Check if AWB regenerated successfully
             //from here the testing in print starts
             cy.wait(10000)
             cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Print').click()
             cy.wait(7000);
             cy.reload()
             cy.wait(5000)
             cy.get('.rs-input').type(id1);
             cy.get('.rs-input-group-addon').click();  
    cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(0).then(()=>
    {
      cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
    {
     cy.wrap($p1.text()).as('NewAWB')
    })
    cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').eq(0).then(($e1)=>
    {
    let orderid = $e1.text()
    cy.wrap(orderid).as('orderid')
    cy.log(orderid)
    }).then(()=>
    {
    cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created').as('res')
    cy.get('.action-btns-wrapper > .Button_button-primary__9i0Rz').click()
    })
    cy.wait(5000)
   /* cy.get('.rs-modal-content').within(()=>{
      cy.get('[data-sd-event="printAnyways"]')
    })*/
  //cross checking with olderids and AWB captured in EXpired section
 // cy.get('.rs-modal-footer >').contains('Print Anyways').click()
  cy.get('@AWB').then((AWB)=>
    {
  cy.get('@NewAWB').then((NewAWB)=>
    {
  cy.get('@orderid').then((orderid)=>
    {
      if (id1 === orderid && NewAWB !== AWB)
 {  
      cy.wait(2000)
      cy.wait('@res').then(({request , response}) =>
        {
        const labellink = response.body.data.url
        const downloadPath = 'cypress/downloads/';
         // Remove the specified substring 
         cy.wrap(labellink).as('label')
        })
        }
      else{
        cy.fail()
      }
      })
    })
  }).then(()=>{
  
  cy.get('@NewAWB').then((NewAWB)=>
  {
  cy.get('@orderid').then((orderid)=>
  {
  cy.get('@label').then((label)=>
  {
    cy.log(NewAWB)
    const awb = NewAWB.substring(5)
    cy.log(awb)
    cy.log(label)
    const labellink = label.substring(51,(label.length))  
    const downloadPath = 'cypress/downloads/'; 
    const PdfContent = downloadPath+labellink
    cy.wait(10000)
    cy.task('readPdf',PdfContent).should('contain', id1)
    cy.task('readPdf',PdfContent).should('contain',awb)
    //code to reach back to handover clubbed
    cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Handover').click()
    cy.wait(4000)
    cy.get(':nth-child(3) > .rs-picker > .rs-picker-toggle').click().then(() => {
    cy.get('.rs-radio-checker > :nth-child(1) > .RadioPicker_radio-label__p6kzr').contains('Clubbed').click()
      })
    cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()
  })
 })
          })
         })
        })
      
     })
   }
else{
    cy.get('.KeyValue_wrapper__vJVde > :nth-child(6)').each(($c1,index,list)=>{
        let order = $c1.text()
        if(order.includes('Sub-Order ID'))
        {
            if(id1===id2)
            {
            id1 = order.substring(12)
            cy.log(id1)
            }
            else
            {
                id2 = order.substring(12)
                cy.log(id2) 
            }
        }
    })
cy.get('.rs-drawer-header-close').click()
cy.get('div[class="HandoverChildViewCard_card__6hKXd"]').eq(num).then(()=>{
cy.get('.Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item-5 > .button-link').contains('Cancel').click() 
})
  
   cy.get('.rs-modal-content').within(()=>
   {
   cy.get('.rs-modal-footer > :nth-child(2)').contains('Cancel Order').click()  
   cy.wait(4000)
   }).then(()=>{
   cy.get('.rs-drawer-body').within(()=>{
   cy.get(':nth-child(1) > .rs-flex-box-grid-item-8 > :nth-child(2)').each(($v1,index,list)=>
   {
   let p = $v1.text()
   cy.log(p)
    if(p===id2)
    {
     cy.get(':nth-child(1) > .rs-flex-box-grid-item-3 > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper').eq(index).click()
     cy.wait(1000)
     cy.get('[class="rs-picker-toggle-caret rs-icon"]').click({ force: true })                                                                                   
    }
   })
  })        
}).then(()=>{
      cy.get('span[class="rs-picker-select-menu-item"]').contains('Doubtful customer').click()
      cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').contains('Cancel Order').click()
      cy.wait(4000)
     //Check if AWB regenerated successfully
     //from here the testing in print starts
     cy.wait(10000)
     cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Print').click()
     cy.reload()
     cy.get('.Button_button-default__NeJ4p').each(($x1,index,list)=>
     { 
       if(($x1.text()).includes('Clubbed'))
      {
       cy.get('.Button_button-default__NeJ4p').eq(index).click()
      }
     })
     cy.wait(7000);
     cy.get('.rs-input').type(id1);
     cy.get('.rs-input-group-addon').click();  
cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(0).then(()=>
{
cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
{
cy.wrap($p1.text()).as('NewAWB')
})
//this will give new clubbed order id 
cy.get('.PrintPackViewCard_clubbed-parent-card__-FWzM > .PrintPackViewCard_clubbed-parent-divider__DSLtw > .Text_body2__0FftJ').eq(0).then(($e1)=>
{
let orderid = $e1.text()
orderid = orderid.substring(4)
cy.wrap(orderid).as('orderid')
cy.log(orderid)
}).then(()=>
{
cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created').as('res')
cy.get('.action-btns-wrapper > .Button_button-primary__9i0Rz').click()
})
cy.wait(5000)
//cy.get('.rs-modal-footer >').contains('Print Anyways').click()

//cross checking with olderids and AWB captured in EXpired section

cy.get('@AWB').then((AWB)=>
{
cy.get('@NewAWB').then((NewAWB)=>
{
cy.get('@orderid').then((orderid)=>
{
if (NewAWB !== AWB)
{  
cy.wait(2000)
cy.wait('@res').then(({request , response}) =>
{
const labellink = response.body.data.url
const downloadPath = 'cypress/downloads/';
 // Remove the specified substring 
 cy.wrap(labellink).as('label')
})
}
else{
cy.fail()
}
})
})
}).then(()=>{

cy.get('@NewAWB').then((NewAWB)=>
{
cy.get('@orderid').then((orderid)=>
{
cy.get('@label').then((label)=>
{
cy.log(NewAWB)
const awb = NewAWB.substring(5)
cy.log(awb)
cy.log(label)
const labellink = label.substring(51,(label.length))  
const downloadPath = 'cypress/downloads/'; 
const PdfContent = downloadPath+labellink
cy.wait(10000)
cy.task('readPdf',PdfContent).should('contain', orderid)
cy.task('readPdf',PdfContent).should('contain',awb)
//code to reach back to handover clubbed
cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Handover').click()
cy.wait(4000)
cy.get(':nth-child(3) > .rs-picker > .rs-picker-toggle').click().then(() => {
cy.get('.rs-radio-checker > :nth-child(1) > .RadioPicker_radio-label__p6kzr').contains('Clubbed').click()
  })
cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()
})
})
     })
    })
   })
 })    
}
})//this will close at last
 })
})
      })
    })//closing of 68th line
   })//clsoing of line number 64
  })//closing of within block
 })//closing of then loop that brings us after clubbed filter is applied


