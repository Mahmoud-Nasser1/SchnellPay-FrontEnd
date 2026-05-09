import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function PublicNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = theme !== "dark";

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm"
          : isLight
            ? "bg-background/40 backdrop-blur-md"
            : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-6 px-4">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-xl font-bold"
        >
          <div className="gradient-accent flex h-8 w-8 items-center justify-center rounded-xl shadow-glow">
            <Shield className="h-4 w-4 text-accent-foreground" />
          </div>

          <span
            className={cn(
              "transition-colors",
              scrolled || isLight
                ? "text-foreground"
                : "text-primary-foreground"
            )}
          >
            Schnell<span className="text-accent">Pay</span>
          </span>
        </Link>

        {/* ================= DESKTOP LINKS ================= */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                location.pathname === l.href
                  ? "text-accent"
                  : scrolled || isLight
                    ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                    : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ================= DESKTOP ACTIONS ================= */}
        <div className="hidden items-center gap-2 md:flex">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={cn(
              "rounded-lg p-2 transition-colors",
              scrolled || isLight
                ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                : "text-primary-foreground/70 hover:text-primary-foreground"
            )}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* LOGIN */}
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign In</Link>
          </Button>

          {/* REGISTER */}
          <Button variant="accent" size="sm" asChild className="shadow-glow">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="flex items-center gap-1.5 md:hidden">

          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-muted-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-border/50 bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden">

          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-2 flex gap-2 border-t border-border/50 pt-3">

            <Button variant="outline" asChild className="flex-1">
              <Link to="/login" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            </Button>

            <Button variant="accent" asChild className="flex-1">
              <Link to="/register" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>

          </div>
        </div>
      )}
    </nav>
  );
}

export default PublicNav;