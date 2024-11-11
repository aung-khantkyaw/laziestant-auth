import * as React from "react";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const InputPassword = React.forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

    return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-3 text-sm text-muted-foreground"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
});

InputPassword.displayName = "InputPassword";

export { InputPassword };

InputPassword.propTypes = {
  className: PropTypes.string,
};
