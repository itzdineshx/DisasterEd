import { useState } from "react";
import { User, Mail, Building, Calendar, Shield, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useAuth();
  const { badges, getOverallProgress, getCompletedModules, getAverageQuizScore } = useProgress();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    institution: user?.institution || ''
  });

  // Notification preferences
  const [notificationSettings, setNotificationSettings] = useState({
    emergencyAlerts: true,
    drillReminders: true,
    achievementNotifications: true,
    weeklyProgress: false,
    systemUpdates: true
  });

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      institution: user?.institution || ''
    });
    setIsEditing(false);
  };

  const getInitials = () => {
    return `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student": return "primary";
      case "teacher": return "safe";
      case "admin": return "warning";
      case "officer": return "emergency";
      default: return "primary";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student": return "Student";
      case "teacher": return "Teacher";
      case "admin": return "Administrator";
      case "officer": return "Disaster Officer";
      default: return "User";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <DashboardHeader 
        title="Profile Settings"
        subtitle="Manage your account information and preferences"
        userRole={user?.role === 'officer' ? 'disaster-officer' : user?.role || 'student'}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-2xl font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
                
                <Badge 
                  variant="outline" 
                  className={`mt-2 text-${getRoleColor(user?.role || 'student')} border-${getRoleColor(user?.role || 'student')}/30`}
                >
                  {getRoleLabel(user?.role || 'student')}
                </Badge>

                <div className="mt-4 pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Member since</span>
                    <span>{new Date(user?.joinDate || '').toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Institution</span>
                    <span className="text-right">{user?.institution}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{getOverallProgress()}%</div>
                  <p className="text-sm text-muted-foreground">Overall Preparedness</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-safe">{getCompletedModules()}</div>
                    <p className="text-xs text-muted-foreground">Modules Completed</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-warning">{badges.length}</div>
                    <p className="text-xs text-muted-foreground">Badges Earned</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{getAverageQuizScore()}%</div>
                  <p className="text-xs text-muted-foreground">Average Quiz Score</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {key === 'emergencyAlerts' && 'Receive critical emergency notifications'}
                        {key === 'drillReminders' && 'Get reminders about upcoming emergency drills'}
                        {key === 'achievementNotifications' && 'Notifications when you earn badges or complete modules'}
                        {key === 'weeklyProgress' && 'Weekly summary of your learning progress'}
                        {key === 'systemUpdates' && 'Updates about new features and system maintenance'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({...notificationSettings, [key]: checked})
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                {badges.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No badges earned yet</p>
                    <p className="text-sm text-muted-foreground">Complete modules and quizzes to earn your first badge!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {badges.slice(0, 6).map((badge, index) => (
                      <div
                        key={index}
                        className="text-center p-4 rounded-lg border bg-gradient-to-br from-primary/5 to-safe/5"
                      >
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <h4 className="font-medium text-sm">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground capitalize">
                          {badge.category}
                        </p>
                        <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(badge.earnedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;