
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
  trending?: "up" | "down" | "neutral";
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  className,
  trending,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-5 w-5 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p 
            className={cn(
              "text-xs text-muted-foreground mt-1",
              trending === "up" && "text-ptc-success",
              trending === "down" && "text-ptc-danger"
            )}
          >
            {trending === "up" && "↑ "}
            {trending === "down" && "↓ "}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
