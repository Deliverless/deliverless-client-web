import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const sendEmail = (templateID, templateParams) => {

  emailjs.send(process.env.REACT_APP_EMAILJS_SERVICEID, templateID, templateParams, process.env.REACT_APP_EMAILJS_PUBLICKEY)
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
};

export default sendEmail;