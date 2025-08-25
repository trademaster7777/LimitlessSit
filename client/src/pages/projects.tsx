import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import HeroSection from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Zap, ArrowRight } from "lucide-react";
import { getProjectImage } from "@/assets/project-images";
import projectsHeroImage from "@assets/projects-hero-background.jpg";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div data-testid="page-projects">
      {/* Projects Hero */}
      <HeroSection
        title="Our Project Portfolio"
        description="Explore our successful energy transformations across diverse commercial applications. From small businesses to large industrial facilities, see how we've helped organizations achieve their sustainability and cost-reduction goals."
        primaryButton={{
          text: "Start Your Project",
          href: "/contact",
        }}
        secondaryButton={{
          text: "View Our Solutions",
          href: "/solutions",
        }}
        backgroundImage={projectsHeroImage}
      />

      {/* Projects Grid */}
      <section className="py-20 bg-white" data-testid="section-projects-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse" data-testid={`project-skeleton-${i}`}>
                  <div className="w-full h-64 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20" data-testid="projects-empty-state">
              <h3 className="text-2xl font-semibold text-corporate mb-4">Project Case Studies Coming Soon</h3>
              <p className="text-gray-600 mb-8">
                We're currently updating our project portfolio. Contact us to learn about our recent successful installations and energy transformations.
              </p>
              <div className="flex justify-center">
                <a 
                  href="/contact" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                  data-testid="button-contact-projects"
                >
                  Contact Our Team
                </a>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              {projects.map((project) => (
                <div key={project.id} className="group" data-testid={`project-card-${project.slug}`}>
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                    <img 
                      src={getProjectImage(project.slug, project.imageUrl)} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                      data-testid={`project-image-${project.slug}`}
                    />
                    {project.isFeatured && (
                      <Badge className="absolute top-4 left-4 bg-accent text-white" data-testid={`project-featured-badge-${project.slug}`}>
                        Featured Project
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-corporate mb-3" data-testid={`project-title-${project.slug}`}>
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                      {project.location && (
                        <div className="flex items-center" data-testid={`project-location-${project.slug}`}>
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                      )}
                      {project.capacity && (
                        <div className="flex items-center" data-testid={`project-capacity-${project.slug}`}>
                          <Zap className="h-4 w-4 mr-1" />
                          {project.capacity}
                        </div>
                      )}
                      {project.createdAt && (
                        <div className="flex items-center" data-testid={`project-date-${project.slug}`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(project.createdAt).getFullYear()}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed" data-testid={`project-description-${project.slug}`}>
                      {project.description}
                    </p>
                    
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-tags-${project.slug}`}>
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs" data-testid={`project-tag-${tag}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <Link href={`/projects/${project.slug}`}>
                        <Button className="w-full" data-testid={`button-project-details-${project.slug}`}>
                          Project Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" data-testid="section-cta-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 lg:p-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-white/90 text-sm font-semibold tracking-wider mb-6">
                  RENEWABLE ENERGY
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-cta-title">
                  Ready to Transform Your Property Like These?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl" data-testid="text-cta-description">
                  Let's write your success story with proven strategies and innovative clean energy solutions.
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
