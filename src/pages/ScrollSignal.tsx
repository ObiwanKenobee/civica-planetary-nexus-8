// CIVICA 144 ScrollSignal Page
// Main page wrapper for the ScrollSignal platform

import React from "react";
import { ScrollSignalPlatform } from "@/components/scrollSignal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NetworkStatusIndicator from "@/components/NetworkStatusIndicator";

const ScrollSignalPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900">
        <NetworkStatusIndicator variant="embedded" />
        <ScrollSignalPlatform />
      </div>
    </ErrorBoundary>
  );
};

export default ScrollSignalPage;
