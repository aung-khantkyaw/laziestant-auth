import Navbar from "@/components/Navbar";
import PropTypes from "prop-types";

export default function AuthLayout({ children }) {
  return (
    <div>
      <h1>Auth Layout</h1>
      <Navbar />
      {children}
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
