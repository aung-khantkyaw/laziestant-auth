import { create } from "zustand";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/auth"
    : "/auth";

// Create the Zustand store for authentication state
export const authService = create((set) => ({
  user: null,
  isAuthenticated: false,
  errorType: null,
  errorMessage: null,
  successType: null,
  successMessage: null,
  isLoading: true,
  isCheckingAuth: true,

  loadAuthState: () => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedUser && storedAuth === "true") {
      set({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
        isCheckingAuth: false,
      });
    } else {
      set({
        isAuthenticated: false,
        isLoading: false,
        isCheckingAuth: false,
      });
    }
  },

  register: async (data) => {
    console.log("Register function called with data:", data);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      console.log("JSON parsed response:", json);

      if (json.success === "false") {
        set({
          errorType: json.type || "error",
          errorMessage: json.message || "An unknown error occurred.",
        });
        return;
      }

      if (json.success === "true") {
        localStorage.setItem("user", JSON.stringify(json.data));
        localStorage.setItem("isAuthenticated", "true");
        set({
          user: json.data,
          isAuthenticated: true,
          errorType: null,
          errorMessage: null,
        });
        console.log("State after registration:", { user: json.data });
      }
    } catch (error) {
      console.error("Error in register function:", error);
      set({
        errorType: "error",
        errorMessage: error.message || "An unexpected error occurred.",
      });
    }
  },

  verifyEmail: async (data) => {
    console.log("Verification code:", data);
    try {
      const res = await fetch(`${API_URL}/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();
      console.log("JSON parsed response:", json);

      if (json.success === "false") {
        set({
          errorMessage: json.message || "An unknown error occurred.",
        });
        return;
      }

      if (json.success === "true") {
        localStorage.setItem("user", JSON.stringify(json.data));
        set({
          user: json.data,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error("Error in verification function:", error);
      set({
        errorType: "error",
        errorMessage: error.message || "An unexpected error occurred.",
      });
    }
  },

  resendVerifyEmail: async (data) => {
    console.log("Resend Verify Email address:", data);
    try {
      const res = await fetch(`${API_URL}/resend-verification-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();
      console.log("JSON parsed response:", json);

      if (json.success === "false") {
        set({
          errorMessage: json.message || "An unknown error occurred.",
        });
        return;
      }

      if (json.success === "true") {
        set({
          successMessage: json.message,
        });
      }
    } catch (error) {
      console.error("Error in resend verification function:", error);
      set({
        errorType: "error",
        errorMessage: error.message || "An unexpected error occurred.",
      });
    }
  },

  login: async (data) => {
    console.log("Login function called with data:", data);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();
      console.log("JSON parsed response:", json);

      if (json.success === "false") {
        set({
          errorType: json.type || "error",
          errorMessage: json.message || "An unknown error occurred.",
        });
        return;
      }

      if (json.success === "true") {
        localStorage.setItem("user", JSON.stringify(json.data));
        localStorage.setItem("isAuthenticated", "true");

        set({
          user: json.data,
          isAuthenticated: true,
          errorType: null,
          errorMessage: null,
        });
        console.log("State after login:", { user: json.data }); // Log the updated state
      }
    } catch (error) {
      console.error("Error in login function:", error); // Log any errors
      set({
        errorType: "error",
        errorMessage: error.message || "An unexpected error occurred.",
      });
    }
  },

  forgotPassword: async (data) => {
    console.log("Forgot Password function called with data:", data);
    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();
      console.log("JSON parsed response:", json);

      if (json.success === "false") {
        set({
          errorType: json.type || "error",
          errorMessage: json.message || "An unknown error occurred.",
        });
        return;
      }

      if (json.success === "true") {
        set({
          successMessage: json.message,
        });
      }
    } catch (error) {
      console.error("Error in Forgot Password function:", error); // Log any errors
      set({
        errorType: "error",
        errorMessage: error.message || "An unexpected error occurred.",
      });
    }
  },

  resetPassword: async (data) => {
    console.log("Reset Password function called with data:", data);
    try {
      const res = await fetch(`${API_URL}/reset-password/${data.token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      console.log("JSON parsed response:", json);

      if (json.success === "false") {
        set({
          errorType: json.type || "error",
          errorMessage: json.message || "An unknown error occurred.",
        });
        return;
      }

      if (json.success === "true") {
        set({
          successMessage: json.message,
        });
      }
    } catch (error) {
      console.error("Error in Reset Password function:", error); // Log any errors
      set({
        errorType: "error",
        errorMessage: error.message || "An unexpected error occurred.",
      });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, errorType: null, errorMessage: null });
    try {
      const res = await fetch(`${API_URL}/check-auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await res.json();
      console.log("JSON parsed response:", json);

      if (json.success === "true") {
        localStorage.setItem("user", JSON.stringify(json.data.user));
        localStorage.setItem("isAuthenticated", "true");

        set({
          user: json.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } else {
        set({
          isAuthenticated: false,
          isCheckingAuth: false,
        });
      }
    } catch (error) {
      console.error("Error in checkAuth function:", error);
      set({
        errorType: "error",
        errorMessage: error.message || "An unexpected error occurred.",
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await res.json();
      console.log("JSON parsed response:", json);

      if (json.success === "true") {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");

        set({
          user: null,
          isAuthenticated: false,
          errorType: null,
          errorMessage: null,
        });
        console.log("State after logout:", { user: null });
      }
    } catch (error) {
      console.error("Error in logout function:", error);
      set({
        errorType: "error",
        errorMessage: error.message || "An unexpected error occurred.",
      });
    }
  },
}));
