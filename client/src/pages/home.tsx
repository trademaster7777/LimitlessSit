import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, BarChart3, Cog, Shield } from "lucide-react";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSolutionImage } from "@/assets/solution-images";
import { getProjectImage } from "@/assets/project-images";
import heroBackgroundImage from "@assets/shutterstock_2309770379_1756075911369.jpg";
import type { Solution, Project } from "@shared/schema";

export default function Home() {
  const { data: solutions = [], isLoading: solutionsLoading } = useQuery<Solution[]>({
    queryKey: ["/api/solutions"],
  });

  const { data: featuredProjects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  return (
    <div data-testid="page-home">
      {/* Hero Section */}
      <HeroSection
        title="Powering New York's Future, One Property at a Time"
        description="Unlock Hidden Value in Your Property with Integrated Energy Solutions Designed for Real Estate"
        primaryButton={{
          text: "Get Free Energy Assessment",
          href: "/contact",
        }}
        secondaryButton={{
          text: "View Our Solutions",
          href: "/solutions",
        }}
        backgroundImage={heroBackgroundImage}
      />

      {/* Value Proposition */}
      <section className="py-20 bg-white" data-testid="section-value-proposition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-corporate mb-4" data-testid="text-value-title">
              Why Choose Limitless Energy CO?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-value-description">
              We deliver end-to-end energy solutions that transform how businesses power their operations, 
              combining cutting-edge technology with decades of industry expertise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-200" data-testid="card-proven-roi">
              <CardContent className="p-6">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-corporate mb-3">Boost NOI</h3>
                <p className="text-gray-600">
                  Increase net operating income with new revenue streams from clean energy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-200" data-testid="card-turnkey-solutions">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cog className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-corporate mb-3">Future-Proof</h3>
                <p className="text-gray-600">
                  Safeguard against Local Law 97 penalties and rising energy costs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-200" data-testid="card-compliance-expertise">
              <CardContent className="p-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-corporate mb-3">Enhance Value</h3>
                <p className="text-gray-600">
                  Elevate property value and attract tenants with sustainable solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Showcase */}
      <section className="py-20 bg-gray-50" data-testid="section-solutions-showcase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-corporate mb-4" data-testid="text-solutions-title">
              Our Energy Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-solutions-description">
              Comprehensive energy services designed to optimize your commercial operations and maximize sustainability impact.
            </p>
          </div>
          
          {solutionsLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse" data-testid={`solution-skeleton-${i}`}>
                  <div className="w-full h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {solutions.slice(0, 4).map((solution) => (
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
                    <Link href={`/solutions/${solution.slug}`}>
                      <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80" data-testid={`button-solution-learn-more-${solution.slug}`}>
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/solutions">
              <Button size="lg" data-testid="button-view-all-solutions">
                View All Solutions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white" data-testid="section-featured-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-corporate mb-4" data-testid="text-projects-title">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-projects-description">
              Real results from our energy solutions across diverse commercial applications.
            </p>
          </div>
          
          {projectsLoading ? (
            <div className="grid lg:grid-cols-2 gap-12">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse" data-testid={`project-skeleton-${i}`}>
                  <div className="w-full h-64 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              {featuredProjects.slice(0, 2).map((project) => (
                <div key={project.id} className="group" data-testid={`project-card-${project.slug}`}>
                  <img 
                    src={getProjectImage(project.slug, project.imageUrl)} 
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200"
                    data-testid={`project-image-${project.slug}`}
                  />
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-corporate mb-3" data-testid={`project-title-${project.slug}`}>
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4" data-testid={`project-description-${project.slug}`}>
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-tags-${project.slug}`}>
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" data-testid={`project-tag-${tag}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Link href={`/projects/${project.slug}`}>
                      <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80" data-testid={`button-project-view-${project.slug}`}>
                        View Case Study <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button size="lg" data-testid="button-view-all-projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-testid="section-cta-revenue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 lg:p-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-white/90 text-sm font-semibold tracking-wider mb-6">
                  RENEWABLE ENERGY
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-cta-title">
                  Ready to understand how we can potentially unlock new revenue from your property?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl" data-testid="text-cta-description">
                  Let's transform your properties into sustainable, high-performing assets.
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
