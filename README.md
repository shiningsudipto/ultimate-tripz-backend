# Car Wash Booking System

### Live URL: https://assignment-3-drab-omega.vercel.app/

### Technology used

- Typescript
- NodeJS
- ExpressJS
- Mongoose
- Jsonwebtoken
- Bcrypt
- Zod

### Features

- User Management
- Role-Based Access Control
- Service Management
- Slot Management
- Booking System
- Slot Availability
- Data Validation and Error Handling
- Security - (Access Token Security, Error Handling)

## Instructions on how to run this application locally

1. First clone this repository on your device with this command line:

```
git clone https://github.com/shiningsudipto/level-2-assignment-3
```

2. After cloning the repository install all necessary packages with:

```
npm install
```

3. Now set the necessary variables, create a '.env' file in the root folder of this project and set the value of those properties:

- NODE_ENV
- PORT
- DATABASE_URL
- DATABASE_URL
- JWT_ACCESS_SECRET
- JWT_ACCESS_EXPIRES_IN
- BCRYPT_SALT_ROUNDS

4. After successfully installing all packages open the terminal from this project and run:

```
npm run start:dev
```

5. Check the console/terminal is there a message:
   > mongoDB connected

### If yes then locally application successfully running.
