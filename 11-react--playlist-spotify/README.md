## Description
This app is a learning project based on Spotify'S API.  
After the user grants permission they are can search Spotify's database, create new playlists and add tracks to them.  
It uses the Implicit Grant Flow - <https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow>.  
This means that "The implicit grant flow is carried out on the client side and it does not involve secret keys. Thus, you do not need any server-side code to use it. Access tokens issued are short-lived with no refresh token to extend them when they expire."  


## Environment variables
**WARNING:** Do not store any secrets (such as private API keys) in your React app! Environment variables are embedded into the build, meaning anyone can view them by inspecting your app's files.

**Note:** You must create custom environment variables beginning with REACT\_APP\_. Any other variables except NODE\_ENV will be ignored. Changing any environment variables will require you to restart the development server if it is running. These environment variables will be defined for you on process.env. For example, having an environment variable named REACT\_APP\_NOT\_SECRET\_CODE will be exposed in your JS as process.env.REACT\_APP\_NOT\_SECRET\_CODE.

# Notes
By default App.js will be rendered in index.js but this can easily be switched to AppExample.js .
In the latter I will try to implement proper Authorization Code with PKCE Flow <https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow>

... when the time is right.

