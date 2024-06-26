/// <reference types="Cypress" />
/// <reference types="cypress-downloadfile"/>
for (var i = 0; i, 200; i++) {
  describe("Placeorder/Catalogue/SingleNormalOrder/Discountfunctionality", function () {
    var orderid = "";
    var invoiceid = "";
    var labelpdf = "";

    before("Login", function () {
      cy.visit("http://v2.nushop-dashboard.kaip.in/login/");
      cy.get(".rs-input").type("7908961320");
      cy.get(".Button_button-primary__9i0Rz").contains("Generate OTP").click();
      cy.wait(2000);
      cy.get(".rs-input").type("0000");
      cy.get(".Button_button-primary__9i0Rz").contains("Verify OTP").click();
      cy.on("window:confirm", (str) => {
        cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
      });
      cy.wait(2000);
    });
    it("DiscountAmount", function () {
      cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(3)").click();
      cy.get(":nth-child(4) > .Text_body1__jlAQm").click();

      cy.get('[href="/orders/place-order"] > .Text_body2__0FftJ').click();
      cy.get(
        ":nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input"
      ).type("7878787878");
      //cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('Pratik')
      cy.get(
        ":nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input"
      )
        .clear()
        .type("Jcr layout panathur bangalore");
      cy.get(".rs-btn-toolbar > :nth-child(2)").click();
      cy.get(".Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz").click();
      cy.get(
        ".rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar > .Button_button-primary__9i0Rz"
      )
        .click()
        .then(($c1) => {
          cy.get(".rs-input").click().type("sample");
          cy.get(".rs-input-group-addon").click();
          cy.wait(2000);
          cy.get(".rs-drawer-body").within(($row) => {
            cy.get('div[class="Tooltip_tooltip-children-wrapper__n+g1q"]').each(
              ($e1, index, $list) => {
                var p = $e1.text();
                if (p.includes("name012222")) {
                  cy.get(
                    ".rs-flex-box-grid-item-2 > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper"
                  )
                    .eq(index)
                    .click();
                }
              }
            );
          });
          cy.get(".rs-drawer-actions > .Button_button-primary__9i0Rz")
            .contains("Add")
            .click();
          cy.get(".rs-picker-toggle-placeholder > .Text_body2__0FftJ")
            .click()
            .cy.get(".rs-flex-box-grid-item-4 > .Button_button-ghost__rieSu")
            .click();
          cy.get(
            ".ProductDetails_cta-style__Ktrhb > .rs-btn-toolbar > .Button_button-primary__9i0Rz"
          )
            .contains("Next")
            .click();
          cy.get(
            ".CourierPartnerCard_courier-partner-card__pV9GA > .CourierPartnerCard_courier-card-body__Bx7jb > .heading4"
          ).each(($e1, index, $list) => {
            if ($e1.text() === "EKART SURFACE") {
              cy.get(
                ".CourierPartnerCard_courier-partner-card__pV9GA > .CourierPartnerCard_courier-card-body__Bx7jb > .heading4"
              )
                .eq(index)
                .click();
            }
          });
          cy.get(".rs-flex-box-grid-end > .Button_button-primary__9i0Rz")
            .contains("Next")
            .click();
          cy.wait(1000);
          cy.get(
            ".ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz"
          )
            .contains("Place order")
            .click();
          cy.wait(2000);
          cy.get(":nth-child(3) > :nth-child(6)").then(($invoice) => {
            invoiceid = $invoice.text();
            cy.log(invoiceid);
          });
        });
    });
    it("WebOrderPlacement", function () {
      cy.visit("https://vishnutesting.nushop.kaip.in/");
      cy.wait(2000);
      cy.get(":nth-child(2) > .css-12d75xc > .css-1tu2nel")
        .contains("Orders")
        .click();
      cy.get(".css-1vw8438").type("7908961320");
      cy.wait(2000);
      cy.get(".css-2f3j1g").click();
      cy.get(".css-tpv9t0").each(($e1, index, list) => {
        cy.get(".css-tpv9t0").eq(index).type("0");
      });
      cy.get(".css-2f3j1g").click();
      cy.get(".css-5gxtus > a").eq(0).click();
      cy.wait(2000);
      cy.get(".css-5tfm2q").type("Prod001");
      cy.wait(1000);
      cy.get(
        ":nth-child(1) > .css-1bkty0y > .css-zejslb > :nth-child(1)"
      ).click();
      cy.get(".css-1jt1w2w > .css-2f3j1g").click();
      cy.get(".css-1jt1w2w").click();
      cy.get(".css-19qf114 > .css-2f3j1g").click();
      cy.get(".css-k80332").contains("COD").click();
      cy.get(".css-2f3j1g").click();
      cy.get(".css-19qf114 > .css-2f3j1g").click();
      cy.get(".css-19qf114 > .css-2f3j1g").click();
      cy.get(":nth-child(8) > .css-1gqor3r")
        .then(($e1) => {
          cy.wrap($e1.text()).as("s");
        })
        .then(function () {
          OrderId = this.s;
          cy.log(OrderId);
        });
    });
  });
}
