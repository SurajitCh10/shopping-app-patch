import React from "react";

// function urlValidator(url) {
//   const regex = new RegExp(
//     "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
//   );
//   return regex.test(url);
// }

// function emailValidator(email) {
//   const regex = new RegExp(
//     `${/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}`
//   );
//   return regex.test(email);
// }

// function inputValidator(input) {
//   const regex = new RegExp("/^[a-zA-Z0-9[!#$%&?]*$/");
//   return regex.test(input);
// }

// export { urlValidator, emailValidator, inputValidator };

export const urlValidator =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
export const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const inputValidator = /^(\d)([!@#$%^&*])([a-z])(?=.[A-Z]).{1,}$/;
