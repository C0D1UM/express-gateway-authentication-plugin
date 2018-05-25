# express-gateway-authentication-plugin
Authentication plugin for [Express Gateway](http://www.express-gateway.io/)

### Key Features:
- Supports user authentication with Google oauth2, Basic auth by using JWT token to identify the login user.
- Stores user data in PostgreSQL.

### Requirements:
- Node.js
- Express Gateway
- passport-google-oauth20
- sequelize
- node-postgres
- PostgreSQL

### Getting Started:

```bash
$ npm install -g express-gateway
$ eg gateway create

eg gateway create
# follow prompts
? What\'s the name of your Express Gateway? my-gateway
? Where would you like to install your Express Gateway? my-gateway
? What type of Express Gateway do you want to create? Getting Started with Express Gateway

# copy this plugin to new directory
$ cp -r /path/to/express-gateway-authentication-plugin ./my-gateway/ 

# cd to new directory
$ cd ./my-gateway

# install dependencies
$ npm install --save sequelize
$ npm install --save pg pg-hstore
$ npm install --save passport-google-oauth20

# install this plugin
$ eg plugin install express-gateway-authentication-plugin 
? Would you like to enable this plugin in system config? Yes
? Would you like to add new policies to gateway config? Yes
Plugin installed!
```

### Usage: 
- TBD
