# Welcome to laziestant-auth

A simple authentication system API built with Node.js (Express.js), SQLite, and Prisma ORM. This project provides basic user authentication features like registration, login, and session management, designed for easy integration into applications that require secure user authentication. 

## Features

- User Registration
- Email Verification
- Resend Email Verification
- User Login
- Forgot Password
- Reset Password
- Resend Reset Password Email
- Logout


## Technologies

- Node.js
- Express.js
- SQLite
- Prisma ORM
- JSON Web Tokens (JWT)


## API Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/verify-email` - Verify user's email
- `POST /auth/resend-verification-email` - Resend email verification
- `POST /auth/login` - Login an existing user
- `POST /auth/forgot-password` - Request a password reset
- `POST /auth/reset-password` - Reset user password
- `POST /auth/resend-reset-password-email` - Resend reset password email
- `POST /auth/logout` - Logout the current user

## Environment Variables

To run this project, you will need to set up the following environment variables in a `.env` file:

```plaintext
DATABASE_URL="file:./dev.db"          # Path to your SQLite database file
JWT_SECRET="your_jwt_secret_key"       # Secret key for signing JWT tokens
NODE_ENV=development                   # Node environment (e.g., development, production)
EMAIL_USER="your_email@example.com"    # Email address used for sending emails
EMAIL_PASSWORD="your_email_password"   # Password for the email account
CLIENT_URL=http://localhost:5173/      # URL of the client application