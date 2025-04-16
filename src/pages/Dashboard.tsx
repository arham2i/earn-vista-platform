
import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, DollarSign, Clock, Zap, TrendingUp, Award, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [userName] = useState("John Doe");
  const [balance, setBalance] = useState("$35.75");
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [todaysEarnings, setTodaysEarnings] = useState(5.25);
  const [adTimeLeft, setAdTimeLeft] = useState(30);
  const [streakDays, setStreakDays] = useState(5);
  const [unreadNotifications] = useState(3);
  const [unreadMessages] = useState(1);
  
  useEffect(() => {
    let timer: number;
    
    if (isWatchingAd) {
      // Start the ad timer
      timer = window.setInterval(() => {
        setAdProgress((prev) => {
          const newProgress = prev + (100 / 30);
          if (newProgress >= 100) {
            // Ad finished
            clearInterval(timer);
            setIsWatchingAd(false);
            setAdProgress(0);
            
            // Add earnings
            const reward = (Math.random() * 0.5 + 0.5).toFixed(2);
            setTodaysEarnings((prev) => +(prev + parseFloat(reward)).toFixed(2));
            setBalance((prev) => `$${(parseFloat(prev.substring(1)) + parseFloat(reward)).toFixed(2)}`);
            
            // Show notification
            toast({
              title: "Ad Completed!",
              description: `You earned $${reward} for watching this ad.`,
            });
            
            return 0;
          }
          return newProgress;
        });
        
        setAdTimeLeft((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isWatchingAd, toast]);
  
  const handleWatchAd = () => {
    setIsWatchingAd(true);
    setAdTimeLeft(30);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar 
        userName={userName}
        unreadNotifications={unreadNotifications}
      />
      
      <div className="flex-1 ml-64">
        <TopBar 
          userBalance={balance}
          unreadNotifications={unreadNotifications}
          unreadMessages={unreadMessages}
        />
        
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
            <p className="text-muted-foreground">
              Here's an overview of your earnings and activities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatsCard
              title="Today's Earnings"
              value={`$${todaysEarnings.toFixed(2)}`}
              icon={<DollarSign className="h-5 w-5" />}
              description="21% more than yesterday"
              trending="up"
            />
            <StatsCard
              title="Ads Watched Today"
              value="8"
              icon={<Play className="h-5 w-5" />}
              description="3 more than yesterday"
              trending="up"
            />
            <StatsCard
              title="Daily Streak"
              value={`${streakDays} days`}
              icon={<Zap className="h-5 w-5" />}
              description="Keep it going!"
            />
          </div>
          
          {/* Ad watching card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className={`col-span-1 ${isWatchingAd ? 'border-primary animate-pulse-glow' : ''}`}>
              <CardHeader>
                <CardTitle>Watch Ad & Earn</CardTitle>
                <CardDescription>Watch ads to earn quick cash</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {isWatchingAd ? (
                  <>
                    <div className="w-full mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Ad in progress...</span>
                        <span>{adTimeLeft}s remaining</span>
                      </div>
                      <Progress value={adProgress} />
                    </div>
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-4">
                      <Timer className="h-12 w-12 text-primary animate-pulse" />
                    </div>
                    <p className="text-center text-sm">
                      Please watch the complete ad to receive your reward.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-4">
                      <Play className="h-12 w-12 text-primary" />
                    </div>
                    <Button onClick={handleWatchAd} className="w-full">
                      Watch Ad Now
                    </Button>
                    <p className="text-center text-sm mt-2">
                      Earn $0.50-$1.00 per ad watched!
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* Daily target card */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Daily Target</CardTitle>
                <CardDescription>8/10 ads watched today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily Progress</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} />
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-ptc-warning" />
                      <span>Complete today's target to earn a $2 bonus!</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View History
                </Button>
              </CardFooter>
            </Card>
            
            {/* Referral card */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Referral Earnings</CardTitle>
                <CardDescription>Invite friends to earn more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Referrals</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earned</p>
                      <p className="text-2xl font-bold">$73.50</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md">
                    <p className="text-sm mb-2">Your Referral Link</p>
                    <div className="flex gap-2">
                      <Input
                        readOnly
                        value="https://watchtoearn.com/ref/johndoe"
                        className="text-xs"
                      />
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Invite Friends
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Earnings chart */}
          <EarningsChart />
        </div>
      </div>
    </div>
  );
}

// Helper Input component since we can't import it from shadcn directly in this simplified version
function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      {...props}
      className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ""}`}
    />
  );
}
