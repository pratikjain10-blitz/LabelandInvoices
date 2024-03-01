/// <reference types="Cypress" />
/// <reference types="cypress-downloadfile"/>
describe('Placeorder/Catalogue/SingleNormalOrder/Discountfunctionality',function()
{
  var orderid = '';
  var invoiceid= '';
  var labelpdf = '';
  var preferredLP = '';
  var rateofEcome = '';
    before('Login',function()
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
    })

     beforeEach('again coming back to placeOrders',function()
     {
        cy.wait(2000)
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(8)').click()
        cy.get(':nth-child(13) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/shipping/rate-calculator"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
    })
    it('cod order',function()
    {
        cy.get('.Flexbox_align-top__Nx4Aj > :nth-child(1) > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').type('700019')
        cy.get(':nth-child(2) > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').type('560103')
        cy.get('.Flexbox_align-middle__-J0b5.Flexbox_mt-lg__HQln6 > .rs-flex-box-grid-item-9 > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').type('1')
        cy.get('.Flexbox_flex-row__aKbHb > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('17.1')
        cy.get('.rs-flex-box-grid-item-24 > .Flexbox_flex-row__aKbHb > :nth-child(2) > .Input_input-group__c6y0f > .rs-input').type('17.1')
        cy.get('.rs-flex-box-grid-item-0 > .Input_input-group__c6y0f > .rs-input').type('17.1')
        cy.get(':nth-child(2) > .Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input').type('266')
        cy.get('.Flexbox_mt-lg__HQln6.rs-flex-box-grid-center > .Button_button-primary__9i0Rz').click()
        cy.get('.Message_message__OaRQ6 > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').then(($btn)=>
        {  
            cy.wait(4000)
            var str = $btn.text()
            var arr = new Array()
            arr = str.split(",")
            cy.log(arr)
            for(var i=0;i<arr.length;i++)
            {
                if(arr[i].includes('Ekart'))
                {
                    var p = arr[i]
                        p= p.trim()
                    for( var z=0;z<p.length;z++)
                    {
                        if(p.charAt(z)===' ')
                        {
                          rateofEcome = p.substring(z,p.length)
                          cy.log(rateofEcome)  
                        }

                    }
                }
            }
        })
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/orders/place-order"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.get(':nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('7878787878')
        //cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('Pratik')
        cy.get(':nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input')
          .type('Jcr layout panathur bangalore')
        cy.get(':nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').clear().type('700019')
        cy.get('.rs-btn-toolbar > :nth-child(2)').click()
        cy.get('.Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz').click()
        cy.get('.rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar > .Button_button-primary__9i0Rz').click()
        cy.get('.rs-input').click().type('test')
        cy.get('.rs-input-group-addon').click()
        cy.wait(2000)
        cy.get('.rs-drawer-body').within(($row)=>
        {
        
        cy.get('div[class="Tooltip_tooltip-children-wrapper__n+g1q"]').each(($e1,index,$list)=>
        {
        var p = $e1.text()
        if(p.includes('test123'))
        {
            cy.get('.rs-flex-box-grid-item-2 > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper').eq(index).click()
        }
        })
        })
        cy.get('.rs-drawer-actions > .Button_button-primary__9i0Rz').contains('Add').click()
        cy.get('.ProductDetails_cta-style__Ktrhb > .rs-btn-toolbar > .Button_button-primary__9i0Rz').click()
        cy.get(':nth-child(1) > :nth-child(1) > .CourierPartnerCard_courier-partner-card__pV9GA > .CourierPartnerCard_courier-card-body__Bx7jb > .heading4').contains('EKART').click()
        cy.get('.rs-flex-box-grid-end > .Button_button-primary__9i0Rz').click()
cy.get('.rs-flex-box-grid-item-24 > :nth-child(1) > :nth-child(2) > :nth-child(4)').then(($spec)=>
{
 if($spec.text().includes(rateofEcome))  
 {
 cy.get('.ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz').click()
 } 
})

   })

}) 
