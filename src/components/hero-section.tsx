
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // This would be where we'd set up actual audio playback
    // For demo purposes, we're just toggling the state
    return () => {
      // Cleanup audio if needed
    };
  }, [isPlaying]);

  return (
    <div className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      {/* Abstract floating elements */}
      <div className="absolute -top-10 left-1/3 w-64 h-64 rounded-full bg-ptc-primary/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-ptc-accent/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 py-1.5 px-6 text-sm font-medium">
            <span className="mr-2 bg-ptc-success rounded-full w-2 h-2 inline-block"></span>
            <span>Over 5,000 users joined last month</span>
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-ptc-primary via-ptc-secondary to-ptc-accent leading-tight">
            Earn Real Money By Watching Ads!
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl">
            Join thousands making easy cash daily by simply watching advertisements on our platform. Turn your free time into a profitable opportunity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="btn-hover-effect">
              <Link to="/signup" className="flex items-center">
                Join Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-hover-effect">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5" /> Mute Background Music
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" /> Play Background Music
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-ptc-primary mb-1">2.5M+</span>
              <span className="text-sm text-muted-foreground">Ads Watched</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-ptc-secondary mb-1">85K+</span>
              <span className="text-sm text-muted-foreground">Active Users</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-ptc-accent mb-1">$750K+</span>
              <span className="text-sm text-muted-foreground">Paid Out</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold text-ptc-success mb-1">4.8/5</span>
              <span className="text-sm text-muted-foreground">User Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
