/// <reference types="Cypress" />
/// <reference types="cypress-downloadfile"/>
describe("Placeorder/Catalogue/SingleNormalOrder/Discountfunctionality", function () {
  var orderid = "";
  var invoiceid = "";
  var labelpdf = "";
  beforeEach("Login", function () {
    cy.visit("https://v2.nushop-dashboard.kaip.in/login/");
    cy.get(".rs-input").type("7908961320");
    cy.get(".Button_button-primary__9i0Rz").contains("Generate OTP").click();
    cy.wait(2000);
    cy.get(".rs-input").type("0000");
    cy.get(".Button_button-primary__9i0Rz").contains("Verify OTP").click();
    cy.on("window:confirm", (str) => {
      cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
    });
    cy.wait(2000);
    cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(3)").click();
    cy.get(":nth-child(4) > .Text_body1__jlAQm").click();

    cy.get(
      '[href="/orders/place-order"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
    ).click();
    cy.get(
      ":nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input"
    ).type("7878787878");
    //cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('Pratik')
    cy.get(
      ":nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input"
    ).type("Jcr layout panathur bangalore");
    cy.get(".rs-btn-toolbar > :nth-child(2)").click();
    cy.get(".Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz").click();
    cy.get(
      ".rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar > .Button_button-primary__9i0Rz"
    ).click();
  });

  it("RightQuantity", function () {
    cy.get(".rs-input").click().type("WD");
    cy.get(".rs-input-group-addon").click();
    cy.wait(2000);
    cy.get(".rs-drawer-body").within(($row) => {
      cy.get('div[class="Tooltip_tooltip-children-wrapper__n+g1q"]').each(
        ($e1, index, $list) => {
          var p = $e1.text();
          if (p.includes("WD Test SingleO 1")) {
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
      .then(($e1) => {
        cy.get('[aria-selected="false"] > .rs-picker-select-menu-item').each(
          ($e1, index, list) => {
            if ($e1.text() === "Percentage discount per quantity") {
              cy.get('[aria-selected="false"] > .rs-picker-select-menu-item')
                .eq(index)
                .click();
            }
          }
        );
      });
    cy.get(".EditableProductCard_discount-input-style__wx3FL").type("10");
    cy.get(".rs-flex-box-grid-item-4 > .Button_button-ghost__rieSu").click();
    cy.get(":nth-child(2) > .rs-picker > .rs-picker-toggle")
      .click()
      .then(() => {
        cy.get('[data-key="3"] > .rs-picker-select-menu-item').click();
      });
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
    cy.get(".SuccessOrderPlaced_download-cta__2VCmc > :nth-child(1)").click();
    cy.get(".SuccessOrderPlaced_download-cta__2VCmc > :nth-child(1)").click();
    cy.get(
      ".SuccessOrderPlaced_success-order-placed__TT0w1 > :nth-child(3) > :nth-child(2)"
    ).then(($text) => {
      orderid = $text.text();
      cy.log(orderid);
    });
    cy.get(":nth-child(3) > :nth-child(6)").then(($invoice) => {
      invoiceid = $invoice.text();
      cy.log(invoiceid);
    });
  });
  it("productexcessquantity", function () {
    cy.get(".rs-input").click().type("WD");
    cy.get(".rs-input-group-addon").click();
    cy.wait(2000);
    cy.get(".rs-drawer-body").within(($row) => {
      cy.get('div[class="Tooltip_tooltip-children-wrapper__n+g1q"]').each(
        ($e1, index, $list) => {
          var p = $e1.text();
          if (p.includes("WD Test ClubbedO 1")) {
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
      .then(($e1) => {
        cy.get('[aria-selected="false"] > .rs-picker-select-menu-item').each(
          ($e1, index, list) => {
            if ($e1.text() === "Percentage discount per quantity") {
              cy.get('[aria-selected="false"] > .rs-picker-select-menu-item')
                .eq(index)
                .click();
            }
          }
        );
      });
    cy.get(".EditableProductCard_discount-input-style__wx3FL").type("10");
    cy.get(".rs-flex-box-grid-item-4 > .Button_button-ghost__rieSu").click();
    cy.get(":nth-child(2) > .rs-picker > .rs-picker-toggle")
      .click()
      .then(() => {
        cy.get('[data-key="5"] > .rs-picker-select-menu-item').click();
      });
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
    cy.get(".SuccessOrderPlaced_download-cta__2VCmc > :nth-child(1)").click();
    cy.get(".SuccessOrderPlaced_download-cta__2VCmc > :nth-child(1)").click();
    cy.get(
      ".SuccessOrderPlaced_success-order-placed__TT0w1 > :nth-child(3) > :nth-child(2)"
    ).then(($text) => {
      orderid = $text.text();
      cy.log(orderid);
    });
    cy.get(":nth-child(3) > :nth-child(6)").then(($invoice) => {
      invoiceid = $invoice.text();
      cy.log(invoiceid);
    });
  });
});
