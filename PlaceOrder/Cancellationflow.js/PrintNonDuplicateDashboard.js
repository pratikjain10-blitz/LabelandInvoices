

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
        cy.get('.rs-input').type('7908961320')
        cy.get('.Button_button-primary__9i0Rz').contains('Generate OTP').click()
        cy.wait(2000)
        cy.get('.rs-input').type('0000') 
        cy.get('.Button_button-primary__9i0Rz').contains('Verify OTP').click()
        cy.wait(10000)
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
    it('Expired Clubbed AWB', function () {
          //reaching clubbed section of print state 
        cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click()
        cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"').each(($x1,index,list)=>
              { 
                if(($x1.text()).includes('Clubbed'))
               {
                cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"').eq(index).click()
               }
            })
      cy.get('.rs-flex-box-grid-item-4 > .rs-picker > .rs-picker-toggle').click().then(()=>
    { 
      cy.get('.rs-radio-checker').each(($e1,index,list)=>{
      if($e1.text()==='Non Duplicate')
      {
      cy.get('.rs-radio-wrapper').eq(index).click()
      }
    })
})
       
          
          cy.wait(4000);
          cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()
          cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(($e1, index, list) => {
            let count;
          cy.get('[class="PrintPackViewCard_card-border__Qk1I3"]').eq(0).within(() => {
          cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').its('length').then((list)=>
          {
            cy.log(list)
            count = list;
            cy.log(count)
          })
         }).then(()=>{
          if(count===2)
            {
              cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(0).within(() => 
              {
            cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_cursor-pointer__vwE5X"]').contains('AWB').then(($g1) => {
            cy.log($g1.text());
            const oldawb = $g1.text();
            const extractedAwb = oldawb.substring(4);
            cy.wrap(extractedAwb).as('oldawb');
            cy.log(extractedAwb);
                        })
            cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_ml-lg__OZiJy Text_mr-lg__egpT+"]').then(($l1) => {
                // Alias the orderid
                let clubbedid = $l1.text();
                let order = clubbedid.substring(3)
                cy.wrap(order).as('order');
      
                // Log the order
                cy.log(order);
               })
          cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').each(($v1,index,list)=>
          {
            if(index === 0)
            {
            let order1 = $v1.text()
            cy.log(order1)
            cy.wrap(order1).as('order1')
            }
            if(index ===1 )
            {
              let order2 = $v1.text()
              cy.log(order2)
              cy.wrap(order2).as('order2')
            }
          })
          //cancel loop starts here
          cy.get(' .rs-col-lg-3 > .action-btns-wrapper > .button-link').eq(0).click()
         })
            cy.get('@order2').then((order2)=>{
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
             if(p===order2)
             {
              cy.get(':nth-child(1) > .rs-flex-box-grid-item-3 > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper').eq(index).click()
              cy.wait(1000)
              cy.get('[class="rs-picker-toggle-caret rs-icon"]').click({ force: true })                                                                                   
             // cy.get('span[class="rs-picker-select-menu-item"]').contains('Doubtful Order')
             // cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').contains('Cancel Order').click()
             
             }
            })
           })
          })
        }).then(()=>{
               cy.get('span[class="rs-picker-select-menu-item"]').contains('Doubtful customer').click()
               cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').contains('Cancel Order').click()
              // cy.get('button[class="Button_button-ghost__rieSu button-loading-undefined rs-btn rs-btn-ghost rs-btn-md"]').contains('Confirm').click();
               cy.wait(4000)
              //Check if AWB regenerated successfully
              //from here the testing in print starts
              //  cy.get(':nth-child(1) > .tab').click();
                cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"]').contains('Single').click()
                cy.wait(7000);
      
                // Access the aliased orderid outside the previous block
                cy.get('@order1').then((order1)=>{
                cy.get('@order').then((order) => {
                  // Log the orderid again
                cy.log(order);
                cy.wait(10000)
                //cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"]').contains('Clubbed').click()
                cy.get('.rs-input').type(order1);
                cy.get('.rs-input-group-addon').click();
                  
 cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(($p1,number,$queue)=>
    {   
    cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(number).within(()=>
    {
      cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
    {
     cy.wrap($p1.text()).as('AWB')
    })
    cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').eq(0).then(($e1)=>
    {
    let orderid = $e1.text()
    cy.wrap(orderid).as('orderid')
    cy.log(orderid)
    })})}).then(()=>
    {
    cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created').as('res')
    cy.get('.action-btns-wrapper > .Button_button-primary__9i0Rz').click()
    })
   //cy.get('.rs-modal-footer >').contains('Print Anyways').click()
  
  //cross checking with olderids and AWB captured in EXpired section
  cy.get('@order1').then((order1)=>{
  cy.get('@order').then((order)=>
    {
  cy.get('@oldawb').then((oldawb)=>
    {
  cy.get('@AWB').then((AWB)=>
    {
  cy.get('@orderid').then((orderid)=>
    {
      if (order1 === orderid && oldawb !== AWB)
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
    })
  })
}).then(()=>{
  cy.get('@order1').then((order1)=>
  {
  cy.get('@AWB').then((AWB)=>
  {
  cy.get('@orderid').then((orderid)=>
  {
  cy.get('@label').then((label)=>
  {
    cy.log(AWB)
    const awb = AWB.substring(5,AWB.length)
    cy.log(awb)
    cy.log(label)
    const labellink = label.substring(51,(label.length))  
    const downloadPath = 'cypress/downloads/'; 
    const PdfContent = downloadPath+labellink
    cy.wait(10000)
    cy.task('readPdf',PdfContent).should('contain', order1)
    cy.task('readPdf',PdfContent).should('contain',awb)

    cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click()
    cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"').each(($x1,index,list)=>
          { 
            if(($x1.text()).includes('Clubbed'))
           {
            cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"').eq(index).click()
           }
        })
  cy.get('.rs-input').click().clear()
  cy.get('.rs-input-group-addon').click()
  cy.get('.rs-flex-box-grid-item-4 > .rs-picker > .rs-picker-toggle').click().then(()=>
{ 
  cy.get('.rs-radio-checker').each(($e1,index,list)=>{
  if($e1.text()==='Non Duplicate')
  {
  cy.get('.rs-radio-wrapper').eq(index).click()
  }
})
cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()
cy.wait(2000)



    
      })
     })
    })
    })
   })
  })
  })
})
})
}    
   
    else{
      
        cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(index).within(() => 
        {
      cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_cursor-pointer__vwE5X"]').contains('AWB').then(($g1) => {
      cy.log($g1.text());
      const oldawb = $g1.text();
      const extractedAwb = oldawb.substring(5);
      cy.wrap(extractedAwb).as('oldawb');
      cy.log(extractedAwb);
                  })
      cy.get('p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_cursor-pointer__vwE5X"]').then(($l1) => {
          // Alias the orderid
          let clubbedid = $l1.text();
          let order = clubbedid.substring(3)
          cy.wrap(order).as('order');

          // Log the order
          cy.log(order);
         })
    cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').each(($v1,index,list)=>
    {
      if(index === 0)
      {
      let order1 = $v1.text()
      cy.log(order1)
      cy.wrap(order1).as('order1')
      }
      if(index ===1 )
      {
        let order2 = $v1.text()
        cy.log(order2)
        cy.wrap(order2).as('order2')
      }
    })
    //cancel loop starts here
    cy.get(' :nth-child(2) > .rs-col-lg-3 > .action-btns-wrapper > .button-link').click()
    })
      cy.get('@order2').then((order2)=>{
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
       if(p===order2)
       {
        cy.get(':nth-child(1) > .rs-flex-box-grid-item-3 > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper').eq(index).click()
        cy.wait(1000)
        cy.get('[class="rs-picker-toggle-caret rs-icon"]').click({ force: true })                                                                                   
       // cy.get('span[class="rs-picker-select-menu-item"]').contains('Doubtful Order')
       // cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').contains('Cancel Order').click()
       
       }
      })
     })
    })
  }).then(()=>{
         cy.get('span[class="rs-picker-select-menu-item"]').contains('Doubtful customer').click()
         cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').contains('Cancel Order').click()
        // cy.get('button[class="Button_button-ghost__rieSu button-loading-undefined rs-btn rs-btn-ghost rs-btn-md"]').contains('Confirm').click();

        //Check if AWB regenerated successfully
        //from here the testing in print starts         
          // Access the aliased orderid outside the previous block
          cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Pack').click()
          cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Print').click().then(()=>{
            cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Clubbed').click()
          })

          cy.get('@order1').then((order1)=>{
          cy.get('@order').then((order) => {
            // Log the orderid again
          cy.log(order);
          cy.wait(10000)
          //cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"]').contains('Clubbed').click()
          cy.get('.rs-input').type(order1);
          cy.get('.rs-input-group-addon').click();
         


            
cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(($p1,number,$queue)=>
{   
cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(number).within(()=>
{
cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
{
cy.wrap($p1.text()).as('AWB')
})
cy.get(' .PrintPackViewCard_clubbed-parent-card__-FWzM > .PrintPackViewCard_clubbed-parent-divider__DSLtw > .Text_body2__0FftJ').then(($e1)=>
{
let orderid = $e1.text()
cy.wrap(orderid).as('orderid')
cy.log(orderid)
})})}).then(()=>
{
cy.intercept('POST','http://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created').as('res')
cy.get('.action-btns-wrapper > .Button_button-primary__9i0Rz').click()
})
//cy.get('.rs-modal-footer > .Button_button-ghost__rieSu').contains('Print All').click()

//cross checking with olderids and AWB captured in EXpired section
cy.get('@order2').then((order2)=>
{
cy.get('@order').then((order)=>
{
cy.get('@oldawb').then((oldawb)=>
{
cy.get('@AWB').then((AWB)=>
{
cy.get('@orderid').then((orderid)=>
{
if (order != orderid && oldawb !== AWB)
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
})
})
}).then(()=>{
cy.get('@order1').then((order1)=>
{
cy.log(order1)
cy.get('@order2').then((order2)=>
{
cy.log(order2)
cy.get('@AWB').then((AWB)=>
{
cy.log(AWB)
cy.get('@orderid').then((orderid)=>
{
cy.log(orderid)
cy.get('@label').then((label)=>
{
cy.log(label)
cy.log(AWB)
const awb = AWB.substring(5,AWB.length)
cy.log(awb)
cy.log(label)
const labellink = label.substring(51,(label.length))  
const downloadPath = 'cypress/downloads/'; 
const PdfContent = downloadPath+labellink
cy.wait(10000)
cy.task('readPdf',PdfContent).should('contain', orderid)
cy.task('readPdf',PdfContent).should('contain',awb)



cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click()
        cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"').each(($x1,index,list)=>
              { 
                if(($x1.text()).includes('Clubbed'))
               {
                cy.get('button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"').eq(index).click()
               }
            })
            cy.get('.rs-input').click().clear()
            cy.get('.rs-input-group-addon').click()
            cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()

      cy.get('.rs-flex-box-grid-item-4 > .rs-picker > .rs-picker-toggle').click().then(()=>
    { 
      cy.get('.rs-radio-checker').each(($e1,index,list)=>{
      if($e1.text()==='Non Duplicate')
      {
      cy.get('.rs-radio-wrapper').eq(index).click()
      }
    })
})
})
})
})
})
})
})
})
})
})
}      
            
                 

                
                         
   })
  })
 })
})
      
      
      
        
      
    
