cd src/public/client
npm ci
npm i -g @angular/cli@7.0.4
ng build --configuration=production --output-path ../compiled/
