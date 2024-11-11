import PropTypes from "prop-types";

export default function ErrorPage({ error, message, link }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 dark:text-red-500 mb-4">
          {error}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{message}</p>
      {link && <a href={link}>Go back</a>}
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string,
  link: PropTypes.string,
};
