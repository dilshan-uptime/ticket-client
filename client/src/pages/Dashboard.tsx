import { useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { StatusFilter } from "@/components/StatusFilter";
import { ViewModeToggle } from "@/components/ViewModeToggle";
import { StatisticsOverview } from "@/components/StatisticsOverview";
import { AlertCard } from "@/components/AlertCard";
import { TicketListItem } from "@/components/TicketListItem";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Grid3x3, List } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTickets, setLoading, setError } from "@/store/slices/ticketsSlice";
import { setViewMode } from "@/store/slices/uiSlice";
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

  const handleRefresh = async () => {
    dispatch(setLoading(true));
    try {
      const tickets = await ticketApi.getAll();
      dispatch(setTickets(tickets));
      toast.success("Tickets refreshed successfully");
    } catch (error: any) {
      toast.error("Failed to refresh tickets");
    }
  };

  const renderTickets = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (filteredTickets.length === 0) {
      const message = searchQuery || statusFilter !== "all" 
        ? "No alerts found" 
        : "No alerts yet";
      const description = searchQuery || statusFilter !== "all"
        ? "Try adjusting your search or filters to find what you're looking for."
        : "Create your first alert dashboard to get started.";
      
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

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="tickets-grid-view">
        {filteredTickets.map((ticket) => (
          <AlertCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground" data-testid="text-dashboard-title">
                Alert Dashboard Presets
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and monitor your alert dashboard configurations
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="default"
                onClick={handleRefresh}
                data-testid="button-reload"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload
              </Button>
              <Button 
                variant="default" 
                size="default"
                data-testid="button-add-new"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>

          <StatisticsOverview />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-md">
              <SearchBar />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground" data-testid="text-tickets-count">
                Showing {filteredTickets.length} of {filteredTickets.length}
              </span>
              <div className="flex items-center gap-1 border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => dispatch(setViewMode("grid"))}
                  data-testid="button-view-grid"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => dispatch(setViewMode("list"))}
                  data-testid="button-view-list"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <StatusFilter />
            </div>
          </div>

          {renderTickets()}
        </div>
      </main>
    </div>
  );
}
