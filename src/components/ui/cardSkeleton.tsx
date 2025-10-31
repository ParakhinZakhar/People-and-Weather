"use client";

export function UserCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-md shadow-md p-6 animate-pulse">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      </div>

      <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>

      <div className="flex gap-2">
        <div className="h-10 bg-gray-300 rounded flex-1"></div>
        <div className="h-10 bg-gray-300 rounded flex-1"></div>
        <div className="h-10 bg-gray-300 rounded w-10"></div>
      </div>
    </div>
  );
}