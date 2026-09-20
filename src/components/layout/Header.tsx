import { ExternalLink, InternalLink } from "@/components/core";
import { ThemeToggle } from "@/components/layout";
import app from "@/lib/config/app.config";

/**
 * Layout header.
 */
const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 shadow-sm backdrop-blur">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <InternalLink to="/" variant="unstyled">
            <span className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">{app.icon}</span>
              {app.name}
            </span>
          </InternalLink>

          <div className="flex items-center gap-1 sm:gap-2">
            <ExternalLink href={app.docsUrl} variant="ghost">
              Docs
            </ExternalLink>
            <ExternalLink href={app.repoUrl} variant="ghost">
              GitHub
            </ExternalLink>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
