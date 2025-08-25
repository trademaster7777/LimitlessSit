import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoUrl from "@assets/with_padding (1)_1756063872958.png";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const solutionLinks = [
    { title: "Commercial Solar + Battery", slug: "commercial-solar-battery" },
    { title: "Battery Storage (BESS)", slug: "battery-storage" },
    { title: "Energy Procurement", slug: "energy-procurement" },
    { title: "O&M + Asset Management", slug: "om-asset-management" },
    { title: "Energy Consulting", slug: "energy-consulting" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50" data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" data-testid="link-home-logo">
              <img 
                src={logoUrl} 
                alt="Limitless Energy CO" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" data-testid="link-home">
                <span className={`transition-colors duration-200 font-medium ${
                  isActive("/") ? "text-primary" : "text-corporate hover:text-primary"
                }`}>
                  Home
                </span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-corporate hover:text-primary transition-colors duration-200 font-medium" data-testid="dropdown-solutions">
                  Solutions <ChevronDown className="ml-1 h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuItem asChild>
                    <Link href="/solutions" data-testid="link-solutions-overview">
                      All Solutions
                    </Link>
                  </DropdownMenuItem>
                  {solutionLinks.map((solution) => (
                    <DropdownMenuItem key={solution.slug} asChild>
                      <Link href={`/solutions/${solution.slug}`} data-testid={`link-solution-${solution.slug}`}>
                        {solution.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/projects" data-testid="link-projects">
                <span className={`transition-colors duration-200 font-medium ${
                  isActive("/projects") ? "text-primary" : "text-corporate hover:text-primary"
                }`}>
                  Projects
                </span>
              </Link>

              <Link href="/clients" data-testid="link-clients">
                <span className={`transition-colors duration-200 font-medium ${
                  isActive("/clients") ? "text-primary" : "text-corporate hover:text-primary"
                }`}>
                  Clients
                </span>
              </Link>

              <Link href="/about" data-testid="link-about">
                <span className={`transition-colors duration-200 font-medium ${
                  isActive("/about") ? "text-primary" : "text-corporate hover:text-primary"
                }`}>
                  About
                </span>
              </Link>

              <Link href="/partners" data-testid="link-partners">
                <span className={`transition-colors duration-200 font-medium ${
                  isActive("/partners") ? "text-primary" : "text-corporate hover:text-primary"
                }`}>
                  Partners
                </span>
              </Link>

              <Link href="/contact" data-testid="link-contact">
                <span className={`transition-colors duration-200 font-medium ${
                  isActive("/contact") ? "text-primary" : "text-corporate hover:text-primary"
                }`}>
                  Contact
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" data-testid="mobile-link-home">
                <div className="block px-3 py-2 text-corporate hover:text-primary">Home</div>
              </Link>
              <Link href="/solutions" data-testid="mobile-link-solutions">
                <div className="block px-3 py-2 text-corporate hover:text-primary">Solutions</div>
              </Link>
              <Link href="/projects" data-testid="mobile-link-projects">
                <div className="block px-3 py-2 text-corporate hover:text-primary">Projects</div>
              </Link>
              <Link href="/clients" data-testid="mobile-link-clients">
                <div className="block px-3 py-2 text-corporate hover:text-primary">Clients</div>
              </Link>
              <Link href="/about" data-testid="mobile-link-about">
                <div className="block px-3 py-2 text-corporate hover:text-primary">About</div>
              </Link>
              <Link href="/partners" data-testid="mobile-link-partners">
                <div className="block px-3 py-2 text-corporate hover:text-primary">Partners</div>
              </Link>
              <Link href="/contact" data-testid="mobile-link-contact">
                <div className="block px-3 py-2 text-corporate hover:text-primary">Contact</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
