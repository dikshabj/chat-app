import React from "react";

function Loading() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      {/* This is a Skeleton Loader design */}
      <div className="skeleton h-14 w-full rounded-lg bg-gray-700"></div>
      <div className="skeleton h-14 w-full rounded-lg bg-gray-700"></div>
      <div className="skeleton h-14 w-full rounded-lg bg-gray-700"></div>
    </div>
  );
}

export default Loading;