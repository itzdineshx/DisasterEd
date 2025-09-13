import { DashboardHeader } from "@/components/DashboardHeader";
import { AdvancedProgress } from "@/components/AdvancedProgress";
import { useAuth } from "@/contexts/AuthContext";

const ProgressAnalytics = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title="Progress Analytics"
        subtitle="Detailed analysis of your learning journey and emergency preparedness"
        userRole={user?.role as "student" | "teacher" | "admin" | "officer" || 'student'}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdvancedProgress userId={user?.id || '1'} />
      </main>
    </div>
  );
};

export default ProgressAnalytics;