import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  backgroundImage: string;
  children?: React.ReactNode;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  backgroundImage,
  children,
}: HeroSectionProps) {
  const renderButton = (button: any, isPrimary: boolean) => {
    const baseClasses = isPrimary
      ? "bg-primary hover:bg-primary/90 text-white"
      : "border-2 border-white text-white hover:bg-white hover:text-corporate";
    
    const commonProps = {
      size: "lg" as const,
      className: `${baseClasses} px-8 py-3 font-semibold transition-all duration-200`,
      "data-testid": isPrimary ? "button-primary-cta" : "button-secondary-cta",
    };

    if (button.href) {
      return (
        <Button asChild {...commonProps}>
          <a href={button.href}>
            {button.text} <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      );
    }

    return (
      <Button onClick={button.onClick} {...commonProps}>
        {button.text} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    );
  };

  return (
    <section className="relative pt-16 min-h-screen flex items-center" data-testid="hero-section">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl">
          {subtitle && (
            <p className="text-lg md:text-xl mb-4 text-accent font-medium" data-testid="text-subtitle">
              {subtitle}
            </p>
          )}
          
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" 
            data-testid="text-hero-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl" data-testid="text-hero-description">
            {description}
          </p>
          
          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row gap-4" data-testid="hero-buttons">
              {primaryButton && renderButton(primaryButton, true)}
              {secondaryButton && renderButton(secondaryButton, false)}
            </div>
          )}
          
          {children}
        </div>
      </div>
    </section>
  );
}
