import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import HeroSection from "@/components/hero-section";
import faqsHeroImage from "@assets/shutterstock_2477807729_1756091857693.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Faq } from "@shared/schema";

export default function FAQs() {
  const { data: faqs = [], isLoading } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
  });

  const [openItems, setOpenItems] = useState<string[]>([]);

  // Default FAQs if CMS is empty
  const defaultFaqs = [
    {
      id: "1",
      question: "What's the typical payback period for commercial solar installations?",
      answer: "Most commercial solar installations have a payback period of 5-7 years, depending on system size, energy usage, and available incentives. After the payback period, systems continue providing free electricity for 20+ years, resulting in significant long-term savings.",
      category: "solar",
      order: 1,
      isActive: true,
    },
    {
      id: "2",
      question: "Do you handle all permits and regulatory approvals?",
      answer: "Yes, we manage the entire approval process from start to finish. This includes obtaining building permits, electrical permits, utility interconnection agreements, and ensuring compliance with all local, state, and federal regulations including NYC's Local Law 97.",
      category: "permits",
      order: 2,
      isActive: true,
    },
    {
      id: "3",
      question: "What financing options are available for energy projects?",
      answer: "We offer multiple financing solutions to fit different business needs: Power Purchase Agreements (PPAs), equipment leases, traditional loans, and direct purchase options. Our team works with you to determine the most cost-effective approach for your specific situation.",
      category: "financing",
      order: 3,
      isActive: true,
    },
    {
      id: "4",
      question: "How do battery storage systems work with solar installations?",
      answer: "Battery energy storage systems (BESS) store excess solar energy generated during peak production hours for use when the sun isn't shining. This provides energy independence, backup power during outages, and opportunities to participate in grid services for additional revenue.",
      category: "battery",
      order: 4,
      isActive: true,
    },
    {
      id: "5",
      question: "What is NYC Local Law 97 and how does it affect my building?",
      answer: "Local Law 97 requires buildings over 25,000 square feet to meet carbon emission limits starting in 2024, with stricter limits in 2030. Non-compliance results in significant fines. Our energy consulting services help ensure your building meets these requirements through efficiency upgrades and clean energy solutions.",
      category: "compliance",
      order: 5,
      isActive: true,
    },
    {
      id: "6",
      question: "How long does a typical commercial solar installation take?",
      answer: "The timeline varies by project size and complexity, but most commercial installations take 3-6 months from contract signing to system activation. This includes design, permitting (6-8 weeks), procurement, installation (2-4 weeks), and utility interconnection.",
      category: "installation",
      order: 6,
      isActive: true,
    },
    {
      id: "7",
      question: "What maintenance is required for solar and battery systems?",
      answer: "Solar systems require minimal maintenance - primarily annual inspections and occasional cleaning. Battery systems need more regular monitoring and maintenance. We offer comprehensive O&M packages that include 24/7 monitoring, preventive maintenance, and emergency repairs to ensure optimal performance.",
      category: "maintenance",
      order: 7,
      isActive: true,
    },
    {
      id: "8",
      question: "Can you help with energy procurement for multiple locations?",
      answer: "Absolutely. Our ESCO services include portfolio-wide energy procurement, allowing you to leverage bulk purchasing power across multiple properties. We negotiate competitive rates for both electricity and natural gas while providing centralized billing and reporting.",
      category: "procurement",
      order: 8,
      isActive: true,
    },
    {
      id: "9",
      question: "What incentives and rebates are available for commercial energy projects?",
      answer: "Available incentives include federal tax credits (30% ITC for solar), accelerated depreciation, state and local rebates, utility incentives, and performance-based incentives. We help identify and secure all applicable incentives to maximize your project's financial benefits.",
      category: "incentives",
      order: 9,
      isActive: true,
    },
    {
      id: "10",
      question: "How do you ensure system performance and monitor energy production?",
      answer: "We provide comprehensive monitoring through advanced software platforms that track system performance in real-time. Our monitoring includes production data, system health alerts, and performance analytics. Clients receive regular reports and have access to online dashboards.",
      category: "monitoring",
      order: 10,
      isActive: true,
    },
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = Array.from(new Set(displayFaqs.map(faq => faq.category))).sort();

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      solar: "Solar Energy",
      battery: "Battery Storage",
      financing: "Financing",
      permits: "Permits & Approvals",
      compliance: "Compliance",
      installation: "Installation",
      maintenance: "Maintenance",
      procurement: "Energy Procurement",
      incentives: "Incentives & Rebates",
      monitoring: "Monitoring",
      general: "General",
    };
    return labels[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      solar: "bg-secondary/10 text-secondary",
      battery: "bg-primary/10 text-primary",
      financing: "bg-accent/10 text-accent",
      permits: "bg-purple-500/10 text-purple-500",
      compliance: "bg-red-500/10 text-red-500",
      installation: "bg-blue-500/10 text-blue-500",
      maintenance: "bg-green-500/10 text-green-500",
      procurement: "bg-orange-500/10 text-orange-500",
      incentives: "bg-indigo-500/10 text-indigo-500",
      monitoring: "bg-pink-500/10 text-pink-500",
      general: "bg-gray-500/10 text-gray-500",
    };
    return colors[category] || "bg-gray-500/10 text-gray-500";
  };

  return (
    <div data-testid="page-faqs">
      {/* FAQ Hero */}
      <HeroSection
        title="Frequently Asked Questions"
        description="Find answers to common questions about our energy solutions, financing options, installation process, and more. Can't find what you're looking for? Contact our team for personalized assistance."
        primaryButton={{
          text: "Contact Our Experts",
          href: "/contact",
        }}
        secondaryButton={{
          text: "Schedule Consultation",
          href: "/contact",
        }}
        backgroundImage={faqsHeroImage}
      />

      {/* FAQ Content */}
      <section className="py-20 bg-white" data-testid="section-faq-content">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="mb-12" data-testid="faq-categories">
              <h3 className="text-lg font-semibold text-corporate mb-4">Browse by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary" 
                    className={getCategoryColor(category)}
                    data-testid={`category-badge-${category}`}
                  >
                    {getCategoryLabel(category)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* FAQ List */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse" data-testid={`faq-skeleton-${i}`}>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayFaqs.length === 0 ? (
            <Card data-testid="faq-empty-state">
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-corporate mb-2">No FAQs Available</h3>
                <p className="text-gray-600 mb-6">
                  We're currently updating our FAQ section. Please contact us directly for any questions.
                </p>
                <Button asChild data-testid="button-contact-for-questions">
                  <a href="/contact">Contact Our Team</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {displayFaqs.map((faq) => (
                <Card key={faq.id} className="shadow-sm hover:shadow-md transition-shadow duration-200" data-testid={`faq-item-${faq.id}`}>
                  <Collapsible 
                    open={openItems.includes(faq.id)} 
                    onOpenChange={() => toggleItem(faq.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardContent className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200" data-testid={`faq-trigger-${faq.id}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 text-left">
                            <h4 className="text-lg font-semibold text-corporate mb-2" data-testid={`faq-question-${faq.id}`}>
                              {faq.question}
                            </h4>
                            <Badge 
                              variant="secondary" 
                              className={`${getCategoryColor(faq.category)} text-xs`}
                              data-testid={`faq-category-${faq.id}`}
                            >
                              {getCategoryLabel(faq.category)}
                            </Badge>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {openItems.includes(faq.id) ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="px-6 pb-6 pt-0" data-testid={`faq-answer-${faq.id}`}>
                        <div className="border-t pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12">
            <div className="bg-primary rounded-3xl p-12 lg:p-16">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="text-white/90 text-sm font-semibold tracking-wider mb-6">
                    RENEWABLE ENERGY
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-cta-title">
                    Ready to Discuss Your Project?
                  </h2>
                  <p className="text-xl text-white/90 max-w-2xl" data-testid="text-cta-description">
                    Let's have a conversation about your specific needs and how we can deliver real value for your property.
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <a href="/contact">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full"
                      data-testid="button-book-meeting"
                    >
                      Book A Meeting
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
