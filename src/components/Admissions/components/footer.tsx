export function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-foreground font-semibold">Lahoti Admissions</p>
            <p className="text-sm text-muted-foreground">
              New York, NY | dryashlahoti.com
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Yash Lahoti. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#hero"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
