"use client";
import Skeleton from '@mui/material/Skeleton'

export default function UserCardSkeleton() {
  return (
    <div className="border rounded-md shadow-md p-4 bg-white">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={60} height={60} />
        <div className="flex-1">
          <Skeleton variant="text" width="70%" height={24} />
          <Skeleton variant="text" width="50%" height={20} />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} width="80%" />
        <Skeleton variant="rectangular" height={36} className="rounded-md" />
      </div>
    </div>
  );
}