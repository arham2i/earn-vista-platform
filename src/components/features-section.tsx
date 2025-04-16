
import { Clock, DollarSign, Users, Award, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Watch & Earn",
    description: "Get paid for every advertisement you watch. Simple, quick, and profitable."
  },
  {
    icon: <DollarSign className="h-10 w-10" />,
    title: "Fast Payments",
    description: "Withdraw your earnings to PayPal, UPI, or Crypto whenever you want."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Referral Program",
    description: "Earn 10% of what your referrals make. Build your network and increase your income."
  },
  {
    icon: <Award className="h-10 w-10" />,
    title: "Premium Plans",
    description: "Upgrade your account for higher ad rates, priority ads, and exclusive offers."
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Global Access",
    description: "Available worldwide with localized payment methods for every region."
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Secure Platform",
    description: "Your data and earnings are protected with enterprise-grade security."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How WatchToEarn Works</h2>
          <p className="text-lg text-foreground/80">
            Our platform makes it easy to earn money in your spare time by watching advertisements from our partners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-6 rounded-xl border border-border hover:border-primary/40 transition-all duration-300 bg-card hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
