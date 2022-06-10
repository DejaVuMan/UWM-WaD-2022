# Walk-a-Dog project for UWM, intended for Billenium. 2022

## About this project


This project was designed for a university class with Billenium, intended to teach students some UI and software development principles in back-end and 
front-end practices.

<table>
<tr><th>Frontend </th><th>Backend</th></tr>
<tr><td>

- React 17.0.2
- React-Redux ^7.2.2
- Redux ^4.0.5
- Axios ^0.19.2
- MUI for core style elements

</td><td>

- NET 6.0
- Embedded SQLite DB / SQL Server
- JWT middleware

</td></tr> </table>

Security was a key focus on this project, which is why JWT authentication was crucial. Many elements were inspired by Jason Watmoore (aka [cornflourblue](https://github.com/cornflourblue) on Github - thank you for concise and understandable examples!) for user authentication to back-end resources. Ultimately, all key elements which were of high importance for Billenium (Creating a user/trainer profile, dog profile, reserving a time slot and setting a time slot, editing user data, sending a trainer report/viewing a trainer report, leaving a rating...) were all met, and the project recieved one of the highest grades for the class.

As someone who has had C# programming experience, working on *both* the frontend and backend of code in something like a fullstack dev position was interesting. React definitely has a high barrier to entry as far as learning it, and the mixture of JS/JSX definitely leads to creative (albiet slightly clunky) solutions possible. Ultimately being a learning process, it is not best practice to mix function display of elements with classes/render(), and with functionally displaying elements and React Hooks, you can see why midway through I moved away from using classes and never looked back.

The backend code was fairly straight-forward, although working on a DB which has many connected elements was cool and shows how important it is to plan out Database design ahead of time.

Ultimately, for a project which saw less than two weeks of development time from a singular student during exam sessions and over 90 commits in that time, this one isn't half bad at all!

## Launching .NET Backend
Launching .NET backend is as easy as going to DotNetProjects\dotnet_walkADog_backend, opening powershell, and typing ```dotnet run```. Some additional functionalities may require the usage of dotnet ef tools.

## Launching React Frontend
Also easy, simply go to DotNetProjects\React-dotnet-frontend\src\main\webapp and open powershell. From here, you might need to do ```npm install``` for package dependencies if you do not have them yet, and then simply using the ```npm start``` command.

### Known issues and workarounds
Depending on your version of npm, you might get an SSL certificate error when launching the frontend. For a development environment, simply go to the same path as listed above and type ```$env:NODE_OPTIONS="--openssl-legacy-provider"``` and it should work then.
