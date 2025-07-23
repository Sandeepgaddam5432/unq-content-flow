import * as React from "react";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

export interface SkeletonBaseProps {
  className?: string;
}

export interface TableSkeletonProps extends SkeletonBaseProps {
  rowCount?: number;
  columnCount?: number;
}

export function CardSkeleton({ className }: SkeletonBaseProps) {
  return (
    <div className={cn("rounded-lg border p-4", className)}>
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="mt-6 flex gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton({ className }: SkeletonBaseProps) {
  return (
    <div className={cn("w-full space-y-3 rounded-lg border p-4", className)}>
      <Skeleton className="h-4 w-1/4" />
      <div className="h-[200px] w-full flex items-end gap-2 pt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-full w-full"
            style={{ height: `${10 + Math.random() * 80}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between pt-2">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

export function TableSkeleton({ 
  className, 
  rowCount = 5, 
  columnCount = 4 
}: TableSkeletonProps) {
  return (
    <div className={cn("w-full rounded-lg border", className)}>
      {/* Header */}
      <div className="flex border-b p-3 bg-muted/30">
        {Array.from({ length: columnCount }).map((_, i) => (
          <div key={i} className="flex-1">
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex border-b p-3 last:border-0">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <div key={colIndex} className="flex-1">
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function DashboardStatsSkeleton({ className }: SkeletonBaseProps) {
  return (
    <div className={cn("grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4", className)}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center gap-2 mt-3">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function VideoCardSkeleton({ className }: SkeletonBaseProps) {
  return (
    <div className={cn("rounded-lg border overflow-hidden", className)}>
      <Skeleton className="h-40 w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/5" />
        </div>
      </div>
    </div>
  );
} 