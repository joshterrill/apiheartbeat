cd src/public/client
npm ci
npm i --only=dev
npm update
npm i -g @angular/cli
npm i @angular-devkit/build-angular
ng build --configuration=production --output-path ../compiled/
