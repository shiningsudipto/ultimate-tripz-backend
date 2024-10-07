# Ultimate Tripz

### Live URL: https://ultimate-tripz.vercel.app

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
- Authentication
- Subscribe System
- Advanced Filtering
- Up vote, down vote and comment system
- Follow and unfollow
- Data Validation and Error Handling
- Security - (Access Token Security, Error Handling)

## Instructions on how to run this application locally

1. First clone this repository on your device with this command line:

```
git clone https://github.com/shiningsudipto/ultimate-tripz-backend
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
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- PAYMENT_URL
- PAYMENT_VERIFY_URL
- STORE_ID
- SIGNATURE_KEY
- CLIENT_URL
- LIVE_URL
- CLIENT_LIVE_URL_SERVICE_PAGE

4. After successfully installing all packages open the terminal from this project and run:

```
npm run start:dev
```

5. Check the console/terminal is there a message:
   > mongoDB connected

### If yes then locally application successfully running.
