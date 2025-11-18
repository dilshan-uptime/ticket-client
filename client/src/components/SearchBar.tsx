import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/ticketsSlice";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.tickets);

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tickets..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="pl-9"
        data-testid="input-search"
      />
    </div>
  );
}
