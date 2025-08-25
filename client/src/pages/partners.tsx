import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PartnerType } from "@shared/schema";
import partnersHeroImage from "@assets/four-partners-in-helmets-studying-wind-turbine-blu-2024-12-13-08-44-3_1756091332842.jpg";

export default function Partners() {
  const { data: partnerTypes = [], isLoading } = useQuery<PartnerType[]>({
    queryKey: ["/api/partners"],
  });

  // Default partner types if CMS is empty
  const defaultPartnerTypes = [
    {
      id: "1",
      title: "Property Owners & Landlords",
      slug: "property-owners-landlords",
      description: "Maximize property value and attract quality tenants with sustainable energy infrastructure. Our solutions include rooftop solar, energy storage, and comprehensive energy management that reduce operating costs and enhance building performance.",
      benefits: ["Increase NOI through reduced energy costs", "Enhance property marketability", "Meet sustainability goals and certifications"],
      iconClass: "fas fa-building",
      colorClass: "primary",
      isActive: true,
      order: 1,
    },
    {
      id: "2",
      title: "Real Estate Management Companies",
      slug: "real-estate-management",
      description: "Streamline energy management across your portfolio with our scalable solutions. We provide centralized monitoring, procurement services, and maintenance programs that optimize performance across multiple properties.",
      benefits: ["Portfolio-wide energy optimization", "Centralized monitoring and reporting", "Simplified procurement and billing"],
      iconClass: "fas fa-users",
      colorClass: "secondary",
      isActive: true,
      order: 2,
    },
    {
      id: "3",
      title: "Ground-Up Developers & New Construction",
      slug: "developers-new-construction",
      description: "Integrate energy solutions from day one with our development consulting services. We work with your design team to optimize energy systems, ensure compliance, and maximize long-term value for your projects.",
      benefits: ["Design integration and optimization", "Regulatory compliance planning", "Financing and incentive optimization"],
      iconClass: "fas fa-hammer",
      colorClass: "accent",
      isActive: true,
      order: 3,
    },
    {
      id: "4",
      title: "Tenants & Business Operators",
      slug: "tenants-business-operators",
      description: "Take control of your energy costs with our tenant-focused solutions. From energy procurement to efficiency consulting, we help businesses reduce operational expenses and meet sustainability commitments.",
      benefits: ["Direct energy cost savings", "Sustainability reporting and compliance", "Operational efficiency improvements"],
      iconClass: "fas fa-store",
      colorClass: "purple",
      isActive: true,
      order: 4,
    },
  ];

  const displayPartnerTypes = partnerTypes.length > 0 ? partnerTypes : defaultPartnerTypes;

  const getColorClasses = (colorClass: string) => {
    switch (colorClass) {
      case "primary":
        return "from-primary/5 to-primary/10 bg-primary/20 text-primary bg-primary hover:bg-primary/90";
      case "secondary":
        return "from-secondary/5 to-secondary/10 bg-secondary/20 text-secondary bg-secondary hover:bg-secondary/90";
      case "accent":
        return "from-accent/5 to-accent/10 bg-accent/20 text-accent bg-accent hover:bg-accent/90";
      case "purple":
        return "from-purple-500/5 to-purple-500/10 bg-purple-500/20 text-purple-500 bg-purple-500 hover:bg-purple-600";
      default:
        return "from-primary/5 to-primary/10 bg-primary/20 text-primary bg-primary hover:bg-primary/90";
    }
  };

  const getIconComponent = (iconClass: string) => {
    // Map Font Awesome classes to Lucide icons
    const iconMap: { [key: string]: JSX.Element } = {
      "fas fa-building": <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" /></svg>,
      "fas fa-users": <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>,
      "fas fa-hammer": <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2h6v10H7V4zm2 2v6h2V6H9z" clipRule="evenodd" /></svg>,
      "fas fa-store": <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>,
    };
    return iconMap[iconClass] || iconMap["fas fa-building"];
  };

  return (
    <div data-testid="page-partners">
      {/* Partners Hero */}
      <HeroSection
        title="Partner With Us"
        description="We work with diverse stakeholders across the commercial real estate ecosystem to deliver comprehensive energy solutions tailored to your specific needs and goals."
        primaryButton={{
          text: "Schedule Partnership Discussion",
          href: "/contact",
        }}
        secondaryButton={{
          text: "Download Partnership Guide",
          href: "/contact",
        }}
        backgroundImage={partnersHeroImage}
      />

      {/* Partner Types */}
      <section className="py-20 bg-white" data-testid="section-partner-types">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-8 animate-pulse" data-testid={`partner-skeleton-${i}`}>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {displayPartnerTypes.map((partnerType) => {
                const colorClasses = getColorClasses(partnerType.colorClass);
                const [gradientClasses, iconBgClasses, iconTextClasses, buttonClasses] = colorClasses.split(' ');

                return (
                  <Card 
                    key={partnerType.id} 
                    className={`bg-gradient-to-br ${gradientClasses} p-8 hover:shadow-lg transition-all duration-200`}
                    data-testid={`partner-card-${partnerType.slug}`}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <div className={`${iconBgClasses} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                          <span className={iconTextClasses}>
                            {getIconComponent(partnerType.iconClass)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-corporate" data-testid={`partner-title-${partnerType.slug}`}>
                          {partnerType.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4" data-testid={`partner-description-${partnerType.slug}`}>
                        {partnerType.description}
                      </p>
                      
                      {partnerType.benefits && partnerType.benefits.length > 0 && (
                        <ul className="text-gray-600 space-y-2 mb-6" data-testid={`partner-benefits-${partnerType.slug}`}>
                          {partnerType.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center" data-testid={`partner-benefit-${partnerType.slug}-${index}`}>
                              <svg className="w-4 h-4 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <Link href="/contact">
                        <Button 
                          className={`${buttonClasses.split(' ')[0]} text-white ${buttonClasses.split(' ').slice(1).join(' ')}`}
                          data-testid={`button-partner-contact-${partnerType.slug}`}
                        >
                          {partnerType.title.includes('Property') ? 'Learn More' : 
                           partnerType.title.includes('Management') ? 'Schedule Consultation' :
                           partnerType.title.includes('Developers') ? 'Get Design Consultation' : 'Request Assessment'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-testid="section-cta-partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 lg:p-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-white/90 text-sm font-semibold tracking-wider mb-6">
                  RENEWABLE ENERGY
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-cta-title">
                  Ready to Amplify Your Capabilities?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl" data-testid="text-cta-description">
                  Let's forge a partnership that expands opportunities and delivers superior results for our clients.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full"
                    data-testid="button-book-meeting"
                  >
                    Book A Meeting
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
