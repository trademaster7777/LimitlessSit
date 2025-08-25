import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import HeroSection from "@/components/hero-section";
import contactHeroImage from "@assets/shutterstock_2606259769_1756092147202.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema } from "@shared/schema";
import type { z } from "zod";

type ContactFormData = z.infer<typeof insertContactSubmissionSchema>;

const contactFormSchema = insertContactSubmissionSchema.extend({
  firstName: insertContactSubmissionSchema.shape.firstName.min(1, "First name is required"),
  lastName: insertContactSubmissionSchema.shape.lastName.min(1, "Last name is required"),
  email: insertContactSubmissionSchema.shape.email.email("Please enter a valid email address").min(1, "Email is required"),
  company: insertContactSubmissionSchema.shape.company.optional(),
  phone: insertContactSubmissionSchema.shape.phone.optional(),
  solutionInterest: insertContactSubmissionSchema.shape.solutionInterest.optional(),
  projectDetails: insertContactSubmissionSchema.shape.projectDetails.optional(),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      phone: "",
      solutionInterest: "",
      projectDetails: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Thank you for your inquiry!",
        description: "We will contact you within 24 hours to discuss your energy needs.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly at (347) 682-5050.",
        variant: "destructive",
      });
      console.error("Contact form submission error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <div data-testid="page-contact">
      {/* Contact Hero */}
      <HeroSection
        title="Get Started Today"
        description="Ready to transform your energy operations? Contact our team for a comprehensive assessment and customized solution proposal."
        primaryButton={{
          text: "Call (347) 682-5050",
          href: "tel:+13476825050",
        }}
        secondaryButton={{
          text: "Email Us",
          href: "mailto:info@limitlessenergyco.com",
        }}
        backgroundImage={contactHeroImage}
      />

      {/* Contact Content */}
      <section className="py-20 bg-gray-50" data-testid="section-contact-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg" data-testid="contact-form-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-corporate mb-6" data-testid="text-contact-form-title">
                  Request Consultation
                </h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8" data-testid="contact-form-success">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-corporate mb-2">Thank You!</h4>
                    <p className="text-gray-600 mb-6">
                      Your consultation request has been submitted successfully. Our team will contact you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      data-testid="button-submit-another"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John" 
                                  data-testid="input-first-name"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Smith" 
                                  data-testid="input-last-name"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Company Name" 
                                data-testid="input-company"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="john@company.com" 
                                  data-testid="input-email"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel"
                                  placeholder="(555) 123-4567" 
                                  data-testid="input-phone"
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="solutionInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Solution Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                              <FormControl>
                                <SelectTrigger data-testid="select-solution-interest">
                                  <SelectValue placeholder="Select a solution..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="commercial-solar-battery" data-testid="option-solar-battery">Commercial Solar + Battery</SelectItem>
                                <SelectItem value="battery-storage" data-testid="option-battery-storage">Battery Storage (BESS)</SelectItem>
                                <SelectItem value="energy-procurement" data-testid="option-energy-procurement">Energy Procurement</SelectItem>
                                <SelectItem value="om-services" data-testid="option-om-services">O&M Services</SelectItem>
                                <SelectItem value="energy-consulting" data-testid="option-energy-consulting">Energy Consulting</SelectItem>
                                <SelectItem value="multiple-solutions" data-testid="option-multiple-solutions">Multiple Solutions</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="projectDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={4}
                                placeholder="Tell us about your project, energy goals, and timeline..."
                                data-testid="textarea-project-details"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full" 
                        disabled={submitMutation.isPending}
                        data-testid="button-submit-consultation"
                      >
                        {submitMutation.isPending ? "Submitting..." : "Request Consultation"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div>
              <Card className="shadow-lg mb-8" data-testid="contact-info-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-corporate mb-6" data-testid="text-contact-info-title">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start" data-testid="contact-info-phone">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-corporate">Phone</div>
                        <a 
                          href="tel:+13476825050" 
                          className="text-gray-600 hover:text-primary transition-colors"
                          data-testid="link-phone"
                        >
                          (347) 682-5050
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start" data-testid="contact-info-email">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-corporate">Email</div>
                        <a 
                          href="mailto:info@limitlessenergyco.com" 
                          className="text-gray-600 hover:text-primary transition-colors"
                          data-testid="link-email"
                        >
                          info@limitlessenergyco.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start" data-testid="contact-info-address">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-corporate">Office</div>
                        <div className="text-gray-600">
                          34-18 Northern Blvd, Suite 513<br />
                          Long Island City, NY 11101
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start" data-testid="contact-info-hours">
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 mt-1">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-corporate">Business Hours</div>
                        <div className="text-gray-600">
                          Monday - Friday: 8:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 2:00 PM<br />
                          Sunday: Closed
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick FAQ */}
              <Card className="shadow-lg" data-testid="quick-faq-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-corporate mb-6" data-testid="text-quick-faq-title">
                    Quick Answers
                  </h3>
                  
                  <div className="space-y-6">
                    <div data-testid="faq-payback-period">
                      <h4 className="font-semibold text-corporate mb-2">What's the typical payback period for commercial solar?</h4>
                      <p className="text-gray-600 text-sm">Most commercial solar installations have a payback period of 5-7 years, with systems providing 20+ years of energy savings.</p>
                    </div>
                    
                    <div data-testid="faq-permits">
                      <h4 className="font-semibold text-corporate mb-2">Do you handle all permits and approvals?</h4>
                      <p className="text-gray-600 text-sm">Yes, we manage the entire approval process including permits, utility interconnection, and regulatory compliance.</p>
                    </div>
                    
                    <div data-testid="faq-financing">
                      <h4 className="font-semibold text-corporate mb-2">What financing options are available?</h4>
                      <p className="text-gray-600 text-sm">We offer multiple financing solutions including PPAs, leases, loans, and direct purchase options to fit your budget.</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="mt-6 p-0 h-auto text-primary hover:text-primary/80"
                    asChild
                    data-testid="button-view-all-faqs"
                  >
                    <a href="/faqs">
                      View All FAQs →
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
