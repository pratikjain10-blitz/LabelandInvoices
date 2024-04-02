//We are here checking for both the case where Volumetric divisor is greater then Sku Weight and vice versa
//All the Calculation will be for 4000 divisor LP's
//Metro to Metro Calculation
//when only Discount , Base Charge , Surcharge01 is present
var L = 2; //All the LBH will stored multiplied by 10
var B = 2;
var H = 2;
var Initial_sku_weight = 1;
var Sku_Weight = 1;
var rateofEcome;
var TemplateCalculation;
var dim;
var baseCharge;
var Card_Calculation;

describe("AdminLimitStore", function () {
  var OrderId = "";
  var charges = "";
  var ManualLP_charges = "";
  var SP = 150;
  var Payment_COD_charge = "";
  var percentage_discount = "";
  var lower_bracket = "";
  var Base_bracket = "";
  var surcharge_bracket01 = "";
  var Chargeable_Weight_Slab = "";

  it("Set the Catalogue Dimensions", function () {
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
    cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(5)").click();
    cy.get(
      ":nth-child(8) > :nth-child(2) > .Flexbox_flex-row__aKbHb > .Text_body1__jlAQm"
    ).click();
    cy.get(
      '[href="/product/manage"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
    ).click();
    cy.get(
      ".rs-col-xl-4 > :nth-child(1) > .Flexbox_flex-row__aKbHb > .Text_body3__jmTqb"
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
      .type(Sku_Weight);
    cy.get(":nth-child(5) > :nth-child(2) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(L);
    cy.get(":nth-child(6) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(B);
    cy.get(":nth-child(3) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .clear()
      .type(H);
    cy.log(SP);
    // Assuming you have an input field with the selector '.your-input-field'
    cy.get(":nth-child(3) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .type("{selectall}")
      .type(SP);
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
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
    /*cy.get(".css-gt3izn").then((a1) => {  
      var z = a1.text().substring(1);
      cy.log(z);
      SP = z;
      cy.log(SP);
    });*/
  });
  it("Calculating Dimensions", function () {
    var new_dimensions;
    var Volumetric_Weight01 = (L * B * H * 1000) / 4000;
    cy.log(Volumetric_Weight01);
    if (Volumetric_Weight01 > Initial_sku_weight) {
      let a = 4000 * Volumetric_Weight01;
      new_dimensions = Math.cbrt(a);
      cy.log(new_dimensions);
      Sku_Weight = Volumetric_Weight01;
      cy.log(Sku_Weight);
      dim = new_dimensions;
    }
    //we will now Calculate the Chargeable weight Slab
    if (Sku_Weight < 5) {
      function roundToNearestHalf(number) {
        return Math.ceil(number * 2) / 2;
      }

      // Example usage:
      Chargeable_Weight_Slab = roundToNearestHalf(Sku_Weight);
      console.log(Chargeable_Weight_Slab);
    } else {
      Chargeable_Weight_Slab = Math.ceil(Sku_Weight);
    }
  }); //will update the code to use functions and call them as per 4000 and 5000
  it("RateCalculator+PlaceOrder", function () {
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
    cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(8)").click();
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
    ).type(Initial_sku_weight);
    cy.get(
      ".Flexbox_flex-row__aKbHb > :nth-child(1) > .Input_input-group__c6y0f > .rs-input"
    ).type(L * 10);
    cy.get(
      ".rs-flex-box-grid-item-24 > .Flexbox_flex-row__aKbHb > :nth-child(2) > .Input_input-group__c6y0f > .rs-input"
    ).type(L * 10);
    cy.get(
      ".rs-flex-box-grid-item-10 > .Input_input-group__c6y0f > .rs-input"
    ).type(L * 10);
    cy.get(
      ":nth-child(2) > .Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input"
    ).clear();
    cy.wait(1000);
    cy.get(
      ":nth-child(2) > .Flexbox_flex-row__aKbHb > .rs-flex-box-grid-item > .Input_input-group__c6y0f > .rs-input"
    ).type(SP);
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
    cy.get(".SideNav_sidenav-item-container__PAVyt > :nth-child(3)").click();
    cy.get(":nth-child(4) > .Text_body1__jlAQm").click();

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
    cy.get(".Flexbox_mt-lg__HQln6 > .Button_button-primary__9i0Rz").click();
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
    cy.get(".rs-flex-box-grid-end > .Button_button-primary__9i0Rz").click();
    cy.get(
      ".rs-flex-box-grid-item-24 > :nth-child(1) > :nth-child(2) > :nth-child(4)"
    ).then(($spec) => {
      if ($spec.text().includes(rateofEcome)) {
        cy.get(
          ".ReviewOrder_review-order-cta__Slqfv > .Button_button-primary__9i0Rz"
        ).click();
      }
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
    cy.wait(5000);
    cy.get(
      '[href="/orders/process-orders"] > .Flexbox_flex-row__aKbHb > .Text_body2__0FftJ'
    ).click();
    cy.wait(5000);
    cy.get(
      ".TableHeader_card-container-header__rp1eA > :nth-child(4) > .Text_body3__jmTqb"
    ).click();
    cy.get(".rs-input").type(OrderId); //
    cy.get(".rs-input-group-addon").click();
    cy.get(".rs-col-md-6 > :nth-child(3) > .Text_body2__0FftJ")
      .eq(0)
      .then(($l1) => {
        var charges = $l1.text();
        charges = charges.substring(7);
        cy.log(charges);
      });
    cy.get(".action-btns-wrapper > :nth-child(3)")
      .click() //Clicking the Logistics CTA
      .then(() => {
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
      });
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
                var charge = $s1.text().substring(1);
                cy.log(charge);
                ManualLP_charges = charge;
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
        cy.log(ManualLP_charges);
      });
  });
  it("ForwardRatesCalculation", function () {
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
          cy.get(
            " .Flexbox_flex-row__aKbHb > :nth-child(1) > .Text_body2__0FftJ"
          ).each(($n1, index, list) => {
            var check = $n1.text();
            cy.log(check);
            cy.log("Chargeable_Weight_Slab:", Chargeable_Weight_Slab);
            var p = Chargeable_Weight_Slab + " Kg";
            cy.log(p);
            if (check === p) {
              cy.wrap(index).as("n");
              return false;
            }
          });
        }
      }
    );
    cy.get("@n").then((n) => {
      cy.log(n);
      cy.get(".Flexbox_flex-row__aKbHb > :nth-child(4) > .Text_body2__0FftJ")
        .eq(n - 1)
        .then(($b1) => {
          baseCharge = $b1.text().substring(1);
          cy.log(baseCharge);
          cy.wrap(baseCharge).as("baseCharge");
          cy.log(SP);
        });
      cy.get("@baseCharge").then((baseCharge) => {
        cy.log(baseCharge);
        //Since we have made COD as fixed we will calculate the COD charges first
        //Payment Based Surcharge/Discount
        cy.get(
          ".Flexbox_mt-sm__1BOrf > :nth-child(1) > .Text_body2__0FftJ > :nth-child(1)"
        ).then(($v1) => {
          Payment_COD_charge = $v1.text().substring(1);
          cy.log(Payment_COD_charge);
          cy.wrap(Payment_COD_charge).as("Payment_COD_charge");
          cy.log(Payment_COD_charge);
        });
        cy.get(
          ".Flexbox_mt-sm__1BOrf > :nth-child(1) > .Text_body2__0FftJ > :nth-child(2)"
        ).then(($n1) => {
          var flat_discount = $n1.text().substring(0, 2);
          cy.log(flat_discount);
          percentage_discount = (flat_discount / 100) * SP;
          cy.log(percentage_discount);
          cy.wrap(percentage_discount).as("percentage_discount");
        });
        cy.get("@Payment_COD_charge").then((Payment_COD_charge) => {
          cy.get("@percentage_discount").then((percentage_discount) => {
            cy.log("percentage_discount", percentage_discount);
            cy.log("Payment_COD_charge", Payment_COD_charge);
            if (percentage_discount > Payment_COD_charge) {
              Payment_COD_charge = percentage_discount;
              cy.log("new Payment_COD_charge", Payment_COD_charge);
              cy.wrap(Payment_COD_charge).as("Payment_COD_charge");
            }
            cy.get("@baseCharge").then((baseCharge) => {
              cy.get("@Payment_COD_charge").then((Payment_COD_charge) => {
                let baseChargeValue = Number(baseCharge);
                let Payment_COD_chargeValue = Number(Payment_COD_charge);

                // Perform the addition
                let sumResult = baseChargeValue + Payment_COD_chargeValue;

                // Log the result
                cy.log(`The sum is: ${sumResult}`);

                // Optionally, you can use cy.wrap to alias the result
                cy.wrap(sumResult).as("Card_Calculation");
              });
            });
            //Surcharge Code starts here .
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
            cy.get("@Card_Calculation").then((Card_Calculation) => {
              cy.get("@surcharge_bracket01").then((surcharge_bracke) => {
                cy.get("@Base_bracket").then((Base_bracket) => {
                  cy.get("@lower_bracket").then((lower_bracket) => {
                    cy.log(surcharge_bracket01);
                    cy.log(Base_bracket);
                    cy.log(lower_bracket);
                    cy.log(Card_Calculation);
                    if (SP < 100) {
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
                                Card_Calculation =
                                  Card_Calculation - per_SPBASED_Discount;
                                cy.log(Card_Calculation);
                              } else {
                                Card_Calculation =
                                  Card_Calculation - flat_SPBASED_Discount;
                                cy.log(Card_Calculation);
                              }
                            }
                          );
                        }
                      );
                    } else if (SP < Base_bracket) {
                      cy.log(Card_Calculation);
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
                                Card_Calculation =
                                  Card_Calculation + per_SPBASED_Surcharge;
                                cy.log(Card_Calculation);
                              } else {
                                Card_Calculation =
                                  Card_Calculation + flat_SPBASED_Surcharge;
                                cy.log(Card_Calculation);
                              }
                            }
                          );
                        }
                      );
                    } //else block closed here
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  it("Matching all the Charges", function () {
    cy.log(Card_Calculation);
    cy.log(ManualLP_charges);
    cy.log(rateofEcome);
  });
});
//closing for describe block
//Else part for over 5kg weight slab is left
//Website se jo Order laga uska bhe charges alag karna hai
