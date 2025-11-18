import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/store/hooks";

export function LoadingSkeleton() {
  const { viewMode } = useAppSelector((state) => state.ui);

  if (viewMode === "list") {
    return (
      <div className="space-y-0" data-testid="loading-skeleton">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b bg-card p-4 gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4" data-testid="loading-skeleton">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-2 pb-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent className="pb-3">
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-4/5" />
            </CardContent>
            <CardFooter className="pt-3 border-t">
              <Skeleton className="h-3 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="loading-skeleton">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent className="pb-3">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-4 pt-3 border-t">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-28" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
