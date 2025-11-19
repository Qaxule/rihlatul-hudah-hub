import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AyahSkeleton = () => {
  return (
    <Card className="shadow-soft animate-pulse">
      <CardContent className="p-6 space-y-6">
        {/* Ayah number and actions */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
        
        {/* Arabic text skeleton */}
        <div className="space-y-3 text-right">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-11/12 ml-auto" />
          <Skeleton className="h-8 w-4/5 ml-auto" />
        </div>
        
        {/* Transliteration skeleton */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        {/* Translation skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  );
};
