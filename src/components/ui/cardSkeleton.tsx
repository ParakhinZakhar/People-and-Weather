"use client";

export function UserCardSkeleton() {
  return (
    <div className="
      border border-border bg-card rounded-2xl shadow-md 
      flex flex-col h-full w-full
      animate-pulse
    ">
      <div className="flex flex-col items-center text-center w-full space-y-3 sm:space-y-4 p-4 sm:p-6">

        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full"></div>

        <div className="h-5 sm:h-6 bg-muted rounded w-3/4 mx-auto"></div>

        <div className="w-full space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted/70 rounded w-2/3"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </div>
            <div className="flex-[2] space-y-2">
              <div className="h-3 bg-muted/70 rounded w-2/3"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </div>
          </div>
          
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-muted/70 rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="
        flex justify-center gap-2 sm:gap-3 w-full 
        border-t border-border pt-3 sm:pt-4 pb-3 sm:pb-4 px-4
        flex-wrap mt-auto
      ">
        <div className="h-8 sm:h-9 bg-muted rounded flex-1 min-w-[80px]"></div>
        <div className="h-8 sm:h-9 bg-muted rounded flex-1 min-w-[80px]"></div>
        <div className="h-8 sm:h-9 bg-muted rounded flex-1 min-w-[80px]"></div>
      </div>
    </div>
  );
}