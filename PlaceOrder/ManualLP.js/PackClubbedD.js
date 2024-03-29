//code for checking all orders in print section has correct AWB and orderid
//this checks all single orders in print have correct AWB and order id Duplicate and Non Duplicate

/// <reference types="Cypress" />
/// <reference types="cypress-downloadfile"/>
const { execSync } = require("child_process");
const { readFile } = require("fs");
const path = require("path");
var id;
const fs = require("fs");
const pdf = require("pdf-parse");
var invoiceid;
var labelpdf = "";
var data = 0;
function stringToBinary(str) {
  const binaryArray = [];
  for (let i = 0; i < str.length; i++) {
    const binaryChar = str.charCodeAt(i).toString(2);
    binaryArray.push(binaryChar);
  }
  return binaryArray.join(" ");
}
for (let i = 0; i < 10; i++) {
  describe("Manual LP", function () {
    beforeEach("Login", function () {
      cy.visit("https://v2.nushop-dashboard.kaip.in/login/");
      cy.get(".rs-input").type("8653215954");
      cy.get(".Button_button-primary__9i0Rz").contains("Generate OTP").click();
      cy.wait(2000);
      cy.get(".rs-input").type("0000");
      cy.get(".Button_button-primary__9i0Rz").contains("Verify OTP").click();
      cy.on("window:confirm", (str) => {
        return false;
      });

      cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(4)").click();
      cy.get(":nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb")
        .contains("Orders")
        .click();
      cy.get(
        '[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
      ).click();
      cy.wait(5000);
      Cypress.on("uncaught:exception", (err, runnable) => {
        // Your custom handling logic goes here
        // For example, you can log the error or take other actions
        console.error("Uncaught exception:", err.message);
        // Optionally, you can prevent the default behavior (fail the test)
        // by returning false
        return false;
      });
    });

    it("PincodeCHangeAndVerification", function () {
      cy.get(
        ".TableHeader_card-container-header__rp1eA > :nth-child(4) > .Text_body3__jmTqb"
      ).click();
      cy.get(
        'div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]'
      )
        .contains("Pack")
        .click();
      cy.get(
        'div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]'
      )
        .contains("Clubbed")
        .click();
      cy.wait(2000);
      cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]')
        .eq(data)
        .within(() => {
          cy.get(
            ".rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X"
          ).then(($p1) => {
            cy.wrap($p1.text()).as("AWB");
          });
          cy.log(data);
          cy.get(
            ".PrintPackViewCard_clubbed-parent-card__-FWzM > .PrintPackViewCard_clubbed-parent-divider__DSLtw > .Text_body2__0FftJ"
          ).then(($e1) => {
            var s = $e1.text();
            cy.wrap(s.substring(4)).as("orderid");
          });
          cy.get(".action-btns-wrapper > :nth-child(3)")
            .contains("Logistic")
            .click(); //Clicking the Logistics CTA
        })
        .then(() => {
          cy.get(":nth-child(4) > .Input_input-group__c6y0f").clear();
          cy.get(":nth-child(4) > .Input_input-group__c6y0f").type("700019");
          cy.get(".rs-drawer-actions > .Button_button-primary__9i0Rz").click();
          cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
          cy.wait(2000);
          cy.get("@orderid").then((orderid) => {
            cy.get(".rs-input").type(orderid);
            cy.get(".rs-input-group-addon").click();
            cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]')
              .eq(0)
              .within(() => {
                cy.get(
                  ".rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X"
                ).then(($p1) => {
                  cy.wrap($p1.text()).as("NewAWB");
                });
              });
          });
        })
        .then(() => {
          cy.wait(7000);
          cy.intercept(
            "POST",
            "https://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created"
          ).as("res");
          cy.get(".action-btns-wrapper > .Button_button-primary__9i0Rz")
            .eq(0)
            .click();
        });

      cy.get("@NewAWB")
        .then((NewAWB) => {
          cy.get("@AWB").then((AWB) => {
            cy.get("@orderid").then((orderid) => {
              if (AWB != NewAWB) {
                cy.wait(2000);
                cy.get(".rs-modal-footer >").contains("Print All").click();
                cy.wait("@res").then(({ request, response }) => {
                  const labellink = response.body.data.url;
                  // Remove the specified substring
                  cy.wrap(labellink).as("label");
                });
              }
            });
          });
        })
        .then(() => {
          cy.get("@NewAWB").then((NewAWB) => {
            cy.get("@AWB").then((AWB) => {
              cy.get("@orderid").then((orderid) => {
                cy.get("@label").then((label) => {
                  cy.log(AWB);
                  const awb = AWB.substring(5);
                  const newawb = NewAWB.substring(5);
                  cy.log(awb);
                  cy.log(label);
                  const labellink = label.substring(51);
                  const downloadPath = "cypress/downloads/";
                  const PdfContent = downloadPath + labellink;
                  cy.wait(10000);
                  cy.task("readPdf", PdfContent).should("contain", orderid);
                  cy.task("readPdf", PdfContent).should("contain", newawb);
                  cy.task("readPdf", PdfContent).should("contain", "700019");
                  cy.log(data);
                  data = data + 1;
                });
              });
            });
          });
        });
    });
  });
}
