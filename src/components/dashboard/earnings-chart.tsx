
import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type TimeRange = "day" | "week" | "month" | "year";

// Sample data
const dailyData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  earnings: Math.random() * 5,
}));

const weeklyData = Array.from({ length: 7 }, (_, i) => {
  const day = new Date();
  day.setDate(day.getDate() - 6 + i);
  return {
    time: day.toLocaleDateString('en-US', { weekday: 'short' }),
    earnings: Math.random() * 20 + 10,
  };
});

const monthlyData = Array.from({ length: 30 }, (_, i) => {
  const day = new Date();
  day.setDate(day.getDate() - 29 + i);
  return {
    time: `${day.getDate()}/${day.getMonth() + 1}`,
    earnings: Math.random() * 50 + 20,
  };
});

const yearlyData = Array.from({ length: 12 }, (_, i) => {
  const month = new Date();
  month.setMonth(i);
  return {
    time: month.toLocaleDateString('en-US', { month: 'short' }),
    earnings: Math.random() * 200 + 50,
  };
});

export function EarningsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("week");
  
  // Get data based on selected time range
  const getData = () => {
    switch(timeRange) {
      case "day": return dailyData;
      case "week": return weeklyData;
      case "month": return monthlyData;
      case "year": return yearlyData;
      default: return weeklyData;
    }
  };
  
  // Calculate total earnings for the selected period
  const totalEarnings = getData().reduce((sum, item) => sum + item.earnings, 0).toFixed(2);
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>Your earnings over time</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={timeRange === "day" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("day")}
          >
            Day
          </Button>
          <Button 
            variant={timeRange === "week" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === "month" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button 
            variant={timeRange === "year" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange("year")}
          >
            Year
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-6">${totalEarnings}</div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getData()}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Earnings']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#8B5CF6"
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
