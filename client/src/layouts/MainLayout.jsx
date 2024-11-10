import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="container mx-auto">
      <nav className="flex justify-between items-center border rounded border-slate-300 px-4 py-2 my-4">
        <Link to="/" className="text-xl font-bold text-blue-500">
          laziestant-auth
        </Link>
        <div>
          <Link to="/login" className="text-slate-900 mx-2">
            Login
          </Link>
          <Link to="/register" className="text-slate-900 mx-2">
            Register
          </Link>
        </div>
      </nav>
      <div className="border rounded border-slate-300 px-4 py-2 my-4 ">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to laziestant-auth
        </h1>
        <p className="text-slate-700 my-4">
          A simple authentication system API built with Node.js (Express.js),
          SQLite, and Prisma ORM. This project provides basic user
          authentication features like registration, login, and session
          management, designed for easy integration into applications that
          require secure user authentication. You can find the source code for
          this project on{" "}
          <a
            href="https://github.com/aung-khantkyaw/laziestant-auth"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Features</h2>
        <ul className="list-disc list-inside text-slate-700">
          <li>User Registration</li>
          <li>Email Verification</li>
          <li>Resend Email Verification</li>
          <li>User Login</li>
          <li>Forgot Password</li>
          <li>Reset Password</li>
          <li>Resend Reset Password Email</li>
          <li>Logout</li>
        </ul>

        <Separator className="my-2" />

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Technologies</h2>
        <ul className="list-disc list-inside text-slate-700">
          <li>Node.js</li>
          <li>Express.js</li>
          <li>SQLite</li>
          <li>Prisma ORM</li>
          <li>JSON Web Tokens (JWT)</li>
        </ul>

        <Separator className="my-2" />

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          API Endpoints
        </h2>
        <ul className="list-disc list-inside text-slate-700">
          <li>
            <code>POST /auth/register</code> - Register a new user
          </li>
          <li>
            <code>POST /auth/verify-email</code> - Verify user&lsquo;s email
          </li>
          <li>
            <code>POST /auth/resend-verification-email</code> - Resend email
            verification
          </li>
          <li>
            <code>POST /auth/login</code> - Login an existing user
          </li>
          <li>
            <code>POST /auth/forgot-password</code> - Request a password reset
          </li>
          <li>
            <code>POST /auth/reset-password</code> - Reset user password
          </li>
          <li>
            <code>POST /auth/resend-reset-password-email</code> - Resend reset
            password email
          </li>
          <li>
            <code>POST /auth/logout</code> - Logout the current user
          </li>
        </ul>

        <Separator className="my-2" />

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Environment Variables
        </h2>

        <p>
          To run this project, you will need to set up the following environment
          variables in a <code>.env</code> file:
        </p>

        <pre className="my-2 p-5 rounded-md bg-gray-900 text-white">
          <code> DATABASE_URL=&quot;file:./dev.db&quot; </code>{" "}
          <span className="text-slate-500">
            # Path to your SQLite database file
          </span>
          <br />
          <code> JWT_SECRET=&quot;your_jwt_secret_key&quot; </code>{" "}
          <span className="text-slate-500">
            # Secret key for signing JWT tokens
          </span>
          <br />
          <code> NODE_ENV=development </code>{" "}
          <span className="text-slate-500">
            # Node environment (e.g., development, production)
          </span>
          <br />
          <code> EMAIL_USER=&quot;your_email@example.com</code>{" "}
          <span className="text-slate-500">
            {" "}
            # Email address used for sending emails
          </span>{" "}
          <br />
          <code> EMAIL_PASSWORD=&quot;your_email_password&quot; </code>{" "}
          <span className="text-slate-500">
            {" "}
            # Password for the email account
          </span>{" "}
          <br />
          <code> CLIENT_URL=http://localhost:5173/ </code>{" "}
          <span className="text-slate-500">
            # URL of the client application{" "}
          </span>
        </pre>

        <p>
          Make sure to replace each placeholder value with your actual
          configuration.
        </p>
      </div>
    </div>
  );
}
