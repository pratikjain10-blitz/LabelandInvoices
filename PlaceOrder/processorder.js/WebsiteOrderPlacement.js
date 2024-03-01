import 'cypress-iframe'
/// <reference types="Cypress" />
/// <reference types="cypress-downloadfile"/>
describe('CODorderFlow',function()
{ 
  /*it('place orders on website',function()
  {
    cy.visit('http://pratikj.nushop.kaip.in/')
    cy.get(':nth-child(2) > .css-12d75xc > .css-1tu2nel').click()
    cy.get('.css-1vw8438').type('7908961320')
    cy.get('.css-2f3j1g').click()
    cy.get('.css-tpv9t0').each(($e1,index,list)=>
    {
      cy.get('.css-tpv9t0').eq(index).type('0')
    })
    cy.get('.css-2f3j1g').click()
    cy.get('.css-uxj08 > .css-zixo5y > .css-2f3j1g').click()
    cy.get('.css-1jt1w2w > .css-2f3j1g').click()
    cy.get('.css-1jt1w2w').click()
    cy.get('.ReactModal__Overlay')
    cy.get('.css-19qf114').click()
    cy.wait(4000)
    cy.get('#cod').click()
    cy.get('.css-1l968gz').click()
    cy.wait(4000)
  })*/

  it('OnlineOrderFlow',function()
  {
    cy.visit('http://rudra.nushop.kaip.in/')
    cy.get(':nth-child(2) > .css-12d75xc > .css-1tu2nel').click()
    cy.get('.css-1vw8438').type('7908961320')
    cy.get('.css-2f3j1g').click()
    cy.get('.css-tpv9t0').each(($e1,index,list)=>
    {
      cy.get('.css-tpv9t0').eq(index).type('0')
    })
    cy.get('.css-2f3j1g').click()
    cy.get('.css-1jt1w2w').click()
    cy.get('.css-uxj08 > .css-zixo5y > .css-2f3j1g').click()
    cy.get('.css-hdm7wy > .css-uxj08').click()
    cy.wait(4000)
    cy.get('.css-1jt1w2w > .css-2f3j1g').click()
    cy.get('.css-2f3j1g').click()
    cy.get('.css-kkzpvp').clear().type('Dinhataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    cy.wait(4000)
    cy.get('.css-2f3j1g').click()
    cy.get('.css-1vw8438').type('7908961320')
    cy.get('.css-8rawiy').click()
    cy.get('.css-1l968gz').click()
    cy.get('.css-iwqxn').contains('Net Banking').click()
    cy.frameLoaded('iframe[src*="build=cb850e58728544627e8920f7b82be79710058421"]')
    cy.iframe().get('label[class="radio-label mfix svelte-eyjg1z"]').eq(1).click()
    cy.iframe().get('redesign-v15-cta').click()
    cy.wait(10000)
  })
})

