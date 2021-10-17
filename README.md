# Common setup

Clone the repo and install the dependencies

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
cd the-example-app.nodejs
```

# Connect to MongoDB Database
<ol>
    <li>Open .env file</li>
    <li>Change <code>DATABASE_URL= <i>&&lt;your_mongoDB_connect_string&gt;</i></code>
    <li>Also Change <code>USER_AUTH_ACCESS_PRIVATE_KEEY</code> & <code>USER_AUTH_REFRESH_PRIVATE_KEEY</code> to any random 32(or any) bit hexadecimal string
</ol>

```
DATABASE_URL = mongodb://localhost/test
USER_AUTH_ACCESS_PRIVATE_KEEY = 06cb02fb6ff22fea7a12232262cedb9a437655acf76e16ee4057a90cc3e43762ddc116c22f444accc4257c486798100563599ea46ae0b906cebc4d8833503377ee9cdd1a024fd4bec7f2c1ff1d21fbfb
USER_AUTH_REFRESH_PRIVATE_KEEY = 06cb02fb6ff22fea7a12232262cedb9a437655acf76e16ee4057a90cc3e43762ddc116c22f444accc4257c486798100563599ea46ae0b906cebc4d8833503377ee9cdd1a024fd4bec7f2c1ff1d21fbfb
```

```bash
npm install
```

# Start The Server

```bash
npm start
```

# All REST requests


```REST

GET http://localhost:3000/users/test HTTP/1.1
Content-Type:  application/json
access_token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZiZjc5MDIxNWQ0ZDVkOGU5MTk4NTQiLCJ1c2VyTmFtZSI6InNheWFrNyIsImlhdCI6MTYzNDQ4ODQwOSwiZXhwIjoxNjM0NDg4NDI0fQ.Lnc5y8O9J4V8Jsk7vUvJTnwG5dzUCUt-tsUwzLz9kGc




POST http://localhost:3000/users/signUp   HTTP/1.1
Content-Type: application/json

{
    "userName" : "sayak50000000",
    "password" : "sayak50000000" 
}


POST http://localhost:3000/users/signIn  HTTP/1.1
Content-Type: application/json

{
    "userName" : "sayak7",
    "password" : "sayak7" 
}



POST  http://localhost:3000/users/getAccess HTTP/1.1
Content-Type: application/json

{
    "refresh_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZiZjc5MDIxNWQ0ZDVkOGU5MTk4NTQiLCJ1c2VyTmFtZSI6InNheWFrNyIsImlhdCI6MTYzNDQ4OTk3NX0.ARAiDbZmS1AirGGfTo9CD2m848-Kp7cFw4HFMfIKDMs"
}


POST  http://localhost:3000/users/signOut HTTP/1.1
Content-Type: application/json

{
     "refresh_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTZiZjc5MDIxNWQ0ZDVkOGU5MTk4NTQiLCJ1c2VyTmFtZSI6InNheWFrNyIsImlhdCI6MTYzNDQ4OTk3NX0.ARAiDbZmS1AirGGfTo9CD2m848-Kp7cFw4HFMfIKDMs"
}
```




