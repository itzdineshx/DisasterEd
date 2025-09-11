import { useState } from "react";
import { Shield, Mail, Lock, Eye, EyeOff, GraduationCap, Users, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [email, setEmail] = useState("john.doe@university.edu");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = [
    { id: "student", label: "Student", icon: GraduationCap, color: "primary" },
    { id: "teacher", label: "Teacher", icon: Users, color: "safe" },
    { id: "admin", label: "Admin", icon: Shield, color: "warning" },
    { id: "officer", label: "Disaster Officer", icon: UserCheck, color: "emergency" }
  ];

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password, selectedRole);
      
      if (success) {
        toast.success("Login successful!");
        const dashboardRoutes = {
          student: "/student-dashboard",
          teacher: "/teacher-dashboard", 
          admin: "/admin-dashboard", 
          officer: "/officer-dashboard"
        };
        navigate(dashboardRoutes[selectedRole as keyof typeof dashboardRoutes] || "/student-dashboard");
      } else {
        toast.error("Invalid credentials or role mismatch");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="w-full max-w-lg space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-bold">
            <Shield className="h-8 w-8 text-primary" />
            <span>DisasterEd</span>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue your emergency preparedness journey</p>
          </div>
        </div>

        <Card className="shadow-card border-0 animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your role and enter your credentials
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <form onSubmit={handleLogin}>
                  {/* Role Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Select Your Role</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((role) => {
                        const IconComponent = role.icon;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => setSelectedRole(role.id)}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                              selectedRole === role.id
                                ? `border-${role.color} bg-${role.color}/5 shadow-md`
                                : "border-border hover:border-muted-foreground/50"
                            }`}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              <IconComponent className={`h-5 w-5 ${
                                selectedRole === role.id ? `text-${role.color}` : "text-muted-foreground"
                              }`} />
                              <span className={`text-xs font-medium ${
                                selectedRole === role.id ? `text-${role.color}` : "text-muted-foreground"
                              }`}>
                                {role.label}  
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Login Form */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email or Institution ID</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          placeholder="student@university.edu"
                          className="pl-9"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-9 pr-9"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full" 
                    size="lg"
                    disabled={!selectedRole || isLoading}
                  >
                    {isLoading ? "Signing in..." : `Sign In as ${selectedRole ? roles.find(r => r.id === selectedRole)?.label : "User"}`}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your.email@university.edu"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input id="institution" placeholder="University Name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signupPassword"
                        type="password"
                        className="pl-9"
                        placeholder="Create a strong password"
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>

            {/* Demo Access */}
            <div className="mt-6 pt-6 border-t">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">Quick Demo Access</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {roles.map((role) => (
                    <Badge
                      key={role.id}
                      variant="outline"
                      className={`cursor-pointer hover:bg-${role.color}/10 hover:border-${role.color}/50 transition-colors`}
                      onClick={() => {
                        setSelectedRole(role.id);
                        // Use demo credentials for quick access
                        setEmail("john.doe@university.edu");
                        setPassword("password123");
                        handleLogin();
                      }}
                    >
                      Demo {role.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact your institution admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;