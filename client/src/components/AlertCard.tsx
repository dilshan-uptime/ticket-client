import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, ExternalLink } from "lucide-react";
import { Ticket } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AlertCardProps {
  ticket: Ticket;
}

export function AlertCard({ ticket }: AlertCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return { bg: "bg-orange-500", text: "text-orange-600", label: "Priority: Low" };
      case "in-progress":
        return { bg: "bg-blue-500", text: "text-blue-600", label: "Priority: High" };
      case "completed":
        return { bg: "bg-green-500", text: "text-green-600", label: "Priority: Low" };
      default:
        return { bg: "bg-gray-500", text: "text-gray-600", label: "Priority: Low" };
    }
  };

  const statusInfo = getStatusColor(ticket.status);
  
  const totalCount = 100;
  const progressCount = ticket.status === "completed" ? 100 : 
                        ticket.status === "in-progress" ? 50 : 10;
  const openCount = totalCount - progressCount;
  const progressPercentage = Math.round((progressCount / totalCount) * 100);

  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const isOnline = ticket.status !== "completed";

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`alert-card-${ticket.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-muted-foreground">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <div>
          <h3 className="font-semibold text-base line-clamp-2 mb-2" data-testid={`alert-title-${ticket.id}`}>
            {ticket.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="text-xs font-medium border-primary/20 bg-primary/5">
              Default
            </Badge>
            <Badge variant="outline" className={`text-xs font-medium ${statusInfo.text} border-current/20 bg-current/5`}>
              {statusInfo.label}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-center py-2">
          <div className="relative h-24 w-24">
            <svg className="transform -rotate-90" width="96" height="96">
              <circle
                cx="48"
                cy="48"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted/30"
              />
              <circle
                cx="48"
                cy="48"
                r="28"
                stroke={statusInfo.bg.replace('bg-', '')}
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={statusInfo.bg}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{progressPercentage}%</span>
              <span className="text-xs text-muted-foreground">Progress</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="text-xl font-bold">{totalCount}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center border-x">
            <div className="text-xl font-bold text-green-600">{progressCount}</div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600">{openCount}</div>
            <div className="text-xs text-muted-foreground">Open</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Last updated {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          className="w-full gap-2 text-primary border-primary/20 hover:bg-primary/5"
          data-testid={`button-open-dashboard-${ticket.id}`}
        >
          Open Dashboard
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
