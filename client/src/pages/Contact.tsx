import { useState, useRef } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Phone, Mail, MapPin, Clock, Send, Music, Calendar, Palette, Globe } from "lucide-react";
import { FadeIn, GlowingBorder, TiltCard, AnimatedGradientText } from "@/components/AnimatedElements";
import { SEO, createBreadcrumbJsonLd } from "@/components/SEO";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";

const contactFormSchema = insertContactMessageSchema.extend({
  name: insertContactMessageSchema.shape.name.min(2, "Name must be at least 2 characters"),
  email: insertContactMessageSchema.shape.email.email("Please enter a valid email address"),
  subject: insertContactMessageSchema.shape.subject.min(1, "Please select a subject"),
  message: insertContactMessageSchema.shape.message.min(10, "Message must be at least 10 characters"),
});

type ContactFormData = InsertContactMessage;

function HeroBanner() {
  return (
    <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
      <img 
        src="/attached_assets/Barry_Ferrier_aka_Dr_Baz_Contact_1770259643602.jpg"
        alt="Dr Baz - Contact"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <FadeIn direction="up">
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-8 text-center lg:text-left max-w-7xl mx-auto lg:mx-0 lg:ml-8 xl:ml-16">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-4" data-testid="text-contact-title">
              <AnimatedGradientText>Get In Touch</AnimatedGradientText>
            </h1>
            <p className="text-xl text-white/80 max-w-xl">
              We are passionate about what we do. We simply love what we do.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function ContactForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", { ...data, recaptchaToken });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for your enquiry. We'll get back to you soon.",
      });
      form.reset();
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    if (!recaptchaToken && RECAPTCHA_SITE_KEY) {
      toast({
        title: "Verification Required",
        description: "Please complete the CAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-8 lg:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-serif font-bold">Thank You!</h3>
          <p className="text-muted-foreground">
            Your message has been sent successfully. We'll get back to you as soon as possible.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" data-testid="button-send-another">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8 lg:p-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" type="email" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-subject">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="performance">Music Performance Booking</SelectItem>
                        <SelectItem value="wedding">Wedding/Corporate Event</SelectItem>
                        <SelectItem value="composition">Composition Commission</SelectItem>
                        <SelectItem value="design">Graphic Design Project</SelectItem>
                        <SelectItem value="website">Website Design</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your event or project..."
                      className="min-h-[150px] resize-none"
                      {...field}
                      data-testid="textarea-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {RECAPTCHA_SITE_KEY && (
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                  theme="dark"
                  data-testid="recaptcha"
                />
              </div>
            )}

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-gold hover:bg-gold/90 text-white"
              disabled={mutation.isPending || (RECAPTCHA_SITE_KEY && !recaptchaToken)}
              data-testid="button-submit"
            >
              {mutation.isPending ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold mb-6" data-testid="text-contact-info-title">Contact Information</h2>
        <div className="space-y-4">
          <a href="tel:+61266871594" className="flex items-center gap-4 text-foreground hover:text-gold transition-colors group" data-testid="contact-phone-1">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="font-medium">Phone</div>
              <div className="text-muted-foreground">+61 2 6687 1594</div>
            </div>
          </a>
          
          <a href="tel:0405788433" className="flex items-center gap-4 text-foreground hover:text-gold transition-colors group" data-testid="contact-phone-2">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="font-medium">Mobile</div>
              <div className="text-muted-foreground">0405 788 433</div>
            </div>
          </a>
          
          <div className="flex items-start gap-4" data-testid="contact-address">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="font-medium">Address</div>
              <div className="text-muted-foreground">P.O. Box 8<br />Bangalow 2479<br />Australia</div>
            </div>
          </div>
          
          <div className="flex items-start gap-4" data-testid="contact-email">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="font-medium">Email</div>
              <div className="text-muted-foreground">Use the contact form</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Services Available</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Music, label: "Live Performance" },
            { icon: Calendar, label: "Wedding Music" },
            { icon: Music, label: "Corporate Events" },
            { icon: Palette, label: "Graphic Design" },
            { icon: Globe, label: "Website Design" },
            { icon: Music, label: "Composition" },
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-gold" />
                {service.label}
              </div>
            );
          })}
        </div>
      </div>

      <Card className="bg-gold/5 border-gold/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-gold" />
            <h3 className="font-semibold">Response Time</h3>
          </div>
          <p className="text-muted-foreground text-sm">
            We typically respond to enquiries within 24-48 hours. For urgent bookings, please call directly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ContactSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold mb-4" data-testid="text-location-title">Location</h2>
          <p className="text-muted-foreground">Based in the beautiful Byron Bay region, NSW, Australia</p>
        </div>
        <div className="aspect-[21/9] bg-muted rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56149.62098388657!2d153.5599614!3d-28.6473793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9087a59a9e47bf%3A0x50609b490047f00!2sByron%20Bay%20NSW%202481%2C%20Australia!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
            data-testid="map-embed"
          />
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  usePageTitle("Contact", "Book Doctor Baz for your wedding, corporate event, or festival. Based in Byron Bay, NSW, Australia.");

  return (
    <main className="pt-16 md:pt-20">
      <SEO
        title="Contact"
        description="Book Doctor Baz for your wedding, corporate event, or festival. Based in Byron Bay, NSW, Australia."
        url="/contact"
        keywords="book musician, hire musician Byron Bay, wedding musician, corporate entertainment, festival performer, Johnny Cash tribute show, solo performer, duo act, Byron Bay Bluesfest, Splendour in the Grass"
        jsonLd={createBreadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" }
        ])}
      />
      <HeroBanner />
      <ContactSection />
      <MapSection />
    </main>
  );
}
