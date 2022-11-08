# Introduction
Notifications backend service

# Environment variables

#### DB_HOST
Database host
Example value: localhost

#### DB_NAME
Name of the database to be used
Example value: healthcaredb

#### DB_USER / DB_PASS
Database credentials

#### HC_JWT_DURATION
Duration of the created token 
Example value: 1h

#### HC_JWT_SECRET 
Secret used to create the JWT token
Example value: somesecret

#### HC_PASSWORD_SALT
Salt used to encrypt passwords in the database
Example value: 10

# Run tests
To run the tests, use this command:

npm test

# Run the application
To run the application, use this command, after exporting the environment variables:

npm start
