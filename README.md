# ng-firebase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.
in realization of the tutorials published by firebase team and others , this is the list of references:
1. official firebase angular
2. 
3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Installation
## Clone the repository
`git clone https://github.com/timyshark/ng-firebase.git`

## Install Dependencies
`npm install`

## Setup Firebase Project/App
### step 1: (Create new Project) => Firebase console -> create project
### Step 2: (Create Web App) => Firebase console -> Project settings -> create new Web App 
### Step 3: (Enable Authentication) => Firebase console -> Project settings -> (on left side menu) Build -> Authentication (Enable Google , Email & Password)
### Step 4: (Create Cloud Firestore) => Firebase console -> Project settings -> (on left side menu) Build -> Cloud Firestore (create one)
### Step 4: (Generate Config file and download json file) => Firebase console -> Project Settings -> App Settings -> Firebase SDK snippet (Config)

## Configure Angular App
### Step 1: Generate Config file => on project folder (typically ng-firebase) format config file to the below format and save it in the directory src/envorments and name it firebase_config.json
(quote keys with "double quotes" and use only the object)
`
{
  "apiKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "authDomain": "xxx.yyy.zzz.firebaseapp.com",
  "projectId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "messagingSenderId": "DDDDDDDDDDDDDD",
  "appId": "1:xxxxxxxxxxxxxxxxxx:web:yyyyyyyyyyyyyyyyyyyyy",
  "measurementId": "D-XXXXXXXXXXXX"
}
`
NOTE: make sure to exclude this file "firebase_config.json" from your version control, it contains sensitive datea could make someone use your project resources at your own expense :/
in git, edit .gitignore file and add it to the ignored files 
/src/environments/firebase_config.json

### Step 2: Configure tsconfig.json => edit tsconfig.json (found at the project root) add these 2 lines in the 
 "compilerOptions" :{
    :
    "resolveJsonModule": true,
    "esModuleInterop": true
 }


## Install the firebase SDK
$firebase init
Enable SPA (index.html rewrites)
build : dist/ng-firebase

## deploy 
$firebase deploy

Enjoy ~!
