//need to put some validations on after upload functionality of these files
import 'cypress-file-upload';

describe('bulk order placement',function()
{
   beforeEach('login',function()
   {
        cy.visit("http://v2.nushop-dashboard.kaip.in/login/");
        cy.wait(10000)
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
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()
        cy.get('[href="/orders/place-order"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').click()
        cy.get('.tab').contains('Bulk Order').click({force: true})
        cy.get('.SideNav_sidenav-item-container__PAVyt > :nth-child(3)').click()
        cy.get(':nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm').click()

        cy.get('.tab').contains('Bulk Order').click({force: true})
        })
    it('ValidfileUpload',function()
    {
        cy.get('.rs-input').type('test')
        cy.wait(4000)
        cy.get('input[type="file"]').attachFile('pratikjain30.csv').then(() =>
        {
        cy.get('.Flexbox_flex-row__aKbHb > .Button_button-primary__9i0Rz').click()   
        })
        cy.wait(10000)
     })
     
     it('Invalid+Valid',function()
    {
        cy.get('.rs-input').type('test')
        cy.wait(4000)
        cy.get('input[type="file"]').attachFile('falsefile.csv').then(() =>
        {
        cy.get('.Flexbox_flex-row__aKbHb > .Button_button-primary__9i0Rz').click()   
        })
        cy.wait(10000)
        
     })

     it('InvalidComplete',function()
    {
        cy.get('.rs-input').type('test')
        cy.wait(4000)
        cy.get('input[type="file"]').attachFile('invalidnumber.csv').then(() =>
        {
        cy.get('.Flexbox_flex-row__aKbHb > .Button_button-primary__9i0Rz').click()   
        })
        cy.get('.Message_message__OaRQ6 > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ').contains('All the order data is invalid')
        cy.wait(10000)
     })

    
})