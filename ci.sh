cd src/public/client
npm ci
echo "1"
ls ./
echo "2"
ls ../
echo "3"
ls ../../
echo "4"
ls ../../../
./node_modules/@angular/cli/bin/ng build --configuration=production --output-path ../compiled/
