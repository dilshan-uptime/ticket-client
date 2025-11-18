import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock } from "lucide-react";
import type { Ticket } from "@shared/schema";
import { format } from "date-fns";

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Card 
      className="transition-all duration-200 hover-elevate active-elevate-2 cursor-pointer overflow-visible" 
      data-testid={`card-ticket-${ticket.id}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base line-clamp-2" data-testid={`text-ticket-name-${ticket.id}`}>
            {ticket.name}
          </h3>
        </div>
        <StatusBadge status={ticket.status as any} />
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-ticket-description-${ticket.id}`}>
          {ticket.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pt-3 border-t">
        <div className="flex items-center gap-1" data-testid={`text-ticket-created-${ticket.id}`}>
          <Calendar className="h-3 w-3" />
          <span>Created: {format(new Date(ticket.createdAt), "MMM d, yyyy")}</span>
        </div>
        <div className="flex items-center gap-1" data-testid={`text-ticket-updated-${ticket.id}`}>
          <Clock className="h-3 w-3" />
          <span>Updated: {format(new Date(ticket.updatedAt), "MMM d, yyyy")}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
