import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SacredAuthProvider } from "@/hooks/useSacredAuth";
import { CivicaProvider } from "@/contexts/CivicaContext";
import { BillingProvider } from "@/hooks/useBilling";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingSpinner from "./components/LoadingSpinner";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Billing from "./pages/Billing";
import RitualTech from "./pages/RitualTech";
import RitualTechServices from "./pages/RitualTechServices";
import Guardian from "./pages/Guardian";
import SignalTemple from "./pages/SignalTemple";
import ScrollSignal from "./pages/ScrollSignal";
import Security from "./pages/Security";
import HealthCheck from "./pages/HealthCheck";
import SacredAuthGuard from "./components/SacredAuthGuard";
import PageNotFound from "./components/PageNotFound";
import LoadFailureDiagnostic from "./components/LoadFailureDiagnostic";
import LoadDiagnostic from "./pages/LoadDiagnostic";
import NetworkStatusIndicator from "./components/NetworkStatusIndicator";
import OfflineRecoveryPage from "./components/OfflineRecoveryPage";

const queryClient = new QueryClient();

const App = () => {
  try {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <SacredAuthProvider>
            <CivicaProvider>
              <BillingProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <NetworkStatusIndicator variant="floating" />
                  <Suspense
                    fallback={<LoadingSpinner type="mandala" size="lg" />}
                  >
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/health" element={<HealthCheck />} />
                        <Route
                          path="/diagnostic"
                          element={<LoadFailureDiagnostic />}
                        />
                        <Route
                          path="/load-diagnostic"
                          element={<LoadDiagnostic />}
                        />
                        <Route
                          path="/offline"
                          element={<OfflineRecoveryPage />}
                        />
                        <Route
                          path="/dashboard"
                          element={
                            <SacredAuthGuard>
                              <Index />
                            </SacredAuthGuard>
                          }
                        />
                        <Route
                          path="/billing"
                          element={
                            <SacredAuthGuard>
                              <Billing />
                            </SacredAuthGuard>
                          }
                        />
                        <Route
                          path="/ritual-technologist"
                          element={
                            <SacredAuthGuard>
                              <RitualTech />
                            </SacredAuthGuard>
                          }
                        />
                        <Route
                          path="/ritual-tech-services"
                          element={<RitualTechServices />}
                        />
                        <Route
                          path="/guardian"
                          element={
                            <SacredAuthGuard>
                              <Guardian />
                            </SacredAuthGuard>
                          }
                        />
                        <Route
                          path="/signal-temple"
                          element={
                            <SacredAuthGuard>
                              <SignalTemple />
                            </SacredAuthGuard>
                          }
                        />
                        <Route
                          path="/scroll-signal"
                          element={
                            <SacredAuthGuard>
                              <ScrollSignal />
                            </SacredAuthGuard>
                          }
                        />
                        <Route
                          path="/security"
                          element={
                            <SacredAuthGuard>
                              <Security />
                            </SacredAuthGuard>
                          }
                        />
                        <Route path="*" element={<PageNotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </Suspense>
                </TooltipProvider>
              </BillingProvider>
            </CivicaProvider>
          </SacredAuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Critical app initialization error:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-red-900 flex items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-white">App Load Failed</h1>
          <p className="text-gray-300">
            Critical initialization error occurred.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            🔄 Force Reload
          </button>
        </div>
      </div>
    );
  }
};

export default App;
