//Constraints enter only numeric values
var L_01 = 2; //All the LBH will stored multiplied by 10
var B_01 = 2;
var H_01 = 2;
var L_02 = 2; //All the LBH will stored multiplied by 10
var B_02 = 2;
var H_02 = 3;
var baseCharge;
var Initial_sku_weight_01 = 1;
var Sku_Weight_01 = 1.3;
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
var OrderId_Single = "";
var Orderid_Clubbed = "";
var charges = "";
var ManualLP_charges = "";
var SP_01 = 200;
var SP_02 = 200;
var Payment_COD_charge = "";
var percentage_discount = "";
var lower_bracket = "";
var Base_bracket = "";
var surcharge_bracket01 = "";
var Chargeable_Weight_Slab = "";

describe("AdminLimitStore", function () {
  var new_Clubbed_dimensions;
  var OrderId_Single = "";
  var Orderid_Clubbed = "";
  var charges = "";
  var ManualLP_charges = "";
  var SP_01 = 200;
  var SP_02 = 200;
  var Payment_COD_charge = "";
  var percentage_discount = "";
  var lower_bracket = "";
  var Base_bracket = "";
  var surcharge_bracket01 = "";
  var Chargeable_Weight_Slab = "";
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
    cy.get(":nth-child(1) > .button-link").click();
    cy.reload();
    cy.get(
      ".rs-col-xl-4 > :nth-child(1) > .Flexbox_flex-row__aKbHb > .Text_body3__jmTqb"
    ).click();
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
    // Assuming you have an input field with the selector '.your-input-field'
    cy.get(":nth-child(3) > :nth-child(1) > .InputNumber_input-group__4wC0i")
      .type("{selectall}")
      .type(SP_02);
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
    cy.get(".rs-btn-toolbar > .Button_button-primary__9i0Rz").click();
  });
  it("WebOrderPlacement", function () {
    cy.visit("https://vishnutesting.nushop.kaip.in/");
    cy.wait(2000);
    cy.get(":nth-child(2) > .css-12d75xc > .css-1tu2nel")
      .contains("Orders")
      .click();
    cy.get(".css-1vw8438").type("8888888888");
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
    cy.get(".css-1jt1w2w > .css-2f3j1g").click();
    cy.get(".css-2f3j1g").click();
    cy.log("//////////////////////////////////");
    cy.get(".css-19qf114 > .css-2f3j1g").click();
    cy.get(".css-k80332").contains("COD").click();
    cy.get(".css-2f3j1g").click();
    cy.get(".css-19qf114 > .css-2f3j1g").click();
    cy.get(".css-19qf114 > .css-2f3j1g").click();
    cy.get(":nth-child(8) > .css-1gqor3r").then(($e1) => {
      cy.wrap($e1.text()).as("s");
    });
    cy.get("@s").then((s) => {
      OrderId_Single = s;
      cy.log(OrderId_Single);
    });
  });
  it("Calculating Dimensions", function () {
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
    cy.log(Clubbed_Weight);
    var a = 4000 * Clubbed_Weight;
    new_Clubbed_dimensions = Math.cbrt(a);
    cy.log(new_Clubbed_dimensions);
    //we will now Calculate the Chargeable weight Slab
    if (Clubbed_Weight < 5) {
      function roundToNearestHalf(number) {
        return Math.ceil(number * 2) / 2;
      }
      Chargeable_Weight_Slab = roundToNearestHalf(Clubbed_Weight);
      console.log(Chargeable_Weight_Slab);
    } else {
      Chargeable_Weight_Slab = Math.ceil(Clubbed_Weight);
    }
    cy.log(Clubbed_Weight);
  });
  it("RateCalculator+PlaceOrder", function () {
    cy.log("Clubbed_Weight", Clubbed_Weight);
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
}); // not able to access values in it block
