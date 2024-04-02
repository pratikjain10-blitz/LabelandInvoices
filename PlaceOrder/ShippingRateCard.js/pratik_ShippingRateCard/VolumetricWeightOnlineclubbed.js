//Constraints enter only numeric values
//just online web Order placement is left
var L_01 = 2; //All the LBH will stored multiplied by 10
var B_01 = 2;
var H_01 = 2;
var L_02 = 2; //All the LBH will stored multiplied by 10
var B_02 = 2;
var H_02 = 3;
var baseCharge;
var Sku_Weight_01 = 5.1;
var Sku_Weight_02 = 1.6;
var rateofEcome;
var TemplateCalculation;
var dim;
var baseCharge;
var Card_Calculation;
var Volumetric_Weight01;
var Volumetric_Weight02;
var Final_Weight_01;
var Final_Weight_02;
var Clubbed_Weight = "";
var new_Clubbed_dimensions;
let OrderId_Single = "abc";
var Orderid_Clubbed = "";
var charges = "";
var ManualLP_charges = "";
var SP_01 = 200;
var SP_02 = 200;
var SP = SP_01 + SP_02;
var Payment_Online_Discount = "";
var percentage_discount = "";
var lower_bracket = "";
var Base_bracket = "";
var percentage_Payment_Discount;
var surcharge_bracket01 = "";
var Chargeable_Weight_Slab;

