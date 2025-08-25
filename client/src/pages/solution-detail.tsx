import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getSolutionImage } from "@/assets/solution-images";
import type { Solution } from "@shared/schema";

export default function SolutionDetail() {
  const [, params] = useRoute("/solutions/:slug");
  const slug = params?.slug;

  const { data: solution, isLoading, error } = useQuery<Solution>({
    queryKey: ["/api/solutions", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50" data-testid="solution-detail-loading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !solution) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50" data-testid="solution-detail-error">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Alert>
            <AlertDescription>
              Solution not found. Please check the URL or browse our available solutions.
            </AlertDescription>
          </Alert>
          <div className="mt-8">
            <Link href="/solutions">
              <Button data-testid="button-back-to-solutions">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Solutions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50" data-testid="page-solution-detail">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm" data-testid="breadcrumb">
            <Link href="/solutions" className="text-primary hover:text-primary/80" data-testid="breadcrumb-solutions">
              Solutions
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600" data-testid="breadcrumb-current">{solution.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Image */}
        <div className="relative mb-12">
          <img 
            src={getSolutionImage(solution.slug, solution.imageUrl)} 
            alt={solution.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
            data-testid="solution-hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" data-testid="solution-title">
              {solution.title}
            </h1>
            <p className="text-xl text-white/90" data-testid="solution-subtitle">
              {solution.shortDescription}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-corporate mb-4" data-testid="solution-overview-title">
                  Solution Overview
                </h2>
                <div 
                  className="text-gray-600 leading-relaxed prose max-w-none" 
                  data-testid="solution-full-description"
                  dangerouslySetInnerHTML={{ __html: solution.fullDescription.replace(/\n/g, '<br/>') }}
                />
              </CardContent>
            </Card>

            {solution.features && solution.features.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-corporate mb-6" data-testid="solution-features-title">
                    Key Features
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {solution.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3" data-testid={`solution-feature-${index}`}>
                        <Check className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {solution.benefits && solution.benefits.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-corporate mb-4" data-testid="solution-benefits-title">
                    Key Benefits
                  </h3>
                  <div className="space-y-3">
                    {solution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2" data-testid={`solution-benefit-${index}`}>
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA Card */}
            <Card className="bg-primary text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3" data-testid="solution-cta-title">
                  Ready to Get Started?
                </h3>
                <p className="text-primary-foreground/80 mb-6 text-sm" data-testid="solution-cta-description">
                  Contact our team to discuss your specific needs and get a customized proposal.
                </p>
                <div className="space-y-3">
                  <Link href="/contact">
                    <Button className="w-full bg-white text-primary hover:bg-gray-100" data-testid="button-solution-contact">
                      Get Free Consultation
                    </Button>
                  </Link>
                  <Button 
                    className="w-full bg-white text-primary hover:bg-gray-100"
                    asChild
                    data-testid="button-solution-call"
                  >
                    <a href="tel:+13476825050">Call (347) 682-5050</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Solutions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-corporate mb-4" data-testid="related-solutions-title">
                  Related Solutions
                </h3>
                <div className="space-y-3">
                  <Link href="/solutions/commercial-solar-battery" className="block" data-testid="link-related-solar">
                    <div className="text-primary hover:text-primary/80 text-sm">Commercial Solar + Battery →</div>
                  </Link>
                  <Link href="/solutions/battery-storage" className="block" data-testid="link-related-battery">
                    <div className="text-primary hover:text-primary/80 text-sm">Battery Storage (BESS) →</div>
                  </Link>
                  <Link href="/solutions/energy-consulting" className="block" data-testid="link-related-consulting">
                    <div className="text-primary hover:text-primary/80 text-sm">Energy Consulting →</div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Link href="/solutions">
            <Button variant="outline" data-testid="button-back-solutions">
              <ArrowLeft className="mr-2 h-4 w-4" /> All Solutions
            </Button>
          </Link>
          <Link href="/projects">
            <Button data-testid="button-view-projects">
              View Case Studies <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
