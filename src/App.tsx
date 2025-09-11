import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import FloatingAIChatbot from "@/components/FloatingAIChatbot";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import Modules from "./pages/Modules";
import Quiz from "./pages/Quiz";
import DrillSimulator from "./pages/DrillSimulator";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";
import RealTimeAlerts from "./pages/RealTimeAlerts";
import GeoLocationTips from "./pages/GeoLocationTips";
import LiveCommunication from "./pages/LiveCommunication";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/student-dashboard" element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/teacher-dashboard" element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/progress-analytics" element={
            <ProtectedRoute>
              <ProgressAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/modules" element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          } />
          <Route path="/quiz/:moduleId" element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } />
          <Route path="/drill-simulator" element={
            <ProtectedRoute>
              <DrillSimulator />
            </ProtectedRoute>
          } />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/real-time-alerts" element={<RealTimeAlerts />} />
          <Route path="/geo-location-tips" element={<GeoLocationTips />} />
          <Route path="/live-communication" element={<LiveCommunication />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingAIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
</QueryClientProvider>
);

export default App;
