// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// Without JPA URL
// export const API_URL= 'http://localhost:8080';

// With JPA services URL locally
export const TASK_MANAGEMENT_SERVICES_URL = 'http://localhost:8080';

export const AUTH_KEY = 'AUTH_KEY';
export const LOGGEDIN_USER_INFO = 'SESSION_USER';

// Auth URL
// export const AUTH_URL = 'http://localhost:8080';


// With JPA services URL CF cloud
// export const API_URL = 'https://pcf-rest-demo-jwt.cfapps.io/jpa';

// WITHOUT jpa cf CLOUD
// export const API_URL = 'https://pcf-rest-demo-jwt.cfapps.io/';

// Auth URL
// export const AUTH_URL = 'https://pcf-rest-demo-jwt.cfapps.io';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
