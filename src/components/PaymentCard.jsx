import React, { Component, useEffect } from "react";
import axios from 'axios'
import * as crypto from 'crypto';
var GlobalPayments = window.GlobalPayments;



const PaymentCard = () => {
  console.log("configured", window.GlobalPayments);

  useEffect(async () => {

    let appId = 'nlT1RcALpWibf2G7bl2KcMQoKxjdLiXz'
    let appKey = 'wxbAtPNQmy4Y2Njb'
    let nonce = new Date()
    let secret = crypto.createHash('sha512').update(nonce+appKey).digest('hex');

    let response = await axios({
      method: 'post',
      url: 'https://apis-qa.globalpay.com' + '/ucp/accesstoken',
      headers: {
        "X-GP-Version": '2020-10-22'
      },
      data: {
        app_id: appId,
        secret: secret,
        grant_type: 'client_credentials',
        nonce: nonce,
        interval_to_expire: "1_HOUR"
      
      }
    });

    console.log(response)


    window.GlobalPayments.configure({
      accessToken: response.data,
      env: "sandbox"
    });

    GlobalPayments.on("error", function (error) {
      console.error(error);
    });

    var cardForm = GlobalPayments.creditCard.form('#credit-card-form', { style: "gp-default" });

    cardForm.on("token-success", function (resp) { console.log(resp); });
    cardForm.on("token-error", function (resp) { console.log(resp); });
  
  }, []);

  return (
    <>

        <div id="credit-card-form"></div>
      

    </>
  );
};

export default PaymentCard;
