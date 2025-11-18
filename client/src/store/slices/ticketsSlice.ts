import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Ticket, TicketStatus } from "@shared/schema";

interface TicketsState {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: TicketStatus | "all";
}

const initialState: TicketsState = {
  tickets: [],
  filteredTickets: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  statusFilter: "all",
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
      state.filteredTickets = filterTickets(action.payload, state.searchQuery, state.statusFilter);
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredTickets = filterTickets(state.tickets, action.payload, state.statusFilter);
    },
    setStatusFilter: (state, action: PayloadAction<TicketStatus | "all">) => {
      state.statusFilter = action.payload;
      state.filteredTickets = filterTickets(state.tickets, state.searchQuery, action.payload);
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.unshift(action.payload);
      state.filteredTickets = filterTickets(state.tickets, state.searchQuery, state.statusFilter);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
        state.filteredTickets = filterTickets(state.tickets, state.searchQuery, state.statusFilter);
      }
    },
  },
});

function filterTickets(tickets: Ticket[], searchQuery: string, statusFilter: TicketStatus | "all"): Ticket[] {
  return tickets.filter((ticket) => {
    const matchesSearch = 
      searchQuery === "" ||
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
}

export const {
  setTickets,
  setLoading,
  setError,
  setSearchQuery,
  setStatusFilter,
  addTicket,
  updateTicket,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
