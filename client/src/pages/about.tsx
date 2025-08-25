import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Handshake, Lightbulb } from "lucide-react";
import type { TeamMember } from "@shared/schema";
import aboutHeroImage from "@assets/shutterstock_1514593175_1756092000240.jpg";

export default function About() {
  const { data: teamMembers = [], isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  return (
    <div data-testid="page-about">
      {/* About Hero */}
      <HeroSection
        title="About Limitless Energy CO"
        description="Founded to make clean energy profitable for property owners, we combine deep market expertise with clear, actionable education to deliver solutions that enhance both asset value and environmental performance."
        backgroundImage={aboutHeroImage}
      />

      {/* Company Overview and Mission */}
      <section className="py-20 bg-white" data-testid="section-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-corporate mb-6" data-testid="text-story-title">Our Story</h3>
            <p className="text-gray-600 mb-4 max-w-4xl" data-testid="text-story-paragraph-1">
              Limitless Energy Co. exists to transform underutilized urban rooftops and land into sustainable energy assets that power New York's clean energy future. In doing so, we create shared value for communities, property owners, and investors.
            </p>
            <p className="text-gray-600 mb-8 max-w-4xl" data-testid="text-story-paragraph-2">
              At Limitless Energy Co. (LEC), we leverage deep local real estate expertise and renewable energy solutions to boost New York City landlords' property values and create new revenue streams. As native New Yorkers, we understand your specific challenges—managing costs, complying with regulations, and enhancing NOI—because we've experienced them firsthand.
            </p>
          </div>

          {/* Mission Card */}
          <Card className="p-8 md:p-12 shadow-lg">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-semibold text-corporate mb-4" data-testid="text-mission-title">Our Mission</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-mission-description">
                  To empower NYC landlords with clear, trustworthy information about renewable energy. We adopt an educate-first approach, ensuring you fully understand the financial and environmental advantages of solar energy. Through our exclusive partnership with Solar One, a NYSERDA-certified Builder, we deliver high-quality installations that convert underutilized spaces into profitable, sustainable energy assets—without the hassle or pressure of a hard sell.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center" data-testid="value-sustainability">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-secondary" />
                  </div>
                  <h4 className="text-lg font-semibold text-corporate mb-2">Sustainability</h4>
                  <p className="text-gray-600 text-sm">Driving environmental impact through clean energy adoption</p>
                </div>
                <div className="text-center" data-testid="value-partnership">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Handshake className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-corporate mb-2">Partnership</h4>
                  <p className="text-gray-600 text-sm">Building long-term relationships based on trust and results</p>
                </div>
                <div className="text-center" data-testid="value-innovation">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-corporate mb-2">Innovation</h4>
                  <p className="text-gray-600 text-sm">Leveraging cutting-edge technology for optimal solutions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="py-20 bg-white" data-testid="section-team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-corporate mb-4" data-testid="text-team-title">Leadership Team</h3>
            <p className="text-xl text-gray-600" data-testid="text-team-description">Meet the experts driving our mission forward</p>
          </div>
          
          {teamLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6 shadow-lg animate-pulse" data-testid={`team-skeleton-${i}`}>
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-2/3 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12" data-testid="team-empty-state">
              <p className="text-gray-500 text-lg">Our leadership team information is currently being updated.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="p-6 shadow-lg text-center" data-testid={`team-member-${member.id}`}>
                  <CardContent className="p-0">
                    <img 
                      src={member.imageUrl} 
                      alt={`${member.name} portrait`}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      data-testid={`team-image-${member.id}`}
                    />
                    <h4 className="text-xl font-semibold text-corporate mb-1" data-testid={`team-name-${member.id}`}>
                      {member.name}
                    </h4>
                    <p className="text-primary font-medium mb-3" data-testid={`team-position-${member.id}`}>
                      {member.position}
                    </p>
                    <p className="text-gray-600 text-sm" data-testid={`team-bio-${member.id}`}>
                      {member.bio}
                    </p>
                    {member.linkedinUrl && (
                      <a 
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-primary hover:text-primary/80"
                        data-testid={`team-linkedin-${member.id}`}
                      >
                        <Badge variant="outline">LinkedIn Profile</Badge>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
