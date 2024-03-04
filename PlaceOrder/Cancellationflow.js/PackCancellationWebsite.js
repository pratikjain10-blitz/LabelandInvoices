
/// <reference types="Cypress" />
/// <reference types="cypress-downloadfile"/>
const { execSync } = require('child_process');
const { readFile } = require('fs');
const path = require('path');
var id;
const fs = require('fs');
const pdf = require('pdf-parse');
var web_cancel;
var invoiceid;
var labelpdf = '';
var oldawb;
var order1,order2;
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
  describe('duplicateOrderflow',function()
{ 
let count;
  before('NONduplicateOrderflow',function()
{ 
  count = 0;
})  



  it('NONduplicateOrderflow',function()
  {
    cy.visit('http://v2.nushop-dashboard.kaip.in/')
    cy.visit("http://v2.nushop-dashboard.kaip.in/login/");
    cy.get('.rs-input').type('7908961320')
    cy.get('.Button_button-primary__9i0Rz').contains('Generate OTP').click()
    cy.wait(2000)
    cy.get('.rs-input').type('0000') 
    cy.get('.Button_button-primary__9i0Rz').contains('Verify OTP').click()
    cy.wait(10000)
    
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/orders/process-orders"] > .Text_body2__0FftJ').click()
        cy.wait(5000)            
        .then(()=>{
      cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click().then(()=>{
      cy.wait(1000)
      cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]').contains('Pack').click()
      cy.get('.Button_button-default__NeJ4p').each(($x1,index,list)=>
              { 
                if(($x1.text()).includes('Clubbed'))
               {
                cy.get('.Button_button-default__NeJ4p').eq(index).click()
               }
            }).then(()=>{
      
    })
  })
})
       
          .then(()=>{ 
          cy.wait(4000);
          //cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()
          cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(($e1, index, list) => {
          cy.get('[class="PrintPackViewCard_card-border__Qk1I3"]').eq(0).within(() => {
          cy.get('.rs-col-lg-4.rs-col-sm-7 > :nth-child(5)').its('length').then((list)=>
          {
            cy.log(list)
            count = list;
            cy.log(count)
          })
         }).then(()=>{
              //storing any 2 order ids of the clubbed orders
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
            order1 = $v1.text()
            cy.log(order1)
            cy.wrap(order1).as('order1')
            }
            if(index ===1 )
            {
              let order2 = $v1.text()
              web_cancel = order2
              cy.wrap(order2).as('order2')
            }
          })
        })
      })
    })
  })
})
    

  
it('CancelWebsiteflow',function()
  {
    cy.visit('http://pratikj.nushop.kaip.in/')
    cy.wait(4000)
    //cy.get('div[class="css-2f3j1g"]').click()
    cy.get(':nth-child(2) > .css-6sjl2w-X > .css-1tu2nel').click()
    cy.get('.css-1vw8438').type('7908961320')
    cy.wait(4000)
    cy.get('.css-2f3j1g').click()
    cy.get('.css-tpv9t0').each(($e1,index,list)=>
    {
      cy.get('.css-tpv9t0').eq(index).type('0')
    })
    cy.get('.css-2f3j1g').click()
    cy.wait(5000)




    let link = 'http://pratikj.nushop.kaip.in/orders/'
    cy.log(web_cancel)
    let web_link =link+web_cancel
    cy.log(web_link)
    cy.visit(web_link)
    cy.wait(5000)
    cy.get('.css-19qf114 > .css-2f3j1g').click()
    cy.wait(2000)
    cy.get('#found_better_product_on_another_website').click().then(()=>{
      cy.get('div[class="css-1b6cfry"]').each(($e1,index,list)=>
      {
        if($e1.text().includes('Cancel'))
        {
          cy.get('div[class="css-1b6cfry"]').eq(index).click()  
        }
      })
      cy.wait(10000)
          })
  })
  it('dashboarVerificationFlow',function()
  {
    cy.visit("http://v2.nushop-dashboard.kaip.in/login/");
    cy.get('.rs-input').type('7908961320')
    cy.get('.Button_button-primary__9i0Rz').contains('Generate OTP').click()
    cy.wait(2000)
    cy.get('.rs-input').type('0000') 
    cy.get('.Button_button-primary__9i0Rz').contains('Verify OTP').click()
    cy.wait(10000)
    cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
    cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
    cy.get('[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
    cy.wait(5000)   
    cy.get('.rs-col-lg-5.rs-col-md-5 > .Text_body3__jmTqb').click()
    //dividing on count of clubbing that was present
    cy.log(count)
    
    if(count===2)
    {
      cy.get('.rs-input').type(order1);
      cy.get('.rs-input-group-addon').click();
      //Verification block
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
     cy.get('.rs-modal-footer >').contains('Print Anyways').click()
     cy.wait(10000)
    
    //cross checking with olderids and AWB captured in EXpired section
      
      
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
    .then(()=>{    
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
      cy.task('readPdf',PdfContent).should('contain', orderid)
      cy.task('readPdf',PdfContent).should('contain',awb)  
      })
     })
    })
  })
}
  
  
    else
    {
      cy.get('.Button_button-default__NeJ4p').each(($x1,index,list)=>
              { 
                if(($x1.text()).includes('Clubbed'))
               {
                cy.get('.Button_button-default__NeJ4p').eq(index).click()
               }
            }).then(()=>{

      cy.get('.rs-input').type(order1);
      cy.get('.rs-input-group-addon').click();
            })
      //Verification block
      cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(($p1,number,$queue)=>
      {   
      cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').eq(number).within(()=>
      {
        cy.get('.rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($p1)=>
      {
       cy.wrap($p1.text()).as('AWB')
      })
      cy.get('.PrintPackViewCard_clubbed-parent-divider__DSLtw > .Text_body2__0FftJ').eq(0).then(($l1) => {
        // Alias the orderid of clubbed order
        const order = $l1.text().trim();
        order = order.substring(5)
        cy.wrap(order).as('order');

        // Log the order
        cy.log(order);
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
      cy.wait(1000)
     cy.get('.rs-modal-footer >').contains('Print All').click()
     cy.wait(10000)
    
    //cross checking with olderids and AWB captured in EXpired section
      
      
    cy.get('@AWB').then((AWB)=>
      {
    cy.get('@orderid').then((orderid)=>
      {
        if (order1 === orderid && oldawb !== AWB)
   {  
        cy.wait(1000)
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
    .then(()=>{   
    cy.get('@order').then((order)=>
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
      cy.task('readPdf',PdfContent).should('contain', order)
      cy.task('readPdf',PdfContent).should('contain',awb)  
      })
     })
    })
  })
})
}
})
})
}  //closing of for loop    
      
        
      
    
