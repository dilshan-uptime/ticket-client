import { StatusBadge } from "./StatusBadge";
import { Calendar, Clock } from "lucide-react";
import type { Ticket } from "@shared/schema";
import { format } from "date-fns";

interface TicketListItemProps {
  ticket: Ticket;
}

export function TicketListItem({ ticket }: TicketListItemProps) {
  return (
    <div 
      className="flex flex-col gap-3 border-b bg-card p-4 hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 overflow-visible sm:flex-row sm:items-center sm:justify-between" 
      data-testid={`list-item-ticket-${ticket.id}`}
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start gap-3 flex-wrap">
          <h3 className="font-medium text-base flex-1 min-w-0" data-testid={`text-ticket-name-${ticket.id}`}>
            {ticket.name}
          </h3>
          <StatusBadge status={ticket.status as any} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1" data-testid={`text-ticket-description-${ticket.id}`}>
          {ticket.description}
        </p>
      </div>
      
      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1" data-testid={`text-ticket-created-${ticket.id}`}>
          <Calendar className="h-3 w-3" />
          <span className="whitespace-nowrap">Created: {format(new Date(ticket.createdAt), "MMM d, yyyy")}</span>
        </div>
        <div className="flex items-center gap-1" data-testid={`text-ticket-updated-${ticket.id}`}>
          <Clock className="h-3 w-3" />
          <span className="whitespace-nowrap">Updated: {format(new Date(ticket.updatedAt), "MMM d, yyyy")}</span>
        </div>
      </div>
    </div>
  );
}
