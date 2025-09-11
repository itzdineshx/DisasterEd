import { Shield, Users, BookOpen, AlertTriangle, CheckCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-disaster-prep.jpg";

const Landing = () => {
  const features = [
    {
      icon: BookOpen,
      title: "AI-Powered Learning",
      description: "24/7 AI assistant providing instant answers to emergency questions (floating bot)",
      color: "primary",
      link: "#"
    },
    {
      icon: Users,
      title: "Live Alert System",
      description: "Real-time disaster notifications from official emergency services",
      color: "warning",
      link: "/real-time-alerts"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Response Hub",
      description: "Quick access to emergency contacts, procedures, and safety resources",
      color: "emergency",
      link: "/emergency"
    },
    {
      icon: Award,
      title: "Location-Based Safety",
      description: "Personalized preparedness tips based on your geographic location",
      color: "safe",
      link: "/geo-location-tips"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Trained" },
    { number: "500+", label: "Schools Connected" },
    { number: "15", label: "Disaster Types Covered" },
    { number: "98%", label: "Preparedness Score" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">DisasterEd</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/emergency" className="text-muted-foreground hover:text-primary transition-colors">Emergency</Link>
              <Link to="/real-time-alerts" className="text-muted-foreground hover:text-primary transition-colors">Alerts</Link>
              <Link to="/geo-location-tips" className="text-muted-foreground hover:text-primary transition-colors">Safety Tips</Link>
              <Link to="/live-communication" className="text-muted-foreground hover:text-primary transition-colors">Communication</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-primary font-medium animate-pulse">
                  🚨 24/7 Emergency Preparedness Platform
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Master Emergency
                  <span className="text-primary"> Response</span>
                  <br />& Save Lives
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  The comprehensive disaster education platform trusted by educational institutions worldwide. 
                  Interactive training, real-time alerts, AI-powered guidance, and emergency response tools 
                  to build truly prepared communities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="hero" asChild>
                  <Link to="/login">Start Training Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/emergency">🚨 Emergency Hub</Link>
                </Button>
              </div>

              {/* Live Demo Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button variant="ghost" size="sm" className="text-sm">
                  🤖 AI Assistant (See floating bot →)
                </Button>
                <Button variant="ghost" size="sm" className="text-sm" asChild>
                  <Link to="/real-time-alerts">📡 Live Alerts Demo</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-sm" asChild>
                  <Link to="/geo-location-tips">📍 Location Tips</Link>
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Disaster preparedness education in action"
                className="rounded-2xl shadow-card w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-card">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-safe" />
                  <div>
                    <div className="font-semibold text-sm">Ready Score</div>
                    <div className="text-2xl font-bold text-safe">98%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary">✨ Try Our Platform Live</Badge>
            <h2 className="text-4xl font-bold">Experience DisasterEd In Action</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Test our emergency response tools and AI assistant - no signup required
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-card transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Emergency Hub</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access emergency contacts, safety procedures, and real-time alerts dashboard
                </p>
                <Button className="w-full" asChild>
                  <Link to="/emergency">🚨 Open Emergency Hub</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-safe/10 rounded-lg">
                    <Users className="h-6 w-6 text-safe" />
                  </div>
                  <CardTitle>AI Safety Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Chat with our AI for instant emergency guidance and safety procedures
                </p>
                <Button className="w-full" variant="outline" disabled>
                  🤖 Look for floating bot (bottom-right) →
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-card transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Shield className="h-6 w-6 text-warning" />
                  </div>
                  <CardTitle>Live Alerts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View real-time disaster alerts and emergency notifications system
                </p>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/real-time-alerts">📡 View Live Alerts</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Comprehensive Safety Education</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything your institution needs to build a culture of preparedness and safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                <Link to={feature.link}>
                  <CardHeader>
                    <div className={`inline-flex p-3 rounded-full mx-auto feature-icon-${feature.color} group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Safer Communities?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of educational institutions already using DisasterEd to enhance their emergency preparedness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/login">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">DisasterEd</span>
              </div>
              <p className="text-muted-foreground">
                Building safer communities through education and preparedness.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/emergency" className="hover:text-primary">Emergency Hub</Link></li>
                <li><Link to="/ai-chatbot" className="hover:text-primary">AI Assistant</Link></li>
                <li><Link to="/real-time-alerts" className="hover:text-primary">Live Alerts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Safety Tools</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/geo-location-tips" className="hover:text-primary">Location Tips</Link></li>
                <li><Link to="/live-communication" className="hover:text-primary">Communication</Link></li>
                <li><Link to="/drill-simulator" className="hover:text-primary">Drill Simulator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Get Started</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/login" className="hover:text-primary">Sign In</Link></li>
                <li><Link to="/role-selection" className="hover:text-primary">Choose Role</Link></li>
                <li><Link to="/modules" className="hover:text-primary">Training Modules</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DisasterEd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;