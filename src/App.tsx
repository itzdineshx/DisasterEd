import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import FloatingAIChatbot from "@/components/FloatingAIChatbot";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import Modules from "./pages/Modules";
import ModuleDetail from "./pages/ModuleDetail";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";
import RealTimeAlerts from "./pages/RealTimeAlerts";
import GeoLocationTips from "./pages/GeoLocationTips";
import LiveCommunication from "./pages/LiveCommunication";
import OfficerDashboard from "./pages/OfficerDashboard";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import EmergencyMap from "./pages/EmergencyMap";
import ComplexityDemo from "./components/ComplexityDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="disaster-ed-theme">
      <TranslationProvider>
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
          <Route path="/officer-dashboard" element={
            <ProtectedRoute requiredRole="officer">
              <OfficerDashboard />
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
          <Route path="/module/:id" element={
            <ProtectedRoute>
              <ModuleDetail />
            </ProtectedRoute>
          } />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/complexity-demo" element={<ComplexityDemo />} />
          <Route path="/real-time-alerts" element={<RealTimeAlerts />} />
          <Route path="/geo-location-tips" element={<GeoLocationTips />} />
          <Route path="/live-communication" element={<LiveCommunication />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/emergency-map" element={
            <ProtectedRoute>
              <EmergencyMap />
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingAIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
      </TranslationProvider>
    </ThemeProvider>
</QueryClientProvider>
);

export default App;
