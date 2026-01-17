import Header from "@/components/Header";
import BulkWhatsAppForm from "@/components/BulkWhatsAppForm";
import { Stethoscope, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="py-8 md:py-12">
          <BulkWhatsAppForm />

          {/* Features Section */}
          <section className="max-w-xl mx-auto px-4 mt-12">
            <div className="grid grid-cols-3 gap-4">
              <FeatureCard
                icon={<Stethoscope className="w-5 h-5" />}
                title="Healthcare"
                description="Built for clinics"
              />
              <FeatureCard
                icon={<Shield className="w-5 h-5" />}
                title="Secure"
                description="Privacy first"
              />
              <FeatureCard
                icon={<Zap className="w-5 h-5" />}
                title="Fast"
                description="Bulk sending"
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 HealthConnect • Designed for Healthcare Professionals
          </p>
        </footer>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-primary mb-2">
      {icon}
    </div>
    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
  </div>
);

export default Index;
