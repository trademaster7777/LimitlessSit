import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, MapPin, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProjectImage } from "@/assets/project-images";

interface ProjectWithDetails {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  location?: string;
  capacity?: string;
  energySavings?: string;
  tags?: string[];
  details?: {
    clientName: string;
    solution: string;
    overview?: string;
    ourRole?: string;
    objectives?: string;
    systemComponents?: string;
    results?: string;
    timeline?: string;
    videoId?: string;
  };
}

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: project, isLoading, error } = useQuery<ProjectWithDetails>({
    queryKey: [`/api/projects/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50" data-testid="page-project-detail-loading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50" data-testid="page-project-detail-error">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/projects">
              <Button data-testid="button-back-to-projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatContent = (content: string | undefined) => {
    if (!content) return null;
    return content.split('\n').map((line, index) => {
      if (line.startsWith('•')) {
        return (
          <li key={index} className="ml-4" data-testid={`list-item-${index}`}>
            {line.substring(1).trim()}
          </li>
        );
      }
      if (line.includes(':') && !line.startsWith('http')) {
        const [title, ...rest] = line.split(':');
        const restContent = rest.join(':').trim();
        if (restContent) {
          return (
            <p key={index} className="mb-4" data-testid={`formatted-line-${index}`}>
              <strong className="text-corporate">{title}:</strong> {restContent}
            </p>
          );
        }
        return (
          <h3 key={index} className="text-xl font-semibold text-corporate mt-6 mb-3" data-testid={`section-title-${index}`}>
            {title}
          </h3>
        );
      }
      if (line.trim()) {
        return (
          <p key={index} className="mb-4 text-gray-700" data-testid={`paragraph-${index}`}>
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="page-project-detail">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-b from-primary/10 to-transparent">
        <img
          src={getProjectImage(project.slug, project.imageUrl)}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="project-hero-image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="text-white">
            <Link href="/projects">
              <Button variant="ghost" className="text-white hover:text-white/80 mb-4" data-testid="button-back">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="project-title">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              {project.location && (
                <div className="flex items-center gap-2" data-testid="project-location">
                  <MapPin className="h-5 w-5" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.energySavings && (
                <div className="flex items-center gap-2" data-testid="project-savings">
                  <Zap className="h-5 w-5" />
                  <span>{project.energySavings}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card data-testid="section-overview">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-corporate mb-4">Project Overview</h2>
                <p className="text-gray-700 leading-relaxed" data-testid="project-description">
                  {project.description}
                </p>
                {project.details?.overview && (
                  <div className="mt-6">
                    {formatContent(project.details.overview)}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Our Role */}
            {project.details?.ourRole && (
              <Card data-testid="section-our-role">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-corporate mb-4">Our Role</h2>
                  <div className="text-gray-700">
                    {formatContent(project.details.ourRole)}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Objectives */}
            {project.details?.objectives && (
              <Card data-testid="section-objectives">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-corporate mb-4">Project Objectives</h2>
                  <div className="text-gray-700">
                    {formatContent(project.details.objectives)}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* System Components */}
            {project.details?.systemComponents && (
              <Card data-testid="section-components">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-corporate mb-4">System Components</h2>
                  <div className="text-gray-700">
                    {formatContent(project.details.systemComponents)}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Video */}
            {project.details?.videoId && (
              <Card data-testid="section-video">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-corporate mb-4">Project Video</h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.details.videoId}?rel=0&modestbranding=1`}
                      title="Project video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      data-testid="project-video-iframe"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timeline & Results */}
            {project.details?.timeline && (
              <Card data-testid="section-timeline">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-corporate mb-4">Timeline & Results</h2>
                  <div className="text-gray-700">
                    {formatContent(project.details.timeline)}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {project.details?.results && (
              <Card data-testid="section-results">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-corporate mb-4">Results</h2>
                  <div className="text-gray-700">
                    {formatContent(project.details.results)}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details Card */}
            <Card data-testid="project-info-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-corporate mb-4">Project Details</h3>
                <div className="space-y-4">
                  {project.details?.clientName && (
                    <div data-testid="client-name">
                      <p className="text-sm text-gray-600">Client</p>
                      <p className="font-semibold text-corporate">{project.details.clientName}</p>
                    </div>
                  )}
                  {project.details?.solution && (
                    <div data-testid="solution-type">
                      <p className="text-sm text-gray-600">Solution</p>
                      <p className="font-semibold text-corporate">{project.details.solution}</p>
                    </div>
                  )}
                  {project.capacity && (
                    <div data-testid="project-capacity">
                      <p className="text-sm text-gray-600">System Capacity</p>
                      <p className="font-semibold text-corporate">{project.capacity}</p>
                    </div>
                  )}
                  {project.location && (
                    <div data-testid="project-location-detail">
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-corporate">{project.location}</p>
                    </div>
                  )}
                  {project.energySavings && (
                    <div data-testid="energy-savings-detail">
                      <p className="text-sm text-gray-600">Energy Savings</p>
                      <p className="font-semibold text-accent">{project.energySavings}</p>
                    </div>
                  )}
                </div>

                {project.tags && project.tags.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div data-testid="project-tags">
                      <p className="text-sm text-gray-600 mb-3">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" data-testid={`tag-${tag}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator className="my-4" />
                <Link href="/contact">
                  <Button className="w-full" data-testid="button-start-project">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Start Your Project
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-primary text-white" data-testid="cta-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Ready to Transform Your Energy?</h3>
                <p className="mb-4 text-sm">
                  Let's discuss how we can help you achieve similar results for your commercial property.
                </p>
                <Link href="/contact">
                  <Button variant="secondary" className="w-full" data-testid="button-free-assessment">
                    Get Free Energy Assessment
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}