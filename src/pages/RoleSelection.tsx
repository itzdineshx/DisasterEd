import { GraduationCap, Users, Shield, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const RoleSelection = () => {
  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Access learning modules, take quizzes, and practice emergency drills",
      icon: GraduationCap,
      color: "primary",
      features: [
        "Interactive disaster education modules",
        "Gamified quizzes and assessments",
        "Virtual drill simulations",
        "Progress tracking and badges"
      ],
      route: "/student-dashboard"
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "Manage classes, assign modules, and track student progress",
      icon: Users,
      color: "safe",
      features: [
        "Class management tools",
        "Student progress analytics",
        "Drill scheduling and monitoring",
        "Curriculum customization"
      ],
      route: "/teacher-dashboard"
    },
    {
      id: "admin",
      title: "Administrator", 
      description: "Oversee institution-wide preparedness and generate reports",
      icon: Shield,
      color: "warning",
      features: [
        "Institution-wide analytics",
        "Preparedness reporting",
        "Emergency contact management",
        "System configuration"
      ],
      route: "/admin-dashboard"
    },
    {
      id: "disaster-officer",
      title: "Disaster Officer",
      description: "Coordinate emergency response and manage real-time communications",
      icon: UserCheck,
      color: "emergency",
      features: [
        "Emergency alert management",
        "Real-time communication tools",
        "Incident response coordination",
        "Crisis management dashboard"
      ],
      route: "/officer-dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">DisasterEd</span>
            </Link>
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Role Selection */}
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Choose Your Role</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your role to access personalized disaster preparedness tools and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card 
                  key={role.id} 
                  className="relative hover:shadow-card transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex p-4 rounded-full bg-${role.color}/10 mx-auto mb-4 group-hover:bg-${role.color}/20 transition-colors`}>
                      <IconComponent className={`h-8 w-8 text-${role.color}`} />
                    </div>
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-center">
                      {role.description}
                    </p>
                    
                    <ul className="space-y-2 text-sm">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${role.color} mt-2 flex-shrink-0`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full mt-6 bg-${role.color} hover:bg-${role.color}/90 text-${role.color}-foreground`}
                      asChild
                    >
                      <Link to={role.route}>
                        Continue as {role.title}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Need help choosing? Contact our support team for guidance.
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/contact">Get Help</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;