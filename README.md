1. Run 'ContactsDB' Script first to create database into your Database. It will also create table and all the SPs.
2. Change connection string.
3. First Run API app as I have created 2 stand alone applications for API(.net core into Visual Studio) and Presentation(react into VS Code). 
   Before running React app, please open it into VS Code and run 'npm install' command into VS Code terminal to install all the required packages.
   Then Run React app.
4. Please make sure to check port numbers as I have enabled CORS policy for particular port only. 
   In API app, into startup.cs file add your React application's port number. By default it will be 'http://localhost:3000'.
   And into React App, in settings.json file under public folder please define your API app's port number. 
   By default it will be 'https://localhost:44386/'.# ContactsApp