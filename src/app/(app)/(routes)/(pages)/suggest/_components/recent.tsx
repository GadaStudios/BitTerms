import { Badge } from "@/components/ui/badge";
import React from "react";

export const RecentlyAdded = () => {
  return (
    <div className="max-w-[361px] mx-auto w-full flex items-center justify-center flex-wrap gap-2">
      <p className="text-sm sm:text-base font-normal">Recently added terms</p>

      <Badge className="h-[35px] px-4 text-sm text-foreground font-normal bg-[#F9FDE5]">
        Consensus
      </Badge>
      <Badge className="h-[35px] px-4 text-sm text-foreground font-normal bg-[#F9FDE5]">
        Hash
      </Badge>
      <Badge className="h-[35px] px-4 text-sm text-foreground font-normal bg-[#F9FDE5]">
        BBFT (Byzantine Fault Tolerance)
      </Badge>
    </div>
  );
};
