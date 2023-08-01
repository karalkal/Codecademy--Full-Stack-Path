## Using .env variables

#### WARNING: Do not store any secrets (such as private API keys) in your React app!  

#### Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

#### If you are using Create React App (create-react-app) then you only need step 3 and 4, but keep in mind a variable needs to start with REACT\_APP\_ for it to work.
1. `npm install dotenv --save`
2. add the following line to your app.  
`require('dotenv').config()`
3. Then create a .env file at the root directory of your application and add the variables to it.   
`// contents of .env`   
`REACT_APP_API_KEY = 'my-secret-api-key'`
4. Finally, add .env to your .gitignore file so that Git ignores it and it never ends up on GitHub. 
