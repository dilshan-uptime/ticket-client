import { useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { StatusFilter } from "@/components/StatusFilter";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { TicketCard } from "@/components/TicketCard";
import { TicketListItem } from "@/components/TicketListItem";
import { TicketGridItem } from "@/components/TicketGridItem";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTickets, setLoading, setError } from "@/store/slices/ticketsSlice";
import { ticketApi } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { filteredTickets, isLoading, searchQuery, statusFilter } = useAppSelector(
    (state) => state.tickets
  );
  const { viewMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const fetchTickets = async () => {
      dispatch(setLoading(true));
      try {
        const tickets = await ticketApi.getAll();
        dispatch(setTickets(tickets));
      } catch (error: any) {
        console.error("Error fetching tickets:", error);
        dispatch(setError(error.message || "Failed to fetch tickets"));
        toast.error("Failed to load tickets. Please try again.");
      }
    };

    fetchTickets();
  }, [dispatch]);

  const renderTickets = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (filteredTickets.length === 0) {
      const message = searchQuery || statusFilter !== "all" 
        ? "No tickets found" 
        : "No tickets yet";
      const description = searchQuery || statusFilter !== "all"
        ? "Try adjusting your search or filters to find what you're looking for."
        : "Create your first ticket to get started with ticket management.";
      
      return <EmptyState message={message} description={description} />;
    }

    if (viewMode === "list") {
      return (
        <div className="border rounded-lg overflow-hidden" data-testid="tickets-list-view">
          {filteredTickets.map((ticket) => (
            <TicketListItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
      );
    }

    if (viewMode === "grid") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="tickets-grid-view">
          {filteredTickets.map((ticket) => (
            <TicketGridItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="tickets-card-view">
        {filteredTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground" data-testid="text-dashboard-title">
                All Tickets
              </h2>
              <p className="text-sm text-muted-foreground mt-1" data-testid="text-tickets-count">
                {filteredTickets.length} {filteredTickets.length === 1 ? "ticket" : "tickets"} found
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap">
            <SearchBar />
            <div className="flex items-center gap-3 flex-wrap">
              <StatusFilter />
              <ViewModeToggle />
            </div>
          </div>

          {renderTickets()}
        </div>
      </main>
    </div>
  );
}
