//loop hole of parallel execution is that we are not able to check sahi mein regerate hua hai ya nahi
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
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error without failing the test
    console.error('Uncaught Exception:', err.message);
    // Prevent Cypress from failing the test
    return false;
  })
  describe('MultipleRegeneration',function()
{ 
  
    beforeEach('settingup',function()
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
        cy.get('[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.wait(5000)
    })
    it('Expired Single AWB', function () {
          cy.get(':nth-child(2) > .tab').click();
          cy.get('.ExpiredAWBOrdersCard_card__2yYch > :nth-child(2)').each(($p1,number,$queue)=> //getting the expired cards 
          {
           if(number<=5)
           {
            cy.get('.ExpiredAWBOrdersCard_card__2yYch > :nth-child(1) > .ExpiredAWBOrdersCard_card-cell-checkbox__NX5dd > .Flexbox_flex-column__cNkZ2 > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper').eq(number).click()
           }
          })
          cy.get('.Flexbox_align-top__Nx4Aj > .Button_button-primary__9i0Rz').click()
          cy.get('.rs-modal-footer > :nth-child(2)').click()
          cy.wait(4000)
        })
        it('Expired Clubbed AWB', function () {
            cy.get(':nth-child(2) > .tab').click();
            cy.get(':nth-child(3) > .rs-picker > .rs-picker-toggle').click().then(() => {
                cy.get('.rs-radio-checker > :nth-child(1) > .RadioPicker_radio-label__p6kzr').contains('Clubbed').click()
                })

            cy.get('.rs-btn-toolbar > .Button_button-ghost__rieSu').contains('Apply Filters').click()
            cy.get('div[class="Flexbox_flex-row__aKbHb Flexbox_align-middle__-J0b5 ExpiredAWBOrdersCard_clubbed-parent-card__1-FJb rs-flex-box-grid rs-flex-box-grid-top rs-flex-box-grid-start"]').each(($p1,number,$queue)=>{
                if(number<=5)
             {            
            cy.get(' .ExpiredAWBOrdersCard_clubbed-parent-card__1-FJb > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper').eq(number).click()
             }
            })
            cy.get('.Flexbox_align-top__Nx4Aj > .Button_button-primary__9i0Rz').click()
            cy.get('.rs-modal-footer > :nth-child(2)').click()
          })
          })
          