describe("AdminLimitStore", function () {
  var new_Clubbed_dimensions;
  var ManualLP_charges = "";
  it.only("Calculating Dimensions+ForwardRatesCalculation", function () {
    Volumetric_Weight01 = (L_01 * B_01 * H_01 * 1000) / 4000;
    Volumetric_Weight02 = (L_02 * B_02 * H_02 * 1000) / 4000;
    Final_Weight_01;
    Final_Weight_02;
    cy.log(Volumetric_Weight01);
    cy.log(Volumetric_Weight02);
    //for first product
    if (Sku_Weight_01 > Volumetric_Weight01) {
      Final_Weight_01 = Sku_Weight_01;
    } else {
      Final_Weight_01 = Volumetric_Weight01;
    }
    if (Sku_Weight_02 > Volumetric_Weight02) {
      Final_Weight_02 = Sku_Weight_02;
    } else {
      Final_Weight_02 = Volumetric_Weight02;
    }
    Clubbed_Weight = Final_Weight_01 + Final_Weight_02;
    cy.task("save", { v: "Clubbed_Weight", value: Clubbed_Weight });
    cy.wrap(Clubbed_Weight).as("Clubbed_Weight");
    cy.log(Clubbed_Weight);
    var a = 4000 * Clubbed_Weight;
    new_Clubbed_dimensions = Math.cbrt(a);
    new_Clubbed_dimensions = Math.round(new_Clubbed_dimensions);
    cy.task("save", {
      v: "new_Clubbed_dimensions",
      value: new_Clubbed_dimensions,
    });
    if (Clubbed_Weight < 5) {
      function roundToNearestHalf(number) {
        return Math.ceil(number * 2) / 2;
      }

      Chargeable_Weight_Slab = roundToNearestHalf(Sku_Weight);
      console.log(
        "/////Chargeable_Weight_Slab/////////",
        Chargeable_Weight_Slab
      );
      cy.wrap(Chargeable_Weight_Slab).as("Chargeable_Weight_Slab");
    } else {
      Chargeable_Weight_Slab = Math.ceil(Clubbed_Weight);
      cy.wrap(Chargeable_Weight_Slab).as("Chargeable_Weight_Slab");
    }
    cy.visit("https://v2.nushop-dashboard.kaip.in");
    cy.get(".rs-input").type("9495760332");
    cy.get(".Button_button-primary__9i0Rz").contains("Generate OTP").click();
    cy.wait(2000);
    cy.get(".rs-input").type("0000");
    cy.get(".Button_button-primary__9i0Rz").contains("Verify OTP").click();
    cy.on("window:confirm", (str) => {
      cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
    });
    cy.wait(2000);

    cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(8)").click();
    cy.get(
      ":nth-child(13) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm"
    ).click();
    cy.get(
      '[href="/shipping/forward-rates"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
    ).click();
    cy.get(
      ".Card_mb-xs__Xdjyt > .Flexbox_flex-row__aKbHb > :nth-child(5) > .Text_body2__0FftJ"
    ).click();
    cy.get(".ChipButton_chip-button__xXNaz > .custom-chip-content").each(
      ($p1, index, list) => {
        var n;
        var z = $p1.text().trim();
        if (z === "DELHIVERY SURFACE") {
          cy.get(".ChipButton_chip-button__xXNaz > .custom-chip-content")
            .eq(index)
            .click();
          cy.get("@Chargeable_Weight_Slab").then((Chargeable_Weight_Slab) => {
            if (Chargeable_Weight_Slab <= 5) {
              cy.get(
                " .Flexbox_flex-row__aKbHb > :nth-child(1) > .Text_body2__0FftJ"
              ).each(($n1, index, list) => {
                var check = $n1.text();
                cy.log(check);
                var p = Chargeable_Weight_Slab + " Kg";
                cy.log(p);
                if (check === p) {
                  cy.wrap(index).as("n");
                  cy.log(Chargeable_Weight_Slab);
                }
              });
            } else {
              n = 12;
              cy.wrap(n).as("n");
              cy.log(Chargeable_Weight_Slab);
            }
          });
        }
      }
    );

    cy.get("@n").then((n) => {
      cy.log(n);
      if (Chargeable_Weight_Slab <= 5) {
        cy.get(".Flexbox_flex-row__aKbHb > :nth-child(4) > .Text_body2__0FftJ")
          .eq(n - 1)
          .then(($b1) => {
            baseCharge = $b1.text().substring(1);
            cy.log(baseCharge);
            cy.wrap(baseCharge).as("baseCharge");
            cy.log(SP);
          });
      } else {
        cy.get(".Flexbox_flex-row__aKbHb > :nth-child(4) > .Text_body2__0FftJ")
          .eq(n - 1)
          .then(($z1) => {
            var baseCharge01 = $z1.text().substring(1);
            baseCharge01 = baseCharge01 * (Chargeable_Weight_Slab - 5);
            cy.log(baseCharge01);
            cy.wrap(baseCharge01).as("baseCharge01");
          });
        cy.get(".Flexbox_flex-row__aKbHb > :nth-child(4) > .Text_body2__0FftJ")
          .eq(n - 2)
          .then(($z1) => {
            var baseCharge02 = $z1.text().substring(1);

            cy.log(baseCharge02);
            cy.wrap(baseCharge02).as("baseCharge02");
          });
        cy.get("@baseCharge01").then((baseCharge01) => {
          cy.get("@baseCharge02").then((baseCharge02) => {
            baseCharge = parseFloat(baseCharge01) + parseFloat(baseCharge02);
            cy.wrap(baseCharge).as("baseCharge");
          });
        });
      }
      cy.get("@baseCharge").then((baseCharge) => {
        cy.log(baseCharge);
        //Since we have made COD as fixed we will calculate the COD charges first
        //Payment Based Surcharge/Discount
        cy.get(
          ":nth-child(16) > .Flexbox_mt-sm__1BOrf > :nth-child(2) > .Text_body2__0FftJ > :nth-child(1)"
        ).then(($v1) => {
          Payment_Online_Discount = $v1.text().substring(2);
          cy.log(Payment_Online_Discount);
          cy.wrap(Payment_Online_Discount).as("Payment_Online_Discount");
          cy.log(Payment_Online_Discount);
        });
        cy.get(":nth-child(2) > .Text_body2__0FftJ > :nth-child(2)").then(
          ($n1) => {
            var percentage_Discount_number = $n1.text().substring(0, 1);
            cy.log(percentage_Discount_number);
            percentage_Payment_Discount =
              (percentage_Discount_number / 100) * SP;
            cy.log(percentage_Payment_Discount);
            cy.wrap(percentage_Payment_Discount).as(
              "percentage_Payment_Discount"
            );
          }
        );
        cy.get("@Payment_Online_Discount").then((Payment_Online_Discount) => {
          cy.get("@percentage_Payment_Discount").then(
            (percentage_Payment_Discount) => {
              cy.log(
                "percentage_Payment_Discount",
                percentage_Payment_Discount
              );
              cy.log("Payment_Online_Discount", Payment_Online_Discount);
              if (percentage_Payment_Discount < Payment_Online_Discount) {
                Payment_Online_Discount = percentage_Payment_Discount;
                cy.log("new Payment_COD_charge", Payment_Online_Discount);
                cy.wrap(Payment_Online_Discount).as("Payment_Online_Discount");
              }
              cy.then(() => {
                cy.get("@baseCharge").then((baseCharge) => {
                  cy.get("@Payment_Online_Discount").then(
                    (Payment_Online_Discount) => {
                      var Card_Calculation_PaymentBased = parseFloat(
                        Payment_Online_Discount
                      );

                      cy.wrap(Card_Calculation_PaymentBased).as(
                        "Card_Calculation_PaymentBased"
                      );

                      // Perform the addition
                    }
                  );
                });
                //Surcharge Code starts here.
                cy.get(
                  ".Table_table-wrapper__SnI4U > :nth-child(2) > :nth-child(1) > :nth-child(1) > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ"
                ).then(($x1) => {
                  lower_bracket = $x1.text().substring(11);
                  cy.log(lower_bracket);
                  cy.wrap(lower_bracket).as("lower_bracket");
                });
                cy.get(
                  ":nth-child(2) > :nth-child(1) > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ"
                ).then(($x1) => {
                  Base_bracket = $x1.text().substring(10);
                  cy.log(Base_bracket);
                  cy.wrap(Base_bracket).as("Base_bracket");
                });
                cy.get(
                  ":nth-child(3) > :nth-child(1) > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ"
                ).then(($x1) => {
                  surcharge_bracket01 = $x1.text().substring(14);
                  cy.log(surcharge_bracket01);
                  cy.wrap(surcharge_bracket01).as("surcharge_bracket01");
                });
                cy.get("@surcharge_bracket01").then((surcharge_bracket01) => {
                  cy.get("@Base_bracket").then((Base_bracket) => {
                    cy.get("@lower_bracket").then((lower_bracket) => {
                      cy.log(surcharge_bracket01);
                      cy.log(Base_bracket);
                      cy.log(lower_bracket);
                      if (SP <= 100) {
                        var flat_SPBASED_Discount = "";
                        var per_SPBASED_Discount = "";
                        cy.get(
                          ":nth-child(1) > .rs-col-xl-16 > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ > :nth-child(1)"
                        ).then(($x1) => {
                          flat_SPBASED_Discount = $x1.text().substring(1);
                          cy.wrap(flat_SPBASED_Discount).as(
                            "flat_SPBASED_Discount"
                          );
                        });
                        cy.get(
                          ":nth-child(1) > .rs-col-xl-16 > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ > :nth-child(2)"
                        ).then(($x1) => {
                          var dis = $x1.text().substring(0, 2);
                          cy.log(dis);
                          per_SPBASED_Discount = (dis / 100) * SP;
                          cy.log(per_SPBASED_Discount);
                          cy.wrap(per_SPBASED_Discount).as(
                            "per_SPBASED_Discount"
                          );
                        });
                        cy.get("@per_SPBASED_Discount").then(
                          (per_SPBASED_Discount) => {
                            cy.get("@flat_SPBASED_Discount").then(
                              (flat_SPBASED_Discount) => {
                                if (
                                  per_SPBASED_Discount < flat_SPBASED_Discount
                                ) {
                                  var Card_Calculation_SPbased =
                                    parseFloat(per_SPBASED_Discount);
                                  cy.log(Card_Calculation_SPbased);
                                  cy.wrap(Card_Calculation_SPbased).as(
                                    "Card_Calculation_SPbased"
                                  );
                                } else {
                                  var Card_Calculation_SPbased = parseFloat(
                                    flat_SPBASED_Discount
                                  );
                                  cy.log(Card_Calculation_SPbased);
                                  cy.wrap(Card_Calculation_SPbased).as(
                                    "Card_Calculation_SPbased"
                                  );
                                }
                              }
                            );
                          }
                        );
                      } else if (SP <= Base_bracket) {
                        var Card_Calculation_SPbased = 0;
                        cy.wrap(Card_Calculation_SPbased).as(
                          "Card_Calculation_SPbased"
                        );
                      } else {
                        var flat_SPBASED_Surcharge = "";
                        var per_SPBASED_Surcharge = "";
                        cy.get(
                          ":nth-child(3) > .rs-col-xl-16 > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ > :nth-child(1)"
                        ).then(($z1) => {
                          flat_SPBASED_Surcharge = $z1.text().substring(1);
                          cy.wrap(flat_SPBASED_Surcharge).as(
                            "flat_SPBASED_Surcharge"
                          );
                          cy.log(flat_SPBASED_Surcharge);
                        });
                        cy.get(
                          ":nth-child(3) > .rs-col-xl-16 > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ > :nth-child(2)"
                        ).then(($z1) => {
                          var sur = $z1.text().substring(0, 2);
                          cy.log(sur);
                          per_SPBASED_Surcharge = (sur / 100) * SP;
                          cy.log(per_SPBASED_Surcharge);
                          cy.wrap(per_SPBASED_Surcharge).as(
                            "per_SPBASED_Surcharge"
                          );
                        });
                        cy.get("@per_SPBASED_Surcharge").then(
                          (per_SPBASED_Surcharge) => {
                            cy.get("@flat_SPBASED_Surcharge").then(
                              (flat_SPBASED_Surcharge) => {
                                if (
                                  per_SPBASED_Surcharge > flat_SPBASED_Surcharge
                                ) {
                                  var Card_Calculation_SPbased = parseFloat(
                                    per_SPBASED_Surcharge
                                  );
                                  cy.log(Card_Calculation_SPbased);
                                  cy.wrap(Card_Calculation_SPbased).as(
                                    "Card_Calculation_SPbased"
                                  );
                                } else {
                                  var Card_Calculation_SPbased = parseFloat(
                                    flat_SPBASED_Surcharge
                                  );
                                  cy.log(Card_Calculation_SPbased);
                                  cy.wrap(Card_Calculation_SPbased).as(
                                    "Card_Calculation_SPbased"
                                  );
                                }
                              }
                            );
                          }
                        );
                      }
                    }); //else block closed here
                  });
                });
              });
            }
          );
        });
      });
    });

    //will update the code to use functions and call them as per 4000 and 5000
    cy.get("@baseCharge").then((baseCharge) => {
      cy.get("@Card_Calculation_SPbased").then((Card_Calculation_SPbased) => {
        cy.get("@Card_Calculation_PaymentBased").then(
          (Card_Calculation_PaymentBased) => {
            Card_Calculation =
              parseFloat(baseCharge) -
              parseFloat(Card_Calculation_PaymentBased) +
              parseFloat(Card_Calculation_SPbased);

            cy.task("save", { v: "Card_Calculation", value: Card_Calculation });
          }
        );
      });
    });
  });

  it("Set the Catalogue Dimensions", function () {
    cy.visit("https://v2.nushop-dashboard.kaip.in");
    cy.get(".rs-input").type("9495760332");
    cy.get(".Button_button-primary__9i0Rz").contains("Generate OTP").click();
    cy.wait(2000);
    cy.get(".rs-input").type("0000");
    cy.get(".Button_button-primary__9i0Rz").contains("Verify OTP").click();
    cy.on("window:confirm", (str) => {
      cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
    });
    cy.wait(2000);
    cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(5)").click();
    cy.get(
      ":nth-child(8) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm"
    ).click();
    cy.get(
      '[href="/product/manage"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
    ).click();
    cy.get(
      ".rs-col-xl-4 > .Flexbox_flex-row__aKbHb > .Text_body3__jmTqb"
    ).click();
    cy.get(":nth-child(1) > .Input_input-group__c6y0f > .rs-input").type(
      "Prod001"
    );
    cy.get(
      ".Flexbox_gutter-sm__kuLks > :nth-child(2) > .Button_button-ghost__rieSu"
    ).click();
    cy.get(".Flexbox_align-stretch__jf368 > .rs-col-xl-4 > :nth-child(1)")
      .contains("Edit")
      .click();
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
    cy.get(":nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f")
      .clear()
      .type(Sku_Weight_01);
    cy.get(":nth-child(5) > :nth-child(2) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(L_01);
    cy.get(":nth-child(6) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(B_01);
    cy.get(":nth-child(3) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(H_01);
    cy.log(SP_01);
    cy.get(":nth-child(3) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .type("{selectall}")
      .type(SP_01);
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
    cy.get(".rs-modal-content > .Card_card__DkrpZ").then(() => {
      cy.get(".rs-modal-footer > .button-link").click();
      cy.get(
        ".rs-modal-body > .Flexbox_flex-row__aKbHb.Flexbox_align-middle__-J0b5.rs-flex-box-grid-center > :nth-child(1)"
      ).type("0000");
      cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
    });
    cy.get(".rs-notification-content").within(() => {
      cy.get(".rs-notification-title-with-icon").should(
        "contain.text",
        "Update Success"
      );
    });
    cy.get(":nth-child(1) > .button-link").click();
    cy.reload();

    cy.get(":nth-child(1) > .Input_input-group__c6y0f > .rs-input").type(
      "Prod002"
    );
    cy.get(
      ".Flexbox_gutter-sm__kuLks > :nth-child(2) > .Button_button-ghost__rieSu"
    ).click();
    cy.get(".Flexbox_align-stretch__jf368 > .rs-col-xl-4 > :nth-child(1)")
      .contains("Edit")
      .click();
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
    cy.get(":nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f")
      .clear()
      .type(Sku_Weight_02);
    cy.get(":nth-child(5) > :nth-child(2) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(L_02);
    cy.get(":nth-child(6) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(B_02);
    cy.get(":nth-child(3) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(H_02);
    cy.log(SP_02);
    cy.get(":nth-child(3) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .type("{selectall}")
      .type(SP_02);
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
    cy.get(".rs-modal-content > .Card_card__DkrpZ").then(() => {
      cy.get(".rs-modal-footer > .button-link").click();
      cy.get(
        ".rs-modal-body > .Flexbox_flex-row__aKbHb.Flexbox_align-middle__-J0b5.rs-flex-box-grid-center > :nth-child(1)"
      ).type("0000");
      cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
    });
    cy.get(".rs-notification-content").within(() => {
      cy.get(".rs-notification-title-with-icon").should(
        "contain.text",
        "Update Success"
      );
    });
  });
  it("WebOrderPlacement", function () {
    cy.visit("http://vishnutesting.nushop.kaip.in/");
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
    cy.get(".css-19qf114 > .css-2f3j1g").each(($e1, index, $list) => {
      var A = $e1.text();
      if (A.includes("Add")) {
        cy.get(".css-19qf114 > .css-2f3j1g").eq(index).click();
        cy.log("///////////////////");
      }
    });
    cy.get(".css-8ethid").within(() => {
      cy.get(".css-uxj08 > .css-19qf114 > .css-2f3j1g").click();
    });
    cy.get(".css-19si1kt > :nth-child(2)").click();
    cy.get(".css-5tfm2q").type("Prod002");
    cy.get(
      ":nth-child(2) > .css-1bkty0y > .css-zejslb > :nth-child(1)"
    ).click();
    cy.get(".css-19qf114 > .css-2f3j1g").click();
    cy.get(".css-uxj08 > .css-1jt1w2w > .css-2f3j1g").click();
    cy.log("//////////////////////////////////");
    cy.get(".css-2f3j1g").contains("Save").click();
    cy.get(".css-19qf114 > .css-2f3j1g").click();
    cy.get(":nth-child(2) > .css-1jxsi8s > .css-k80332").click();
    cy.get(".css-2f3j1g").click();
    cy.get(".css-2f3j1g").click();
    cy.reload();
    cy.wait(10000);
    cy.get(
      ":nth-child(4) > .css-1piga47 > :nth-child(2) > .css-1d3w5wq > .css-2etmj7"
    ).click();
    cy.get(":nth-child(8) > .css-1gqor3r").then(($e1) => {
      OrderId_Single = $e1.text();
      cy.task("save", {
        v: "OrderId_Single",
        value: OrderId_Single,
      });
    });
  });
  it("RateCalculator+PlaceOrder", function () {
    cy.task("load", { v: "Clubbed_Weight" }).then((Clubbed_Weight) => {
      cy.task("load", { v: "new_Clubbed_dimensions" }).then(
        (new_Clubbed_dimensions) => {
          cy.log("Clubbed_Weight", Clubbed_Weight);
          cy.visit("https://v2.nushop-dashboard.kaip.in/login/");
          cy.get(".rs-input").type("9495760332");
          cy.get(".Button_button-primary__9i0Rz")
            .contains("Generate OTP")
            .click();
          cy.wait(2000);
          cy.get(".rs-input").type("0000");
          cy.get(".Button_button-primary__9i0Rz")
            .contains("Verify OTP")
            .click();
          cy.on("window:confirm", (str) => {
            cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
          });
          cy.wait(2000);
          cy.get(
            ".SideNav_sidenav-item-container__PAVyt > :nth-child(8)"
          ).click();
          cy.get(
            ":nth-child(13) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm"
          ).click();
          cy.get(
            '[href="/shipping/rate-calculator"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
          ).click();
          cy.get(
            ":nth-child(4) > :nth-child(2) > .rs-flex-box-grid-item > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ"
          ).click();
          cy.get(
            ":nth-child(4) > :nth-child(1) > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input"
          ).type("560103");
          cy.get(
            ":nth-child(2) > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input"
          ).type("700019");
          cy.get(
            ".Flexbox_align-top__Nx4Aj.Flexbox_mt-lg__HQln6 > .rs-flex-box-grid-item-9 > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input"
          ).type(Clubbed_Weight);
          cy.get(
            ".Flexbox_flex-row__aKbHb > :nth-child(1) > .Input_input-group__c6y0f > .rs-input"
          ).type(new_Clubbed_dimensions);
          cy.get(
            ".rs-flex-box-grid-item-24 > .Flexbox_flex-row__aKbHb > :nth-child(2) > .Input_input-group__c6y0f > .rs-input"
          ).type(new_Clubbed_dimensions);
          cy.get(
            ".rs-flex-box-grid-item-10 > .Input_input-group__c6y0f > .rs-input"
          ).type(new_Clubbed_dimensions);
          cy.get(
            ":nth-child(2) > .Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input"
          ).clear();
          cy.wait(1000);
          cy.get(
            ":nth-child(2) > .Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input"
          ).type(SP_01 + SP_02);
          cy.get(
            ".Flexbox_mt-lg__HQln6.rs-flex-box-grid-center > .Button_button-primary__9i0Rz"
          ).click();
          cy.get(
            ".Message_message__OaRQ6 > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ"
          ).then(($btn) => {
            cy.wait(4000);
            var str = $btn.text();
            var arr = new Array();
            arr = str.split(",");
            cy.log(arr);
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].includes("Delhivery Surface")) {
                var p = arr[i];
                p = p.trim();
                for (var z = 0; z < p.length; z++) {
                  if (p.charAt(z) === " ") {
                    rateofEcome = p.substring(z, p.length);
                    cy.log(rateofEcome);
                  }
                }
              }
            }
          });
          cy.get(
            ".SideNav_sidenav-item-container__PAVyt > :nth-child(3)"
          ).click();
          cy.get(
            ":nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm"
          ).click();
          cy.get(
            '[href="/orders/place-order"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
          ).click();
          cy.get(
            ":nth-child(5) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input"
          ).type("7908961320");
          //cy.get(':nth-child(6) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input').type('Pratik')
          cy.get(
            ":nth-child(8) > :nth-child(2) > .Input_input-group__c6y0f > .rs-input"
          ).type("Jcr layout panathur bangalore");
          cy.get(
            ":nth-child(7) > :nth-child(1) > .Input_input-group__c6y0f > .rs-input"
          )
            .clear()
            .type("700019");
          cy.get(".rs-btn-toolbar > :nth-child(2)").click();
          cy.get(
            ".Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz"
          ).click();
          cy.get(
            ".rs-col-xl-18 > .Card_card__DkrpZ > .Flexbox_flex-row__aKbHb > .rs-btn-toolbar > .Button_button-primary__9i0Rz"
          ).click();
          cy.get(".rs-input").click().type("Prod");
          cy.get(".rs-input-group-addon").click();
          cy.wait(2000);
          cy.get(".rs-drawer-body").within(($row) => {
            cy.get('div[class="Tooltip_tooltip-children-wrapper__n+g1q"]').each(
              ($e1, index, $list) => {
                var p = $e1.text();
                if (p.includes("PROD001")) {
                  cy.get(
                    ".rs-flex-box-grid-item-2 > .rs-checkbox > .rs-checkbox-checker > label > .rs-checkbox-wrapper"
                  )
                    .eq(index)
                    .click();
                } else if (p.includes("PROD002")) {
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
          cy.get(
            ".ProductDetails_cta-style__Ktrhb > .rs-btn-toolbar > .Button_button-primary__9i0Rz"
          ).click();
          cy.get(
            ":nth-child(1) > :nth-child(1) > .CourierPartnerCard_courier-partner-card__pV9GA > .CourierPartnerCard_courier-card-body__Bx7jb > .heading4"
          )
            .contains("DELHIVERY")
            .click();
          cy.get(
            ".rs-flex-box-grid-end > .Button_button-primary__9i0Rz"
          ).click();
          cy.get(
            ".rs-flex-box-grid-item-24 > :nth-child(1) > :nth-child(2) > :nth-child(4)"
          ).then(($spec) => {
            if ($spec.text().includes(rateofEcome)) {
              cy.get(
                ".ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz"
              ).click();
            }
          });
        }
      );
    });
  });
  it("PlacedOrderCharges_Manual LP", function () {
    cy.visit("https://v2.nushop-dashboard.kaip.in/login/");
    cy.get(".rs-input").type("9495760332");
    cy.get(".Button_button-primary__9i0Rz").contains("Generate OTP").click();
    cy.wait(2000);
    cy.get(".rs-input").type("0000");
    cy.get(".Button_button-primary__9i0Rz").contains("Verify OTP").click();
    cy.on("window:confirm", (str) => {
      cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
    });
    cy.wait(2000);
    cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(4)").click();
    cy.get(":nth-child(4) > :nth-child(2) > .Flexbox_flex-row__aKbHb")
      .contains("Orders")
      .click();
    cy.wait(2000);
    cy.get(
      '[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
    ).click();
    cy.wait(2000);
    cy.get(
      ".TableHeader_card-container-header__rp1eA > :nth-child(4) > .Text_body3__jmTqb"
    ).click();
    cy.get('div[class="ButtonGroup_buttongroup-container__Q+BiA rs-btn-group"]')
      .contains("Clubbed")
      .click();
    cy.task("load", { v: "OrderId_Single" }).then((OrderId_Single) => {
      cy.get(".rs-input").type(OrderId_Single);
      cy.get(".rs-input-group-addon").click();
      cy.get(".action-btns-wrapper > :nth-child(3)")
        .contains("Logistic")
        .click(); //Clicking the Logistics CTA
      cy.wait(10000);
      cy.get(":nth-child(4) > .Input_input-group__c6y0f")
        .clear()
        .type("736135");
      cy.get(
        " .ShippingPartner_shipping-partner-card-wrapper__hpb2y > .ShippingPartner_card-content-wrapper__NHAQH > .Text_body3__jmTqb"
      ).each(($z1, index, list) => {
        var p = $z1.text();
        if (p.includes("DELHIVERY SURFACE")) {
          cy.get(
            " .ShippingPartner_shipping-partner-card-wrapper__hpb2y > .ShippingPartner_card-content-wrapper__NHAQH > .Text_body3__jmTqb"
          )
            .eq(index)
            .click();
        }
      });
      cy.get(".rs-drawer-actions > .Button_button-primary__9i0Rz").click();
      cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
      cy.wait(2000);
      cy.get(".action-btns-wrapper > :nth-child(3)")
        .click() //Clicking the Logistics CTA
        .then(() => {
          cy.wait(10000);
          cy.get(":nth-child(4) > .Input_input-group__c6y0f")
            .clear()
            .type("700019");
          cy.get(
            " .ShippingPartner_shipping-partner-card-wrapper__hpb2y > .ShippingPartner_card-content-wrapper__NHAQH > .Text_body3__jmTqb"
          ).each(($z1, index, list) => {
            var p = $z1.text();
            if (p.includes("DELHIVERY SURFACE")) {
              cy.get(
                " .ShippingPartner_shipping-partner-card-wrapper__hpb2y > .ShippingPartner_card-content-wrapper__NHAQH > .heading4"
              )
                .eq(index)
                .then(($s1) => {
                  ManualLP_charges = $s1.text().substring(1);
                  cy.task("save", {
                    v: "ManualLP_charges",
                    value: ManualLP_charges,
                  });
                });
              cy.get(
                " .ShippingPartner_shipping-partner-card-wrapper__hpb2y > .ShippingPartner_card-content-wrapper__NHAQH > .Text_body3__jmTqb"
              )
                .eq(index)
                .click();
            }
          });
          cy.get(".rs-drawer-actions > .Button_button-primary__9i0Rz").click();
          cy.get(".rs-modal-footer > .Button_button-primary__9i0Rz").click();
          cy.wait(2000);
          cy.task("load", { v: "Card_Calculation" }).then(
            (Card_Calculation) => {
              cy.task("load", { v: "ManualLP_charges" }).then(
                (ManualLP_charges) => {
                  cy.log(ManualLP_charges);
                  cy.log(rateofEcome);
                  cy.log(Card_Calculation);
                }
              );
            }
          );
        });
    });
  });
});

// not able to access values in it block
