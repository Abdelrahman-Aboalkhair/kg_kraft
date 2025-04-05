import { Loader2 } from "lucide-react";
import React from "react";

const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-primary">
      <Loader2 className="animate-spin mr-2 text-[20px] " />
      <span className="text-[20px]">Loading...</span>
    </div>
  );
};

export default CustomLoader;
