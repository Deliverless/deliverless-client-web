import React, { Component, useEffect } from "react";
import * as setup from "../config/hash.php";
var GlobalPayments = window.GlobalPayments;

const PaymentCard = () => {
  console.log("configured", window.GlobalPayments);

  useEffect(async () => {
    window.GlobalPayments.configure({
      merchantId: "MER_7e3e2c7df34f42819b3edee31022ee3f",
      account: "TRA_c9967ad7d8ec4b46b6dd44a61cde9a91",
      hash: function (request) {
        return setup;
      },
      env: "sandbox",
    });

    const cardForm = GlobalPayments.creditCard.form("#credit-card");

// form-level event handlers. examples:
cardForm.ready(() => {
  console.log("Registration of all credit card fields occurred");
});
cardForm.on("token-success", (resp) => {
  // add payment token to form as a hidden input
  const token = document.createElement("input");
  token.type = "hidden";
  token.name = "payment-reference";
  token.value = resp.paymentReference;

  // submit data to the integration's backend for processing
  const form = document.getElementById("payment-form");
  form.appendChild(token);
  form.submit();
});
cardForm.on("token-error", (resp) => {
  // show error to the consumer
});

// field-level event handlers. example:
cardForm.on("card-number", "register", () => {
  console.log("Registration of Card Number occurred");
});
  
  }, []);

  return (
    <>
      <form id="payment-form" action="/charge" method="get">
        <label for="billing-zip">Billing Postal Code</label>
        <input id="billing-zip" name="billing-zip" type="tel" />

        <div id="credit-card"></div>
      </form>

    </>
  );
};

export default PaymentCard;
