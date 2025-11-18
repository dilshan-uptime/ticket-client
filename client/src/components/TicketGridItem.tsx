import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Calendar } from "lucide-react";
import type { Ticket } from "@shared/schema";
import { format } from "date-fns";

interface TicketGridItemProps {
  ticket: Ticket;
}

export function TicketGridItem({ ticket }: TicketGridItemProps) {
  return (
    <Card 
      className="transition-all duration-200 hover-elevate active-elevate-2 cursor-pointer overflow-visible" 
      data-testid={`grid-item-ticket-${ticket.id}`}
    >
      <CardHeader className="space-y-2 pb-3">
        <StatusBadge status={ticket.status as any} />
        <h3 className="font-medium text-sm line-clamp-2" data-testid={`text-ticket-name-${ticket.id}`}>
          {ticket.name}
        </h3>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-xs text-muted-foreground line-clamp-3" data-testid={`text-ticket-description-${ticket.id}`}>
          {ticket.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-1 text-xs text-muted-foreground pt-3 border-t" data-testid={`text-ticket-created-${ticket.id}`}>
        <Calendar className="h-3 w-3" />
        <span>{format(new Date(ticket.createdAt), "MMM d")}</span>
      </CardFooter>
    </Card>
  );
}
