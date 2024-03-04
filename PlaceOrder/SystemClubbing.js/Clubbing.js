/// <reference types="Cypress" />
import 'cypress-xpath';
/// <reference types="cypress-downloadfile"/>
import 'cypress-file-upload';
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
var order1;
var order2;
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
  for(let i=0;i<3;i++)
  {
    describe('duplicateOrderflow',function()
{ 
    it('UploadingCatalogueFile',function()
  {
    cy.visit('http://v2.nushop-dashboard.kaip.in/')
    cy.visit("http://v2.nushop-dashboard.kaip.in/login/");
    cy.get('.rs-input').type('7908961320')
    cy.get('.Button_button-primary__9i0Rz').contains('Generate OTP').click()
    cy.wait(2000)
    cy.get('.rs-input').type('0000') 
    cy.get('.Button_button-primary__9i0Rz').contains('Verify OTP').click()
    cy.wait(10000)
    cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(5)').click()
    cy.get(':nth-child(8) > :nth-child(2) > .Flexbox_flex-row__aKbHb').click()
    cy.get('[href="/product/manage"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
    cy.get(':nth-child(4) > .tab').click()
    cy.wait(4000)
    cy.xpath("//*[@id='root']/section/section/section/div[2]/div[2]/div/div[2]/div[1]/div[4]/div/div[1]/input").click({force: true}).attachFile('Cataloguecreation.csv')
    cy.wait(5000)
    cy.get('.rs-modal-content').within(()=>{
    cy.get('.button-link').click()
    })
    cy.get('.rs-modal-content').within(()=>{
    cy.get('.Flexbox_flex-row__aKbHb.Flexbox_align-middle__-J0b5.rs-flex-box-grid-center > :nth-child(1)').type('0000')
    cy.get('.rs-modal-footer > .Button_button-primary__9i0Rz').contains('Verify').click()
    })
    cy.wait(50000)
    cy.reload()
    })
    it('PlacementOrderSystemClubbingWebsiteflow',function()
    {
      cy.visit('http://pratikj.nushop.kaip.in/')
      cy.wait(4000)
      cy.get('.css-5gxtus > a').click()
      cy.get('.css-5tfm2q').type('PROD01')
      cy.get(':nth-child(1) > .css-1bkty0y > .css-zejslb > :nth-child(1)').click()
      cy.get('.css-1jt1w2w > .css-2f3j1g').click()
      cy.get('.css-1vw8438').type('7908961320')
      cy.get('.css-2f3j1g').click()
      cy.get(':nth-child(2) > .css-pqx7va > .css-1mnj8i4 > .css-5tfm2q').type('Pratik Jain')
      cy.get(':nth-child(3) > .css-pqx7va > .css-1mnj8i4 > .css-5tfm2q').type('700019')
      cy.get(':nth-child(4) > .css-pqx7va > .css-1mnj8i4 > .css-5tfm2q').type('123')
      cy.get('.css-kkzpvp').type('Rangpur Road , Ballygunje , Kolkata-700019')
      cy.get('.css-2f3j1g').click()
      cy.get(':nth-child(3) > .css-1jxsi8s > .css-k80332').click()
      cy.get('.css-2f3j1g').click()
      cy.get(':nth-child(1) > .css-tpv9t0').type('0000')
      cy.get('.css-2f3j1g').click()
      cy.wait(2000)
      cy.get('.css-1qdofbj').click()
      cy.get('.css-5gxtus > a').click()
      cy.get('.css-5tfm2q').type('PROD02')
      cy.get(':nth-child(1) > .css-1bkty0y > .css-zejslb > :nth-child(1)').click()
      cy.get('.css-1jt1w2w > .css-2f3j1g').click()
      cy.get('.css-2f3j1g').click()
      cy.get('.css-k80332 > .css-1g1oew2 > .css-ha9uku > .css-1aq4tuo').contains('COD').click()
      cy.get('.css-2f3j1g').click()
      cy.get('.css-19qf114 > .css-2f3j1g').click()
      cy.get(':nth-child(8) > .css-1gqor3r').then(($x1)=>{
      cy.log($x1.text())
      cy.wrap($x1.text()).as('order')

      })
      cy.get('@order').then((order)=>{
      order1 = order
      cy.log(order1)
      cy.wait(4000)
       })
     })
    it('DeletingCatalogueAndVerificationofSystemClubbing',function()
    {
      cy.visit("http://v2.nushop-dashboard.kaip.in/login/")
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
        cy.wait(4000)
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.get('.TableHeader_card-container-header__rp1eA > :nth-child(4)').click()
        cy.wait(5000)
        cy.get('.Button_button-default__NeJ4p').each(($x1,index,list)=>
              { 
                if(($x1.text()).includes('Clubbed'))
               {
                cy.get('.Button_button-default__NeJ4p').eq(index).click()
               }
         })
         cy.get('.rs-input').type(order1)
         cy.get('.rs-input-group-addon').click()
         cy.get('.PrintPackViewCard_clubbed-parent-card__-FWzM > .PrintPackViewCard_clubbed-parent-divider__DSLtw > .Text_body2__0FftJ').eq(0).then(($z1)=>
         { // Wrap the text content of the element and alias it as 'order'
             cy.wrap($z1.text()).as('order');
             cy.get('.Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X').then(($s1)=>{
              cy.wrap($s1.text()).as('Awb')
              })
             // Access the aliased 'order' and perform actions
             cy.get('@Awb').then((Awb) => {
             cy.get('@order').then((order) => {
             // Modify 'order' to avoid naming conflict
             const len = order.length;
             const modifiedOrder = order.substring(4);
             const modifiedAwb = Awb.substring(5);
             cy.log(modifiedAwb)

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
                             cy.task('readPdf',PdfContent).should('contain',modifiedOrder)
                             cy.task('readPdf',PdfContent).should('contain',modifiedAwb)
                         
                         });
                     });
                 });
             });
         });
       });
       cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(5)').click()
       cy.get(':nth-child(8) > :nth-child(2) > .Flexbox_flex-row__aKbHb').click()
       cy.get('[href="/product/manage"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
       cy.get('.rs-col-xl-4 > :nth-child(1) > .Flexbox_flex-row__aKbHb > .Text_body3__jmTqb').click()  
       cy.get(':nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('PROD002')
       cy.get('.Flexbox_gutter-sm__kuLks > :nth-child(2) > .Button_button-ghost__rieSu').click()
       cy.get('.Button_button-primary__9i0Rz.rs-btn-red').click()
       cy.wait(2000)
       cy.get('.rs-modal-content').within(()=>{
       cy.get('.rs-modal-footer > .Button_button-primary__9i0Rz').click()
       })
       cy.wait(1000)
       cy.get('.rs-modal-content').within(()=>{
       cy.get('.rs-modal-footer > .button-link').click()
       })
       cy.get('.rs-modal-content').within(()=>{
       cy.get('.Flexbox_flex-row__aKbHb.Flexbox_align-middle__-J0b5.rs-flex-box-grid-center > :nth-child(1)').type('0000')
       cy.get('.rs-modal-footer > .Button_button-primary__9i0Rz').click()
       cy.wait(2000)
      })
      cy.get(':nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear()
      cy.get(':nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('PROD001')
       cy.get('.Flexbox_gutter-sm__kuLks > :nth-child(2) > .Button_button-ghost__rieSu').click()
       cy.get('.Button_button-primary__9i0Rz.rs-btn-red').click()
       cy.wait(2000)
       cy.get('.rs-modal-content').within(()=>{
       cy.get('.rs-modal-footer > .Button_button-primary__9i0Rz').click()
       })
       cy.wait(1000)
       cy.get('.rs-modal-content').within(()=>{
       cy.get('.rs-modal-footer > .button-link').click()
       })
       cy.get('.rs-modal-content').within(()=>{
       cy.get('.Flexbox_flex-row__aKbHb.Flexbox_align-middle__-J0b5.rs-flex-box-grid-center > :nth-child(1)').type('0000')
       cy.get('.rs-modal-footer > .Button_button-primary__9i0Rz').click()
       cy.wait(2000)
      })
    })
  })
 }    