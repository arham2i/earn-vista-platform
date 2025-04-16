
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
  earnings?: string;
}

export function TestimonialCard({
  content,
  author,
  role,
  avatar,
  earnings,
}: TestimonialCardProps) {
  return (
    <Card className="relative overflow-hidden glass-card">
      <CardContent className="px-6 py-8">
        <div className="absolute top-4 right-4 text-3xl text-ptc-primary opacity-30 font-serif">
          "
        </div>
        <p className="text-foreground/80 mb-6 relative z-10">{content}</p>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold">{author}</h4>
            <p className="text-sm text-foreground/70">{role}</p>
            {earnings && (
              <p className="text-sm text-ptc-success font-medium mt-1">Earned {earnings}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
