import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSolutionImage } from "@/assets/solution-images";
import type { Solution } from "@shared/schema";
import solutionsHeroImage from "@assets/empty-streets-in-west-village-at-new-york-manhatta-2025-02-12-03- (3)_1756091506597.jpg";

export default function Solutions() {
  const { data: solutions = [], isLoading } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  return (
    <div data-testid="page-solutions">
      {/* Solutions Hero */}
      <HeroSection
        title="Comprehensive Energy Solutions"
        description="From commercial solar installations to energy consulting and compliance, we provide end-to-end solutions designed to optimize your energy operations and drive sustainability goals."
        primaryButton={{
          text: "Schedule Consultation",
          href: "/contact",
        }}
        secondaryButton={{
          text: "View Case Studies",
          href: "/projects",
        }}
        backgroundImage={solutionsHeroImage}
      />

      {/* Solutions Grid */}
      <section className="py-20 bg-white" data-testid="section-solutions-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse overflow-hidden" data-testid={`solution-skeleton-${i}`}>
                  <div className="w-full h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : solutions.length === 0 ? (
            <div className="text-center py-20" data-testid="solutions-empty-state">
              <h3 className="text-2xl font-semibold text-corporate mb-4">Solutions Coming Soon</h3>
              <p className="text-gray-600 mb-8">
                We're currently updating our solutions catalog. Please contact us directly to learn about our comprehensive energy services.
              </p>
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-solutions">
                  Contact Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {solutions.map((solution) => (
                <Card key={solution.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-200" data-testid={`solution-card-${solution.slug}`}>
                  <img 
                    src={getSolutionImage(solution.slug, solution.imageUrl)} 
                    alt={solution.title}
                    className="w-full h-48 object-cover"
                    data-testid={`solution-image-${solution.slug}`}
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-corporate mb-3" data-testid={`solution-title-${solution.slug}`}>
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 mb-4" data-testid={`solution-description-${solution.slug}`}>
                      {solution.shortDescription}
                    </p>
                    
                    {solution.benefits && solution.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4" data-testid={`solution-benefits-${solution.slug}`}>
                        {solution.benefits.slice(0, 3).map((benefit) => (
                          <Badge key={benefit} variant="secondary" className="text-xs" data-testid={`solution-benefit-${benefit}`}>
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Link href={`/solutions/${solution.slug}`}>
                      <Button variant="outline" className="w-full" data-testid={`button-solution-details-${solution.slug}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-testid="section-cta-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 lg:p-16">
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-cta-title">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8" data-testid="text-cta-description">
                Contact our team to discuss your specific needs and get a customized proposal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link href="/contact" className="flex-1">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-primary hover:bg-gray-100 w-full px-6 py-4 text-lg font-semibold"
                    data-testid="button-get-consultation"
                  >
                    Get Free Consultation
                  </Button>
                </Link>
                <a href="tel:+13476825050" className="flex-1">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-primary hover:bg-gray-100 w-full px-6 py-4 text-lg font-semibold"
                    data-testid="button-call"
                  >
                    Call (347) 682-5050
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
