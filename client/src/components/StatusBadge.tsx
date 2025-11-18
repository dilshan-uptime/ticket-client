import { Badge } from "@/components/ui/badge";
import type { TicketStatus } from "@shared/schema";

interface StatusBadgeProps {
  status: TicketStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: TicketStatus) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={`${getStatusColor(status)} font-medium`}
      data-testid={`badge-status-${status}`}
    >
      {getStatusLabel(status)}
    </Badge>
  );
}
