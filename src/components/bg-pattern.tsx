
import React from "react";

export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background dark:from-background/80 dark:via-background dark:to-background/90 z-0"></div>
      
      {/* Animated circles */}
      <div className="absolute top-10 left-[10%] w-72 h-72 bg-ptc-primary/20 rounded-full filter blur-3xl animate-spin-slow"></div>
      <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-ptc-accent/20 rounded-full filter blur-3xl animate-spin-slow animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-ptc-secondary/20 rounded-full filter blur-3xl animate-spin-slow animation-delay-4000"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
    </div>
  );
}
