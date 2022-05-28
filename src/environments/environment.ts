// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as firebase from 'firebase/app';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCoELWHChs8KpHc-YaiyEsYUsxUlt_CB5M",
    authDomain: "varbot-a92ef.firebaseapp.com",
    databaseURL: "https://varbot-a92ef-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "varbot-a92ef",
    storageBucket: "varbot-a92ef.appspot.com",
    messagingSenderId: "902443921444"
  }
};

firebase.initializeApp(environment?.firebaseConfig);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
