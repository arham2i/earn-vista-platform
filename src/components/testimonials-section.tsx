
import { useState } from "react";
import { TestimonialCard } from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    content: "I've tried many earning platforms before, but WatchToEarn is by far the easiest and most reliable. I've earned over $500 in just two months!",
    author: "Sarah Johnson",
    role: "Student",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    earnings: "$500+"
  },
  {
    content: "The referral system is amazing! I invited 10 friends and now I'm making passive income from their activities. It's truly a game-changer.",
    author: "Michael Chen",
    role: "Freelancer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    earnings: "$1,200+"
  },
  {
    content: "What I love most about WatchToEarn is how transparent everything is. The earnings are clear, payouts are prompt, and support is responsive.",
    author: "Priya Sharma",
    role: "Teacher",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    earnings: "$350+"
  },
  {
    content: "As someone with a few spare hours each day, this platform has been perfect. It's become a reliable source of side income for me.",
    author: "James Wilson",
    role: "Retail Worker",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    earnings: "$780+"
  },
  {
    content: "The premium plan was definitely worth investing in. My earnings almost doubled after upgrading, and the exclusive offers are great.",
    author: "Elena Rodriguez",
    role: "Digital Marketer",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    earnings: "$1,500+"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Create a circular array for smooth infinite scrolling
  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < visibleTestimonials; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Join thousands of satisfied users who are already turning their spare time into real income with WatchToEarn.
          </p>
        </div>
        
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-8">
          {getVisibleTestimonials().map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              earnings={testimonial.earnings}
            />
          ))}
        </div>
        
        {/* Mobile version - single testimonial */}
        <div className="lg:hidden">
          <TestimonialCard
            content={testimonials[currentIndex].content}
            author={testimonials[currentIndex].author}
            role={testimonials[currentIndex].role}
            avatar={testimonials[currentIndex].avatar}
            earnings={testimonials[currentIndex].earnings}
          />
        </div>
        
        <div className="flex justify-center mt-8 gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-primary/30"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
