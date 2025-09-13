import { Shield, Users, BookOpen, AlertTriangle, CheckCircle, Award, MapPin, Cloud, Zap, Phone, Mountain, Droplets, Wind, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-disaster-prep.jpg";
import WeatherWidget from "@/components/WeatherWidget";
import QuickEmergencyPanel from "@/components/QuickEmergencyPanel";
import DisasterPreparednessSection from "@/components/DisasterPreparednessSection";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";

const Landing = () => {
  const features = [
    {
      icon: BookOpen,
      title: "AI-Powered Learning",
      description: "24/7 AI assistant providing instant disaster management guidance and educational content",
      color: "primary",
      link: "#",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Cloud,
      title: "Real-Time Weather Alerts",
      description: "Live weather monitoring with disaster risk assessment and emergency notifications",
      color: "warning",
      link: "/real-time-alerts",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Response Hub",
      description: "Quick access to Indian emergency services, procedures, and safety resources",
      color: "emergency",
      link: "/emergency",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: MapPin,
      title: "Interactive Emergency Maps",
      description: "OpenStreetMap integration showing hospitals, fire stations, and evacuation routes",
      color: "safe",
      link: "/emergency-map",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: Mountain,
      title: "Earthquake Preparedness",
      description: "Comprehensive earthquake safety protocols and building safety assessments",
      color: "orange",
      link: "/modules",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Droplets,
      title: "Flood Management",
      description: "Flood prediction, evacuation planning, and water safety emergency procedures",
      color: "blue",
      link: "/modules",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Wind,
      title: "Cyclone Safety",
      description: "Cyclone tracking, preparation checklists, and shelter location guidance",
      color: "purple",
      link: "/modules",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Flame,
      title: "Fire Emergency Response",
      description: "Fire safety protocols, evacuation procedures, and prevention strategies",
      color: "red",
      link: "/modules",
      gradient: "from-red-500 to-orange-500"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students Trained" },
    { number: "1,200+", label: "Schools Connected" },
    { number: "25", label: "Disaster Types Covered" },
    { number: "99.5%", label: "Preparedness Score" }
  ];

  const emergencyNumbers = [
    { name: 'Police', number: '100', color: 'bg-red-500' },
    { name: 'Fire', number: '101', color: 'bg-orange-500' },
    { name: 'Ambulance', number: '102', color: 'bg-green-500' },
    { name: 'Disaster Mgmt', number: '108', color: 'bg-blue-500' },
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
            <nav className="hidden md:flex space-x-6">
              <Link to="/emergency" className="text-muted-foreground hover:text-primary transition-colors font-medium">🚨 Emergency</Link>
              <Link to="/emergency-map" className="text-muted-foreground hover:text-primary transition-colors font-medium">🗺️ Maps</Link>
              <Link to="/real-time-alerts" className="text-muted-foreground hover:text-primary transition-colors font-medium">📡 Alerts</Link>
              <Link to="/geo-location-tips" className="text-muted-foreground hover:text-primary transition-colors font-medium">📍 Safety Tips</Link>
              <Link to="/live-communication" className="text-muted-foreground hover:text-primary transition-colors font-medium">💬 Communication</Link>
            </nav>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <LanguageSelector />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-primary font-medium animate-pulse px-4 py-2">
                  🚨 24/7 Emergency Preparedness Platform for India
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Master Disaster
                  <br />Response &
                  <br />Save Lives
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  India's most comprehensive disaster education platform trusted by educational institutions nationwide. 
                  Interactive training, real-time weather alerts, AI-powered guidance, OpenStreetMap integration,
                  and Indian emergency response tools to build truly prepared communities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg" asChild>
                  <Link to="/login">🚀 Start Training Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg" asChild>
                  <Link to="/emergency">🚨 Emergency Hub</Link>
                </Button>
              </div>

              {/* Emergency Numbers Quick Access */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
                <h3 className="font-bold text-lg mb-4 text-red-800">🚨 Quick Emergency Access (India)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {emergencyNumbers.map((contact, index) => (
                    <Button
                      key={index}
                      size="sm"
                      className={`${contact.color} hover:opacity-90 text-white font-bold`}
                      onClick={() => window.open(`tel:${contact.number}`)}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      {contact.name} {contact.number}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Live Demo Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button variant="ghost" size="sm" className="text-sm bg-blue-50 hover:bg-blue-100">
                  🤖 AI Assistant (See floating bot →)
                </Button>
                <Button variant="ghost" size="sm" className="text-sm bg-green-50 hover:bg-green-100" asChild>
                  <Link to="/real-time-alerts">📡 Live Weather Alerts</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-sm bg-purple-50 hover:bg-purple-100" asChild>
                  <Link to="/emergency-map">🗺️ Interactive Maps</Link>
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Disaster preparedness education in action"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-semibold text-sm">Readiness Score</div>
                    <div className="text-2xl font-bold text-green-500">99.5%</div>
                  </div>
                </div>
              </div>
              
              {/* Weather Widget positioned in hero */}
              <div className="absolute -top-4 -right-4 w-72">
                <WeatherWidget showAlerts={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary px-4 py-2">✨ Try Our Platform Live</Badge>
            <h2 className="text-4xl font-bold">Experience DisasterEd In Action</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Test our emergency response tools and AI assistant with real Indian emergency data - no signup required
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-2 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Emergency Hub</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Access Indian emergency contacts (100, 101, 102, 108), safety procedures, and real-time alerts
                </p>
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700" asChild>
                  <Link to="/emergency">🚨 Open Emergency Hub</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-2 bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Interactive Maps</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  OpenStreetMap integration showing hospitals, fire stations, and evacuation routes across India
                </p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700" asChild>
                  <Link to="/emergency-map">🗺️ View Emergency Maps</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">AI Safety Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Chat with our AI for instant emergency guidance and disaster management procedures
                </p>
                <Button className="w-full" variant="outline" disabled>
                  🤖 Look for floating bot (bottom-right) →
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                    <Cloud className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Weather Alerts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Real-time weather monitoring with disaster risk assessment for Indian conditions
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700" asChild>
                  <Link to="/real-time-alerts">⛈️ View Weather Alerts</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disaster Preparedness Section */}
      <DisasterPreparednessSection />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary px-4 py-2">🛡️ Comprehensive Safety Education</Badge>
            <h2 className="text-4xl font-bold">Everything You Need for Disaster Preparedness</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized training modules covering all major natural disasters affecting India - from earthquakes to cyclones.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-3 cursor-pointer group overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <Link to={feature.link}>
                  <CardHeader className="relative z-10">
                    <div className={`inline-flex p-4 rounded-full mx-auto bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Safer Communities Across India?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of educational institutions already using DisasterEd to enhance their emergency preparedness 
            with Indian emergency services integration and real-time weather monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold" asChild>
              <Link to="/login">🚀 Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold" asChild>
              <Link to="/login">📞 Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Emergency Panel */}
      <QuickEmergencyPanel />

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
                <li><Link to="/emergency" className="hover:text-primary">🚨 Emergency Hub</Link></li>
                <li><Link to="/emergency-map" className="hover:text-primary">🗺️ Interactive Maps</Link></li>
                <li><span className="text-muted-foreground">🤖 AI Assistant (floating chat)</span></li>
                <li><Link to="/real-time-alerts" className="hover:text-primary">⛈️ Weather Alerts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency Services (India)</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="text-red-600 font-bold">🚔 Police: 100</span></li>
                <li><span className="text-orange-600 font-bold">🚒 Fire: 101</span></li>
                <li><span className="text-green-600 font-bold">🚑 Ambulance: 102</span></li>
                <li><span className="text-blue-600 font-bold">🌪️ Disaster: 108</span></li>
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
            <p>&copy; 2024 DisasterEd India. Comprehensive disaster preparedness education platform. All rights reserved.</p>
            <p className="text-sm mt-2">🇮🇳 Proudly serving educational institutions across India with localized emergency response training.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;