import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(162 100% 38%), transparent)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, hsl(213 85% 50%), transparent)" }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Logo */}
      <Link
        to="/"
        className="z-10 mb-16 flex animate-fade-up items-center gap-2 font-display text-xl font-bold"
      >
        <div className="gradient-accent flex h-8 w-8 items-center justify-center rounded-lg shadow-glow">
          <Shield className="h-4 w-4 text-accent-foreground" />
        </div>
        Secure<span className="text-accent">Wallet</span>
      </Link>

      {/* 404 Content */}
      <div className="relative z-10 max-w-lg animate-fade-up text-center">
        {/* Giant 404 */}
        <div className="relative mb-8">
          <p
            className="select-none font-display font-bold"
            style={{
              fontSize: "clamp(100px, 20vw, 180px)",
              lineHeight: 1,
              background:
                "linear-gradient(135deg, hsl(213 85% 15% / 0.08), hsl(162 100% 38% / 0.15))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </p>
          {/* Floating icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="gradient-accent flex h-20 w-20 animate-float items-center justify-center rounded-2xl shadow-glow">
              <Search className="h-10 w-10 text-accent-foreground" />
            </div>
          </div>
        </div>

        <h1 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
          Page Not Found
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Path display */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2 font-mono text-sm">
          <span className="text-muted-foreground">tried:</span>
          <span className="font-medium text-accent">{location.pathname}</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="accent" size="lg" asChild className="w-full shadow-glow sm:w-auto">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-10 border-t border-border pt-8">
          <p className="mb-4 text-sm text-muted-foreground">Quick links</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Login", to: "/login" },
              { label: "Register", to: "/register" },
              { label: "About", to: "/about" },
              { label: "FAQ", to: "/faq" },
              { label: "Contact", to: "/contact" },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground/70 transition-all duration-200 hover:border-accent/40 hover:text-accent"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Security badge */}
      <div className="z-10 mt-12 animate-fade-up">
        <div className="secure-badge">
          <Shield className="h-3 w-3" />
          SecureWallet — Your trusted digital wallet
        </div>
      </div>
    </div>
  );
};

var stdin_default = NotFound;
export { stdin_default as default };
