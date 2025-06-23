import { GuardianAuthProvider, useGuardianAuth } from "@/hooks/useGuardianAuth";
import { DemoAuth } from "@/components/guardian/DemoAuth";
import { GuardianDashboard } from "@/components/guardian/GuardianDashboard";
import PaymentGatedAccess from "@/components/PaymentGatedAccess";
import EnhancedNavigationBar from "@/components/navigation/EnhancedNavigationBar";
import { Shield } from "lucide-react";

function GuardianContent() {
  const { session } = useGuardianAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      {/* Enhanced Navigation */}
      <div className="relative z-50">
        <EnhancedNavigationBar variant="floating" showLabels={true} />
      </div>

      <div className="pt-20">
        {session?.isAuthenticated ? <GuardianDashboard /> : <DemoAuth />}
      </div>
    </div>
  );
}

export default function Guardian() {
  return (
    <GuardianAuthProvider>
      <PaymentGatedAccess
        requiredPlan="cluster_steward"
        requiredPayment={true}
        featureName="Guardian Intelligence Layer"
        featureDescription="Sacred oversight and moral operating system that ensures ethical alignment, wealth distribution, and AI governance across the platform. Access the sacred intelligence that protects collective flourishing."
        featureIcon={Shield}
        allowPreview={true}
        previewDuration={120}
      >
        <GuardianContent />
      </PaymentGatedAccess>
    </GuardianAuthProvider>
  );
}
