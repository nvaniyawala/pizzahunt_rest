/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtDecode } from "jwt-decode";
import {
  IDeliveryPerson,
  ILoginPayload,
  ILoginResponse,
  ITokenPayload,
  IUser,
  IOutlet,
} from "../types/interfaces";
import { Roles } from "../types/commons";

type T =
  | IUser
  | ILoginPayload
  | ILoginResponse
  | IOutlet
  | IDeliveryPerson
  | IOutlet;
export function hasAnyEmptyKeys(obj: T): boolean {
  let counter: number = 0;
  Object.keys(obj).map((item) => {
    if (obj[item].length === 0 || !obj[item].trim()) {
      counter++;
    }
  });
  if (counter === 0) {
    return false;
  } else {
    return true;
  }
}
// export const convertByteArrayToImage = (bArray: Uint8Array) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const uint8Array = new Uint8Array(bArray);
//       const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Adjust the MIME type accordingly
//       const dataURL = URL.createObjectURL(blob);
//       resolve(dataURL);
//     } catch (ex) {
//       console.log(ex);
//       reject(new Error("Unable to covnert into image"));
//     }
//   });
// };

export const convertImageToBlob = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target.readyState === FileReader.DONE) {
        const base64String = event.target.result.split(",")[1];
        const byteArray = atob(base64String)
          .split("")
          .map((char) => char.charCodeAt(0));
        resolve(base64String);
      }
    };
    reader.onerror = (event) => {
      reject(new Error("Unable to read file"));
    };
    reader.readAsDataURL(file);
  });
};
export function ObjectFlatter(complexObject:any) {
  let simpleObject:any;
  for (let item in complexObject) {
    if (typeof complexObject[item] !== 'object') {
      simpleObject = { ...simpleObject, [item]: complexObject[item] };
    } else {
      for (let i in complexObject[item]) {
        simpleObject = { ...simpleObject, [`${item}_${i}`]: complexObject[item][i] };
      }
    }
  }
  return simpleObject
}
export function isTokenExpired(miliseconds: number): boolean {
  if (miliseconds > new Date().getTime()) {
    return false;
  } else {
    return true;
  }
}
export const TokenValidation = (): { role: Roles; isExpired: boolean } => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decode: ITokenPayload = jwtDecode(token);
      return { isExpired: isTokenExpired(decode.exp), role: decode.groups[0] };
    } catch (ex) {
      return { isExpired: true, role: "" };
    }
  }
  return { isExpired: true, role: "" };
};
export const convertByteArrayToImage = (bArray: Uint8Array) => {
  return new Promise((resolve, reject) => {
    try {
      const uint8Array = new Uint8Array(bArray);
      const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Adjust the MIME type accordingly
      const dataURL = URL.createObjectURL(blob);
      resolve(dataURL);
    } catch (ex) {
      console.log(ex);
      reject(new Error("Unable to covnert into image"));
    }
  });
};

// export const convertImageToBlob = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event: ProgressEvent<FileReader>) => {
//       if (event.target.readyState === FileReader.DONE) {
//         const base64String = event.target.result.split(",")[1];
//         const byteArray = atob(base64String)
//           .split("")
//           .map((char) => char.charCodeAt(0));
//         resolve(byteArray);
//       }
//     };
//     reader.onerror = (event) => {
//       reject(new Error("Unable to read file"));
//     };
//     reader.readAsDataURL(file);
//   });
// };
