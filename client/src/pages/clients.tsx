import HeroSection from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, HardHat, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const clientTypes = [
  {
    icon: Building2,
    title: "Property Owners & Landlords",
    description: "As a property owner or landlord in New York, you're always looking for ways to maximize your asset's value, boost net operating income (NOI), and stay ahead of evolving regulations. Limitless Energy Co. (LEC) is your partner in transforming under-used rooftops, façades, and land into profitable clean-energy assets—without the headaches.",
    benefits: [
      "Maximize asset value",
      "Boost net operating income",
      "Stay ahead of regulations",
      "Transform unused spaces into revenue"
    ]
  },
  {
    icon: Users,
    title: "Real Estate Management Companies",
    description: "As a real estate management company in New York City, you're tasked with maximizing the value of your clients' assets while navigating complex regulations like Local Law 97. Limitless Energy Co. (LEC) offers tailored solar + storage solutions that simplify compliance, reduce operating costs, and deliver sustainable value to your clients and tenants.",
    benefits: [
      "Simplify Local Law 97 compliance",
      "Reduce operating costs",
      "Deliver sustainable value",
      "Enhance tenant satisfaction"
    ]
  },
  {
    icon: HardHat,
    title: "Ground-Up Developers & New Construction",
    description: "In today's real estate market, sustainability isn't just a feature—it's a foundation. Limitless Energy Co. (LEC) partners with ground-up developers and new construction teams to design and deliver integrated solar + storage solutions that maximize project value, meet evolving regulations, and attract forward-thinking tenants and investors.",
    benefits: [
      "Maximize project value",
      "Meet evolving regulations",
      "Attract premium tenants",
      "Appeal to ESG investors"
    ]
  },
  {
    icon: Store,
    title: "Tenants & Business Operators",
    description: "As a tenant or business operator in New York, you're focused on controlling costs, ensuring operational resilience, and demonstrating your commitment to sustainability. Limitless Energy Co. (LEC) empowers you to achieve all three—by bringing clean, reliable solar + storage solutions directly to your building.",
    benefits: [
      "Control energy costs",
      "Ensure operational resilience",
      "Demonstrate sustainability commitment",
      "Achieve energy independence"
    ]
  }
];

export default function Clients() {
  return (
    <div data-testid="page-clients">
      {/* Hero Section */}
      <HeroSection
        title="Our Clients"
        description="Empowering New York's real estate ecosystem with tailored energy solutions. From property owners to tenants, we deliver value at every level of the commercial real estate stack."
        primaryButton={{
          text: "Start Your Project",
          href: "/contact",
        }}
        secondaryButton={{
          text: "View Our Solutions",
          href: "/solutions",
        }}
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
      />

      {/* Client Types Section */}
      <section className="py-20 bg-white" data-testid="section-client-types">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-corporate mb-4" data-testid="text-client-types-title">
              Tailored Solutions for Every Client
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-client-types-description">
              We understand that each segment of New York's real estate market has unique needs. Our expertise spans across all client types, delivering customized energy solutions that drive value.
            </p>
          </div>

          <div className="space-y-12">
            {clientTypes.map((client, index) => {
              const Icon = client.icon;
              return (
                <Card key={index} className="overflow-hidden" data-testid={`client-card-${index}`}>
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-5 gap-0">
                      <div className="md:col-span-3 p-8">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-corporate" data-testid={`client-title-${index}`}>
                            {client.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed" data-testid={`client-description-${index}`}>
                          {client.description}
                        </p>
                        <Link href="/contact">
                          <Button data-testid={`button-learn-more-${index}`}>
                            Learn More About Our Solutions
                          </Button>
                        </Link>
                      </div>
                      <div className="md:col-span-2 bg-gray-50 p-8">
                        <h4 className="font-semibold text-corporate mb-4">Key Benefits:</h4>
                        <ul className="space-y-3">
                          {client.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start" data-testid={`benefit-${index}-${benefitIndex}`}>
                              <div className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-testid="section-cta-clients">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 lg:p-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-white/90 text-sm font-semibold tracking-wider mb-6">
                  RENEWABLE ENERGY
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-cta-title">
                  Ready to Work with a Trusted Energy Partner?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl" data-testid="text-cta-description">
                  Let's discuss how we can deliver the same exceptional results for your organization.
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