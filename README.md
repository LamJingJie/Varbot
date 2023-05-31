
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

<br><br><br>

# Varbot
#### Video Demo:  https://www.youtube.com/watch?v=Bs0v_3x1bRM
#### Description: 
This website allows users to create 'bots' using puppeteer as the 3rd party plugin to automate websites. Being able to save those 'bots' as well. Used Angular 12 as the frontend framework because angular is better suited for a single page website which is what I am going for. Used Express framework to have puppeteer work on the server-side by sending data through POST, as attempting to have puppeteer work on the client-side will not work due to security reasons. Used Realtime Firebase as my database as it has better latency than Cloud Firestore. Allowing for data to appear more 'realtime'. Used Puppeteer which is a 3rd-party plugin that allows for bot building and instructing. 

I used localstorage to store the user's data locally rather than sessionstorage as in this context I wish to have to user always logged in until they choose otherwise. As logging them out every time the current instance is closed in this context is a bad user design and may irritate them. All my code is stored in the 'home' folder and everything else is just modals(popups) that appear when you click on a button on the website rather than a new page itself.

I used firebase authentication to facilitate logging in and out. As they are more secure with better encryption than if I were to do it myself. Also allowing the user an option to log in using their google account, facebook account (not implemented), etc.

The usage of the bot requires abit of knowledge regarding how to inspect an element on the website. And based on the element, class, etc. Make a decision on which one you want to automate. I am unable to find other plugins that does similar to this in this context, and so had to make do with this.


<br><br><br>


<table>
<tr>
  <td>
    1. <b> Angular 12 </b> used as the frontend framework
  </td>
  <td>
    2. <b> Express </b> framework used, which is a <b> Node.js </b> framework. Used in-unison to aid in the backend
  </td>
  <td>
    3. <b> Node.js V15 </b> used as the backend JS run-time environment 
  </td>
  <td>
    4. <b> Realtime Firebase </b> used as the database because it has btr latency, allowing data to appear more 'realtime' as compared to Cloud Firestore
  </td>
  <td>
    5. <b> Puppetter </b> used for bot building and instructing
  </td>
  <td>
    6. <b> Typescript </b> as the main programming language followed by JS (for the backend)
  </td>
</tr>
</table> 


## Development server

Run `ng serve --proxy-config proxy.config.json` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Start Server-side

Run `npm start` to run the server-side. Navigate to `http://localhost:8080/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

<h2>Commit</h2>
- git add . <br>
- git commit -m "<--title-->" <br>
- git push

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
