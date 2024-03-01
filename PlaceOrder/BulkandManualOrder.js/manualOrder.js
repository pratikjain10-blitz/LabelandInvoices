/// <reference types="Cypress" />
/// <reference types="cypress-downloadfile"/>
describe('Placeorder/Catalogue/SingleNormalOrder/Discountfunctionality',function()
{
  var orderid = '';
  var invoiceid= '';
  var labelpdf = '';
  var preferredLP = '';
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
            cy.get('.rs-modal-footer > .Button_button-primary__9i0Rz').click()
        }
        )
        cy.wait(2000)
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(10)').click()
        cy.get(':nth-child(17) > :nth-child(2) > .Flexbox_flex-row__aKbHb').click()
        cy.get('[href="/settings/courier-preferences"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.get('.heading3').eq(1).then(($e1)=>
        {
            preferredLP = $e1.text()
            cy.log(preferredLP)
                       
        })
        cy.wait(4000)
       // cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/orders/place-order"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.get(':nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('7878787878')
        //cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('Pratik')
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input')
          .type('Jcr layout panathur bangalore')
        cy.get('.rs-btn-toolbar > :nth-child(2)').click()
        cy.get('.Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz').click()
  })
     it('Manual Order',function()
       {
        cy.get('.Button_button-ghost__rieSu').contains('Add Manually').click()
        cy.get('.rs-drawer-body > :nth-child(2) > .Text_body2__0FftJ').invoke('show')
        cy.get('[placeholder="Enter Product Name"]').type('test')
        cy.get('.rs-picker-toggle-value').contains('01').click()
        cy.wait(2000)
        cy.get('[data-key="3"] > .rs-picker-select-menu-item').click()
        cy.get('[placeholder="Enter Per Quantity Selling Price"]').type('60')
        cy.get('[placeholder="In kg (Max 30 kg)"]').type('15')
        cy.wait(2000)
        cy.get(':nth-child(14) > .rs-picker > .rs-picker-toggle > .rs-stack > [style="flex-grow: 1; overflow: hidden;"] > .rs-picker-toggle-value').contains('0').click()
        cy.wait(2000)
        cy.get('[data-key="5"] > .rs-picker-select-menu-item').click()
        cy.get('[placeholder="Enter Product Description"]').type('testing with Automation')
        cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').click()
        cy.wait(5000)
        cy.get('.CourierPartnerCard_courier-partner-card__pV9GA > .CourierPartnerCard_courier-card-body__Bx7jb > .heading4').each(($e1,index,$list) =>
        {
          if($e1.text()==='EKART SURFACE')
          {
            cy.get('.CourierPartnerCard_courier-partner-card__pV9GA > .CourierPartnerCard_courier-card-body__Bx7jb > .heading4').eq(index).click()
          }
          
        }
        )
        cy.get('.rs-flex-box-grid-end > .Button_button-primary__9i0Rz').contains('Next').click()
        cy.wait(1000)
        cy.get('.ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz').contains('Place order').click()
        cy.wait(2000)
        //cy.get('.SuccessOrderPlaced_download-cta__2VCmc > :nth-child(1)').click()
        cy.get('.SuccessOrderPlaced_success-order-placed__TT0w1 > :nth-child(3) > :nth-child(2)').then(($text) =>
          {
           orderid = $text.text()
            cy.log(orderid)
          })
         cy.get(':nth-child(3) > :nth-child(6)').then(($invoice) =>
        {
              invoiceid = $invoice.text()
            cy.log(invoiceid)
        })
        })
      })
     
        
      

