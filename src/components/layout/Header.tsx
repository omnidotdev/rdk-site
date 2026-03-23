import { InternalLink } from "@/components/core";
import { ThemeToggle } from "@/components/layout";
import app from "@/lib/config/app.config";

/**
 * Layout header.
 */
const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border border-b bg-background shadow-sm blur-ms">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-2">
            <InternalLink to="/" variant="unstyled" className="-ml-4">
              <h1 className="font-bold text-xl">{app.name}</h1>
            </InternalLink>

            <InternalLink to="/pricing" variant="ghost">
              Pricing
            </InternalLink>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
