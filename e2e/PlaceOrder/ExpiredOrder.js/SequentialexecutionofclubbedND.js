//proper code for expired AWB and rechecking after regeneration
//This is for clubbed-Non Duplicate Orders
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
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error without failing the test
  console.error("Uncaught Exception:", err.message);
  // Prevent Cypress from failing the test
  return false;
});
function stringToBinary(str) {
  const binaryArray = [];
  for (let i = 0; i < str.length; i++) {
    const binaryChar = str.charCodeAt(i).toString(2);
    binaryArray.push(binaryChar);
  }
  return binaryArray.join(" ");
}
describe("NONduplicateOrderflow", function () {
  beforeEach("Login", function () {
    cy.visit("https://v2.nushop-dashboard.kaip.in/login/");
    cy.get(".rs-input").type("7908961320");
    cy.get(".Button_button-primary__9i0Rz").contains("Generate OTP").click();
    cy.wait(2000);
    cy.get(".rs-input").type("0000");
    cy.get(".Button_button-primary__9i0Rz").contains("Verify OTP").click();
    cy.wait(10000);
    cy.on("window:confirm", (str) => {
      cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(3)").click();
      cy.get(":nth-child(4) > .Text_body1__jlAQm").click();

      cy.get('[href="/orders/process-orders"] > .Text_body2__0FftJ').click();
      cy.wait(5000);
    });
    cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(3)").click();
    cy.get(":nth-child(4) > .Text_body1__jlAQm").click();

    cy.get(
      '[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
    ).click();
    cy.wait(5000);
  });
  it("Expired Clubbed AWB", function () {
    cy.get(":nth-child(2) > .tab").click();
    cy.get(":nth-child(3) > .rs-picker > .rs-picker-toggle")
      .click()
      .then(() => {
        cy.get(
          ".rs-radio-checker > :nth-child(1) > .RadioPicker_radio-label__p6kzr"
        )
          .contains("Clubbed")
          .click();
      });
    cy.get(".rs-flex-box-grid-item-4 > .rs-picker > .rs-picker-toggle")
      .click()
      .then(() => {
        cy.get(".rs-radio-checker").each(($e1, index, list) => {
          if ($e1.text() === "Non Duplicate") {
            cy.get(".rs-radio-wrapper").eq(index).click();
          }
        });
      });

    cy.wait(4000);
    cy.get(".rs-btn-toolbar > .Button_button-ghost__rieSu")
      .contains("Apply Filters")
      .click();
    cy.get('div[class="ExpiredAWBOrdersCard_card-border__7Ruq8"]').each(
      ($e1, index, list) => {
        let count;
        cy.get('div[class="ExpiredAWBOrdersCard_card-border__7Ruq8"]')
          .eq(index)
          .within(() => {
            cy.get(".rs-col-lg-4.rs-col-sm-7 > :nth-child(5)").each(
              ($v1, index, list) => {
                count = list;
                cy.log(count);
              }
            );
          });
        if (count >= 2) {
          cy.get('div[class="ExpiredAWBOrdersCard_card-border__7Ruq8"]')
            .eq(index)
            .within(() => {
              cy.get(
                'p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_underline__aG3Cq Text_cursor-pointer__vwE5X"]'
              )
                .contains("AWB")
                .then(($g1) => {
                  cy.log($g1.text());
                  const oldawb = $g1.text();
                  const extractedAwb = oldawb.substring(5);
                  cy.wrap(extractedAwb).as("oldawb");
                  cy.log(extractedAwb);
                });
              cy.get(
                'p[class="Text_body2__0FftJ Text_subtitles-colored__s5ggG Text_ml-lg__OZiJy Text_mr-lg__egpT+"]'
              ).then(($l1) => {
                // Alias the orderid
                let clubbedid = $l1.text();
                let order = clubbedid.substring(3);
                cy.wrap(order).as("order");

                // Log the order
                cy.log(order);

                // Click the button
                cy.get(
                  ".rs-col-xxl-3 > .action-btns-wrapper > .Button_button-primary__9i0Rz"
                )
                  .eq(0)
                  .click();
              });
            });

          // Click Confirm button
          cy.get(
            'button[class="Button_button-ghost__rieSu button-loading-undefined rs-btn rs-btn-ghost rs-btn-md"]'
          )
            .contains("Confirm")
            .click();

          // Check if AWB regenerated successfully
          //  from here the testing in print starts
          cy.get(":nth-child(1) > .tab").click();
          cy.wait(7000);

          // Access the aliased orderid outside the previous block
          cy.get("@order").then((order) => {
            // Log the orderid again
            cy.log(order);
            cy.get(
              'button[class="Button_button-default__NeJ4p button-loading-undefined rs-btn rs-btn-default rs-btn-md"]'
            )
              .contains("Clubbed")
              .click();
            cy.get(".rs-input").type(order);
            cy.get(".rs-input-group-addon").click();

            cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]').each(
              ($p1, number, $queue) => {
                cy.get('div[class="PrintPackViewCard_card-border__Qk1I3"]')
                  .eq(number)
                  .within(() => {
                    cy.get(
                      ".rs-col-md-6 > .Text_subtitles-colored__s5ggG.Text_cursor-pointer__vwE5X"
                    ).then(($p1) => {
                      cy.wrap($p1.text()).as("AWB");
                    });
                    cy.get(".rs-col-lg-4.rs-col-sm-7 > :nth-child(5)")
                      .eq(0)
                      .then(($e1) => {
                        let orderid = $e1.text();
                        cy.wrap(orderid).as("orderid");
                        cy.log(orderid);
                      });
                  })
                  .then(() => {
                    cy.intercept(
                      "POST",
                      "https://v2.nushop-dashboard.kaip.in/api/order-process/report/labels-v2/created"
                    ).as("res");
                    cy.get(
                      ".action-btns-wrapper > .Button_button-primary__9i0Rz"
                    ).click();
                  });
                cy.get(".rs-modal-footer >").contains("Print Anyways").click();

                //cross checking with olderids and AWB captured in EXpired section
                cy.get("@order")
                  .then((order) => {
                    cy.get("@oldawb").then((oldawb) => {
                      cy.get("@AWB").then((AWB) => {
                        cy.get("@orderid").then((orderid) => {
                          if (order === orderid && oldawb !== AWB) {
                            cy.wait(2000);
                            cy.wait("@res").then(({ request, response }) => {
                              const labellink = response.body.data.url;
                              const downloadPath = "cypress/downloads/";
                              // Remove the specified substring
                              cy.wrap(labellink).as("label");
                            });
                          } else {
                            cy.fail();
                          }
                        });
                      });
                    });
                  })
                  .then(() => {
                    cy.get("@AWB").then((AWB) => {
                      cy.get("@orderid").then((orderid) => {
                        cy.get("@label").then((label) => {
                          cy.log(AWB);
                          const awb = AWB.substring(5, AWB.length);
                          cy.log(awb);
                          cy.log(label);
                          const labellink = label.substring(51, label.length);
                          const downloadPath = "cypress/downloads/";
                          const PdfContent = downloadPath + labellink;
                          cy.wait(10000);
                          cy.task("readPdf", PdfContent).should(
                            "contain",
                            orderid
                          );
                          cy.task("readPdf", PdfContent).should("contain", awb);
                          cy.get(":nth-child(2) > .tab").click();
                          cy.get(
                            ":nth-child(3) > .rs-picker > .rs-picker-toggle"
                          )
                            .click()
                            .then(() => {
                              cy.get(
                                ".rs-radio-checker > :nth-child(1) > .RadioPicker_radio-label__p6kzr"
                              )
                                .contains("Clubbed")
                                .click();
                              cy.get(
                                ".rs-btn-toolbar > .Button_button-ghost__rieSu"
                              ).click();
                            });
                        });
                      });
                    });
                  });
              }
            );
          });
        }
      }
    );
  });
});
