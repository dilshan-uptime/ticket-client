import { LayoutGrid, List, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setViewMode } from "@/store/slices/uiSlice";
import type { ViewMode } from "@shared/schema";

export function ViewModeToggle() {
  const dispatch = useAppDispatch();
  const { viewMode } = useAppSelector((state) => state.ui);

  const toggleView = (mode: ViewMode) => {
    dispatch(setViewMode(mode));
  };

  const getButtonVariant = (mode: ViewMode) => {
    return viewMode === mode ? "default" : "ghost";
  };

  return (
    <div className="flex items-center gap-1 rounded-md border bg-background p-1" data-testid="view-toggle-group">
      <Button
        variant={getButtonVariant("card")}
        size="sm"
        onClick={() => toggleView("card")}
        data-testid="button-view-card"
        className="gap-2"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Card</span>
      </Button>
      <Button
        variant={getButtonVariant("list")}
        size="sm"
        onClick={() => toggleView("list")}
        data-testid="button-view-list"
        className="gap-2"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
      <Button
        variant={getButtonVariant("grid")}
        size="sm"
        onClick={() => toggleView("grid")}
        data-testid="button-view-grid"
        className="gap-2"
      >
        <Grid3x3 className="h-4 w-4" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
    </div>
  );
}
