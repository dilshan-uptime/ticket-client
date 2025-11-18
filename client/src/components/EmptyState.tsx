import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
}

export function EmptyState({ 
  message = "No tickets found", 
  description = "There are no tickets matching your current filters." 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="empty-state">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2" data-testid="text-empty-title">
        {message}
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-md" data-testid="text-empty-description">
        {description}
      </p>
    </div>
  );
}
