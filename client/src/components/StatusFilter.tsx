import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setStatusFilter } from "@/store/slices/ticketsSlice";
import type { TicketStatus } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

export function StatusFilter() {
  const dispatch = useAppDispatch();
  const { statusFilter } = useAppSelector((state) => state.tickets);

  const statusOptions: Array<{ value: TicketStatus | "all"; label: string }> = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const getActiveFilterLabel = () => {
    const option = statusOptions.find((opt) => opt.value === statusFilter);
    return option?.label || "All Status";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="button-filter">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">{getActiveFilterLabel()}</span>
          {statusFilter !== "all" && (
            <Badge variant="secondary" className="ml-1 rounded-full px-2 py-0 text-xs">
              1
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={statusFilter}
          onValueChange={(value) => dispatch(setStatusFilter(value as TicketStatus | "all"))}
        >
          {statusOptions.map((option) => (
            <DropdownMenuRadioItem 
              key={option.value} 
              value={option.value}
              data-testid={`filter-option-${option.value}`}
            >
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
