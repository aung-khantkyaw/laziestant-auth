// import Navbar from "@/components/Navbar";
// import PropTypes from "prop-types";

// export default function AuthLayout({ children }) {
//   return (
//     <div>
//       <h1>Auth Layout</h1>
//       <Navbar />
//       {children}
//     </div>
//   );
// }

// AuthLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

import PropTypes from "prop-types";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AuthLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
