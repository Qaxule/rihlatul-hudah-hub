import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const HadithSkeleton = () => {
  return (
    <Card className="shadow-soft">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Number badge skeleton */}
          <Skeleton className="flex-shrink-0 w-10 h-10 rounded-full" />
          
          <div className="flex-1 space-y-4">
            {/* Arabic text skeleton */}
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50 space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5 ml-auto" />
              <Skeleton className="h-6 w-11/12 ml-auto" />
            </div>
            
            {/* English text skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            {/* Reference and bookmark skeleton */}
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
