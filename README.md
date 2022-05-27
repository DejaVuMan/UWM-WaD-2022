# Walk-a-Dog project for UWM, intended for Billenium. 2022

## Launching .NET Backend
Launching .NET backend is as easy as going to DotNetProjects\dotnet_walkADog_backend, opening powershell, and typing ```dotnet run```. Some additional functionalities may require the usage of dotnet ef tools.

## Launching React Frontend
Also easy, simply go to DotNetProjects\React-dotnet-frontend\src\main\webapp and open powershell. From here, you might need to do ```npm install``` for package dependencies if you do not have them yet, and then simply using the ```npm start``` command.

### Known issues and workarounds
Depending on your version of npm, you might get an SSL certificate error when launching the frontend. For a development environment, simply go to the same path as listed above and type ```$env:NODE_OPTIONS="--openssl-legacy-provider"``` and it should work then.
