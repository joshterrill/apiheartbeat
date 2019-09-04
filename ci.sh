# for heroku build step
cd src/public/client
npm ci
npm i -g @angular/cli
npm install @angular-devkit/build-angular@0.13.8 @angular-devkit/build-ng-packagr@0.13.8
ng build --configuration=production --output-path ../compiled/
