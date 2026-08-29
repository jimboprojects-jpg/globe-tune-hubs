import { forwardRef } from "react";
import { Link, useLocation } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "href" | "className"> {
  to: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, to, pendingClassName: _pending, ...props }, ref) => {
    const location = useLocation();
    const isActive =
      location.pathname === to ||
      (to !== "/" && location.pathname.startsWith(`${to}/`));

    return (
      <Link
        ref={ref}
        to={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
