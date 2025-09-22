import { Shield, Users, BookOpen, AlertTriangle, CheckCircle, Award, MapPin, Cloud, Zap, Phone, Mountain, Droplets, Wind, Flame, Star, TrendingUp, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-disaster-prep.jpg";
import WeatherWidget from "@/components/WeatherWidget";
import QuickEmergencyPanel from "@/components/QuickEmergencyPanel";
import DisasterPreparednessSection from "@/components/DisasterPreparednessSection";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "@/contexts/TranslationContext";

const Landing = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const features = [
    {
      icon: BookOpen,
      title: t('landing.features.aiLearning.title'),
      description: t('landing.features.aiLearning.description'),
      color: "primary",
      link: "#",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Cloud,
      title: t('landing.features.weatherAlerts.title'),
      description: t('landing.features.weatherAlerts.description'),
      color: "warning",
      link: "/real-time-alerts",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: AlertTriangle,
      title: t('landing.features.emergencyHub.title'),
      description: t('landing.features.emergencyHub.description'),
      color: "emergency",
      link: "/emergency",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: MapPin,
      title: t('landing.features.interactiveMaps.title'),
      description: t('landing.features.interactiveMaps.description'),
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
    { number: "50,000+", label: t('landing.stats.students', { count: '50,000+' }) },
    { number: "1,200+", label: t('landing.stats.modules', { count: '1,200+' }) },
    { number: "25", label: t('landing.stats.emergencies', { count: '25' }) },
    { number: "99.5%", label: t('landing.stats.countries', { count: '99.5%' }) }
  ];

  const emergencyNumbers = [
    { name: 'Police', number: '100', color: 'bg-red-500 hover:bg-red-600', description: 'Emergency Police Services' },
    { name: 'Fire Brigade', number: '101', color: 'bg-orange-500 hover:bg-orange-600', description: 'Fire & Rescue Services' },
    { name: 'Ambulance', number: '102', color: 'bg-green-500 hover:bg-green-600', description: 'Medical Emergency' },
    { name: 'Disaster Mgmt', number: '108', color: 'bg-blue-500 hover:bg-blue-600', description: 'Disaster Response' },
    { name: 'Women Helpline', number: '1091', color: 'bg-purple-500 hover:bg-purple-600', description: 'Women in Distress' },
    { name: 'Child Helpline', number: '1098', color: 'bg-pink-500 hover:bg-pink-600', description: 'Child Protection' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Enhanced Header */}
  <header className="border-b bg-white/90 dark:bg-background/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 animate-fade-in">
              <div className="p-2 theme-gradient-emergency rounded-lg">
                <Shield className="h-6 w-6 text-emergency-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">DisasterEd</span>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <nav className="hidden md:flex space-x-6">
              <Link to="/emergency" className="text-muted-foreground hover:text-emergency transition-all font-medium hover-scale flex items-center space-x-1">
                <AlertTriangle className="h-4 w-4 text-emergency" />
                <span>{t('navigation.emergency')}</span>
              </Link>
              <Link to="/emergency-map" className="text-muted-foreground hover:text-primary transition-all font-medium hover-scale flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t('navigation.maps')}</span>
              </Link>
              <Link to="/real-time-alerts" className="text-muted-foreground hover:text-warning transition-all font-medium hover-scale flex items-center space-x-1">
                <Cloud className="h-4 w-4 text-warning" />
                <span>{t('navigation.alerts')}</span>
              </Link>
              <Link to="/geo-location-tips" className="text-muted-foreground hover:text-safe transition-all font-medium hover-scale flex items-center space-x-1">
                <Globe className="h-4 w-4 text-safe" />
                <span>{t('navigation.tips')}</span>
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <LanguageSelector />
              <Button variant="outline" className="hover-scale" asChild>
                <Link to="/login">{t('navigation.login')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link 
              to="/emergency" 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AlertTriangle className="h-5 w-5 text-emergency" />
              <span className="font-medium">{t('navigation.emergency')}</span>
            </Link>
            <Link 
              to="/emergency-map" 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">{t('navigation.maps')}</span>
            </Link>
            <Link 
              to="/real-time-alerts" 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Cloud className="h-5 w-5 text-warning" />
              <span className="font-medium">{t('navigation.alerts')}</span>
            </Link>
            <Link 
              to="/geo-location-tips" 
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Globe className="h-5 w-5 text-safe" />
              <span className="font-medium">{t('navigation.tips')}</span>
            </Link>
            <div className="border-t pt-4 flex items-center space-x-3">
              <ThemeToggle />
              <LanguageSelector />
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.login')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-secondary/10 overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emergency rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-primary font-medium animate-pulse px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
                  🚨 India's #1 Emergency Preparedness Platform
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent animate-scale-in">
                  {t('landing.hero.title')}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {t('landing.hero.subtitle')}
                </p>
              </div>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/50 dark:bg-card/50 rounded-xl backdrop-blur-sm border hover-scale transition-all animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '200ms'}}>
                <Button size="lg" className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg hover-scale animate-pulse-glow shadow-lg" asChild>
                  <Link to="/login">{t('landing.hero.getStarted')}</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg hover-scale transition-all" asChild>
                  <Link to="/emergency">{t('landing.hero.learnMore')}</Link>
                </Button>
              </div>

              {/* Enhanced Emergency Numbers Quick Access - Matching Reference Design */}
              <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200 dark:border-red-800 shadow-xl animate-fade-in" style={{animationDelay: '300ms'}}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-red-800 dark:text-red-200">Indian Emergency Hotlines</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Police */}
                  <button
                    onClick={() => window.open('tel:100')}
                    className="rounded-xl p-4 transition-all hover-scale group shadow-lg btn-emergency-enhanced"
                    aria-label="Call Police"
                  >
                    <div className="flex items-center justify-between">
                      <Phone className="h-5 w-5 group-hover:animate-pulse" />
                      <div className="text-right">
                        <div className="text-sm font-medium opacity-90">Police</div>
                        <div className="text-2xl font-bold">100</div>
                      </div>
                    </div>
                  </button>

                  {/* Fire Brigade */}
                  <button
                    onClick={() => window.open('tel:101')}
                    className="rounded-xl p-4 transition-all hover-scale group shadow-lg btn-primary-enhanced"
                    aria-label="Call Fire Brigade"
                  >
                    <div className="flex items-center justify-between">
                      <Phone className="h-5 w-5 group-hover:animate-pulse" />
                      <div className="text-right">
                        <div className="text-sm font-medium opacity-90">Fire Brigade</div>
                        <div className="text-2xl font-bold">101</div>
                      </div>
                    </div>
                  </button>

                  {/* Ambulance */}
                  <button
                    onClick={() => window.open('tel:102')}
                    className="rounded-xl p-4 transition-all hover-scale group shadow-lg btn-safe-enhanced"
                    aria-label="Call Ambulance"
                  >
                    <div className="flex items-center justify-between">
                      <Phone className="h-5 w-5 group-hover:animate-pulse" />
                      <div className="text-right">
                        <div className="text-sm font-medium opacity-90">Ambulance</div>
                        <div className="text-2xl font-bold">102</div>
                      </div>
                    </div>
                  </button>

                  {/* Disaster Management */}
                  <button
                    onClick={() => window.open('tel:108')}
                    className="rounded-xl p-4 transition-all hover-scale group shadow-lg btn-primary-enhanced"
                    aria-label="Call Disaster Management"
                  >
                    <div className="flex items-center justify-between">
                      <Phone className="h-5 w-5 group-hover:animate-pulse" />
                      <div className="text-right">
                        <div className="text-sm font-medium opacity-90">Disaster Mgmt</div>
                        <div className="text-2xl font-bold">108</div>
                      </div>
                    </div>
                  </button>

                  {/* Women Helpline */}
                  <button
                    onClick={() => window.open('tel:1091')}
                    className="rounded-xl p-4 transition-all hover-scale group shadow-lg btn-primary-enhanced"
                    aria-label="Call Women Helpline"
                  >
                    <div className="flex items-center justify-between">
                      <Phone className="h-5 w-5 group-hover:animate-pulse" />
                      <div className="text-right">
                        <div className="text-sm font-medium opacity-90">Women Helpline</div>
                        <div className="text-2xl font-bold">1091</div>
                      </div>
                    </div>
                  </button>

                  {/* Child Helpline */}
                  <button
                    onClick={() => window.open('tel:1098')}
                    className="rounded-xl p-4 transition-all hover-scale group shadow-lg btn-primary-enhanced"
                    aria-label="Call Child Helpline"
                  >
                    <div className="flex items-center justify-between">
                      <Phone className="h-5 w-5 group-hover:animate-pulse" />
                      <div className="text-right">
                        <div className="text-sm font-medium opacity-90">Child Helpline</div>
                        <div className="text-2xl font-bold">1098</div>
                      </div>
                    </div>
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-medium flex items-center justify-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>Tap any number for instant calling • Available 24/7 across India</span>
                  </p>
                </div>
              </div>

              {/* Enhanced Live Demo Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 animate-fade-in" style={{animationDelay: '400ms'}}>
                <Button variant="ghost" size="sm" className="text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 hover-scale transition-all border border-blue-200 dark:border-blue-800">
                  <Zap className="h-4 w-4 mr-1" />
                  AI Assistant (See floating bot →)
                </Button>
                <Button variant="ghost" size="sm" className="text-sm bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/40 hover-scale transition-all border border-green-200 dark:border-green-800" asChild>
                  <Link to="/real-time-alerts">
                    <Cloud className="h-4 w-4 mr-1" />
                    Live Weather Alerts
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-sm bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/20 dark:hover:bg-purple-950/40 hover-scale transition-all border border-purple-200 dark:border-purple-800" asChild>
                  <Link to="/emergency-map">
                    <MapPin className="h-4 w-4 mr-1" />
                    Interactive Maps
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{animationDelay: '100ms'}}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl hover-scale transition-all">
                <img 
                  src={heroImage} 
                  alt="Disaster preparedness education in action"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Enhanced Readiness Score Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white dark:bg-card rounded-xl p-4 shadow-xl border hover-scale transition-all animate-pulse-glow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-muted-foreground">Readiness Score</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">99.5%</div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border animate-pulse">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
              </div>
              
              <div className="absolute bottom-20 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border animate-pulse delay-500">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">50K+ Trained</span>
                </div>
              </div>
              
              {/* Weather Widget positioned in hero - Mobile responsive */}
              <div className="absolute top-16 right-2 w-64 lg:w-72 hidden sm:block">
                <WeatherWidget showAlerts={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Live Demo Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16 animate-fade-in">
            <Badge variant="outline" className="text-primary px-4 py-2 bg-white/50 dark:bg-card/50 backdrop-blur-sm">✨ Try Our Platform Live</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Experience DisasterEd In Action</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Test our emergency response tools and AI assistant with real Indian emergency data - no signup required
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-2 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800 hover-scale animate-fade-in group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-red-600 transition-colors">Emergency Hub</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-4 text-sm">
                  Access Indian emergency contacts (100, 101, 102, 108), safety procedures, and real-time alerts
                </p>
                <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 hover-scale shadow-lg" asChild>
                  <Link to="/emergency">🚨 Open Emergency Hub</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-2 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border-green-200 dark:border-green-800 hover-scale animate-fade-in group overflow-hidden relative" style={{animationDelay: '100ms'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-green-600 transition-colors">Interactive Maps</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-4 text-sm">
                  OpenStreetMap integration showing hospitals, fire stations, and evacuation routes across India
                </p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 hover-scale shadow-lg" asChild>
                  <Link to="/emergency-map">🗺️ View Emergency Maps</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800 hover-scale animate-fade-in group overflow-hidden relative" style={{animationDelay: '200ms'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                    <Cloud className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-yellow-600 transition-colors">Weather Alerts</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-4 text-sm">
                  Real-time weather monitoring with disaster risk assessment for Indian conditions
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 hover-scale shadow-lg" asChild>
                  <Link to="/real-time-alerts">⛈️ View Weather Alerts</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disaster Preparedness Section */}
      <DisasterPreparednessSection />

      {/* Enhanced Features Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16 animate-fade-in">
            <Badge variant="outline" className="text-primary px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">🛡️ Comprehensive Safety Education</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Everything You Need for Disaster Preparedness</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized training modules covering all major natural disasters affecting India - from earthquakes to cyclones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-3 cursor-pointer group overflow-hidden relative border-2 hover:border-primary/20 animate-fade-in" style={{animationDelay: `${index * 50}ms`}}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <Link to={feature.link}>
                  <CardHeader className="relative z-10 pb-4">
                    <div className={`inline-flex p-4 rounded-full mx-auto bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pt-0">
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="hover-scale">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {/* Simple dot pattern for background */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-fade-in space-y-6">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 mb-4">
              <Clock className="h-4 w-4 mr-2" />
              Join 50,000+ Students Already Prepared
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Build Safer Communities Across India?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of educational institutions already using DisasterEd to enhance their emergency preparedness 
              with Indian emergency services integration and real-time weather monitoring.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold hover-scale bg-white text-primary hover:bg-white/90 shadow-2xl" asChild>
                <Link to="/login">🚀 Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold hover-scale bg-white text-primary hover:bg-white/90 shadow-2xl" asChild>
                <Link to="/emergency">🚨 Try Emergency Hub</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 opacity-80">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-300 fill-current" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">1,200+ Schools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-12 animate-fade-in">
            <Badge variant="outline" className="text-primary px-4 py-2 bg-white/50 dark:bg-card/50 backdrop-blur-sm">
              👨‍💻 Meet the Developers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Built with Passion for Safety
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 1,
                  name: "Member 1",
                  role: "Full Stack Developer",
                  expertise: ["React", "Node.js", "MongoDB"],
                  imageUrl: "/team/member1.jpg" // You can add these images later
                },
                {
                  id: 2,
                  name: "Member 2",
                  role: "UI/UX Designer",
                  expertise: ["Figma", "User Research", "Prototyping"],
                  imageUrl: "/team/member2.jpg"
                },
                {
                  id: 3,
                  name: "Member 3",
                  role: "Emergency Systems Specialist",
                  expertise: ["Safety Protocols", "Risk Assessment"],
                  imageUrl: "/team/member3.jpg"
                },
                {
                  id: 4,
                  name: "Member 4",
                  role: "AI Integration Expert",
                  expertise: ["Machine Learning", "NLP", "Python"],
                  imageUrl: "/team/member4.jpg"
                },
                {
                  id: 5,
                  name: "Member 5",
                  role: "DevOps Engineer",
                  expertise: ["AWS", "Docker", "CI/CD"],
                  imageUrl: "/team/member5.jpg"
                },
                {
                  id: 6,
                  name: "Member 6",
                  role: "Security Specialist",
                  expertise: ["Cybersecurity", "Data Protection"],
                  imageUrl: "/team/member6.jpg"
                }
              ].map((member) => (
                <Card key={member.id} className="p-6 bg-white/70 dark:bg-card/70 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all hover-scale shadow-xl">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/20">
                      {/* Placeholder until image is added */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">{member.name.split(' ')[1]}</span>
                      </div>
                      {/* Uncomment when adding real images */}
                      {/* <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      /> */}
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="font-semibold text-lg text-primary">{member.name}</h3>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{member.role}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.map((skill, index) => (
                          <Badge 
                            key={index}
                            variant="secondary" 
                            className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <Card className="p-8 bg-white/70 dark:bg-card/70 backdrop-blur-sm border-2 border-primary/20">
                <div className="text-center space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our diverse team brings together expertise in technology, emergency management, and education to create a comprehensive disaster preparedness platform for India.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-indigo-100">Full Stack Development</Badge>
                    <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-teal-100">Emergency Systems</Badge>
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100">AI & Machine Learning</Badge>
                    <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-red-100">UI/UX Design</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950/30 dark:via-teal-950/30 dark:to-blue-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16 animate-fade-in">
            <Badge variant="outline" className="text-primary px-4 py-2 bg-white/50 dark:bg-card/50 backdrop-blur-sm">
              🌟 Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Trusted by Educational Institutions Across India
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              See how DisasterEd is transforming emergency preparedness education in schools and colleges nationwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-6 bg-white/70 dark:bg-card/70 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-2 hover-scale animate-fade-in border-2 border-green-200 dark:border-green-800">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 dark:text-green-200">Dr. Priya Sharma</h4>
                    <p className="text-sm text-muted-foreground">Principal, Delhi Public School, Mumbai</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "DisasterEd has revolutionized our emergency preparedness program. The AI-powered simulations and real-time weather alerts 
                  have made our students 90% more confident in handling emergency situations."
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">5.0/5</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 dark:bg-card/70 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-2 hover-scale animate-fade-in border-2 border-blue-200 dark:border-blue-800" style={{animationDelay: '100ms'}}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 dark:text-blue-200">Prof. Rajesh Kumar</h4>
                    <p className="text-sm text-muted-foreground">Emergency Coordinator, IIT Chennai</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "The interactive emergency maps and Indian emergency hotline integration saved precious time during our last drill. 
                  Students could instantly access emergency services and evacuation routes."
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">5.0/5</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 dark:bg-card/70 backdrop-blur-sm hover:shadow-xl transition-all hover:-translate-y-2 hover-scale animate-fade-in border-2 border-purple-200 dark:border-purple-800" style={{animationDelay: '200ms'}}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-800 dark:text-purple-200">Ms. Kavitha Reddy</h4>
                    <p className="text-sm text-muted-foreground">Safety Officer, Anna University, Chennai</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "The comprehensive disaster modules covering earthquakes, floods, and cyclones specific to Indian conditions 
                  are exactly what our curriculum needed. The progress analytics help track student engagement perfectly."
                </p>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">5.0/5</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* India-Specific Disaster Preparedness Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-950/30 dark:via-red-950/30 dark:to-pink-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 sm:mb-16 animate-fade-in">
            <Badge variant="outline" className="text-primary px-4 py-2 bg-white/50 dark:bg-card/50 backdrop-blur-sm">
              🇮🇳 India-Specific Training
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Disaster Preparedness for Indian Conditions
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive training modules designed specifically for India's diverse geographical and climatic challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 hover:shadow-xl transition-all hover:-translate-y-2 hover-scale animate-fade-in border-2 border-orange-200 dark:border-orange-800">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-orange-800 dark:text-orange-200">Earthquake Zones</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Special focus on high-risk zones like Delhi, Gujarat, and Northeast states. Learn building safety codes and earthquake-resistant construction.
                </p>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-orange-600">Zone V</div>
                  <div className="text-xs text-orange-700 dark:text-orange-300">Highest Risk Areas</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 hover:shadow-xl transition-all hover:-translate-y-2 hover-scale animate-fade-in border-2 border-blue-200 dark:border-blue-800" style={{animationDelay: '100ms'}}>
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Droplets className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-blue-800 dark:text-blue-200">Monsoon Floods</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Specific training for monsoon-related flooding in Kerala, Assam, Bihar, and urban areas like Mumbai and Chennai.
                </p>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">Jun-Sep</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">Peak Flood Season</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 hover:shadow-xl transition-all hover:-translate-y-2 hover-scale animate-fade-in border-2 border-purple-200 dark:border-purple-800" style={{animationDelay: '200ms'}}>
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Wind className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-purple-800 dark:text-purple-200">Cyclone Safety</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Coastal area preparedness for Odisha, Andhra Pradesh, Tamil Nadu, and West Bengal cyclone-prone regions.
                </p>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-600">Apr-Dec</div>
                  <div className="text-xs text-purple-700 dark:text-purple-300">Cyclone Seasons</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/50 dark:to-pink-950/50 hover:shadow-xl transition-all hover:-translate-y-2 hover-scale animate-fade-in border-2 border-red-200 dark:border-red-800" style={{animationDelay: '300ms'}}>
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Flame className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-red-800 dark:text-red-200">Heat Waves</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Summer heat wave management for Rajasthan, Haryana, and central Indian states with temperatures exceeding 45°C.
                </p>
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-600">45°C+</div>
                  <div className="text-xs text-red-700 dark:text-red-300">Extreme Heat Alert</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center animate-fade-in" style={{animationDelay: '400ms'}}>
            <Card className="p-8 bg-white/70 dark:bg-card/70 backdrop-blur-sm border-2 border-primary/20 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">29</div>
                  <div className="text-sm text-muted-foreground">States & UTs Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">22</div>
                  <div className="text-sm text-muted-foreground">Official Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">India-Specific Content</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Emergency Panel */}
      <QuickEmergencyPanel />

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl">DisasterEd</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                India's most comprehensive disaster education platform, built to create safer communities through technology and knowledge.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">DMI College of Engineering, Chennai</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Available 24/7 across India</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg">Emergency Services</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-red-600/20 rounded-lg p-2">
                  <span className="text-sm">Police Emergency</span>
                  <Badge variant="secondary" className="bg-red-500 text-white">100</Badge>
                </div>
                <div className="flex items-center justify-between bg-orange-600/20 rounded-lg p-2">
                  <span className="text-sm">Fire Brigade</span>
                  <Badge variant="secondary" className="bg-orange-500 text-white">101</Badge>
                </div>
                <div className="flex items-center justify-between bg-green-600/20 rounded-lg p-2">
                  <span className="text-sm">Medical Emergency</span>
                  <Badge variant="secondary" className="bg-green-500 text-white">102</Badge>
                </div>
                <div className="flex items-center justify-between bg-blue-600/20 rounded-lg p-2">
                  <span className="text-sm">Disaster Management</span>
                  <Badge variant="secondary" className="bg-blue-500 text-white">108</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/emergency" className="block text-gray-300 hover:text-white transition-colors">Emergency Hub</Link>
                <Link to="/emergency-map" className="block text-gray-300 hover:text-white transition-colors">Interactive Maps</Link>
                <Link to="/real-time-alerts" className="block text-gray-300 hover:text-white transition-colors">Weather Alerts</Link>
                <Link to="/modules" className="block text-gray-300 hover:text-white transition-colors">Training Modules</Link>
                <Link to="/login" className="block text-gray-300 hover:text-white transition-colors">Get Started</Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg">Platform Stats</h4>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">50,000+</div>
                  <div className="text-sm text-gray-300">Students Trained</div>
                </div>
                <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">1,200+</div>
                  <div className="text-sm text-gray-300">Schools Connected</div>
                </div>
                <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg p-3">
                  <div className="text-2xl font-bold">99.5%</div>
                  <div className="text-sm text-gray-300">Preparedness Score</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-300">
                  © 2024 DisasterEd. Built with ❤️ by <span className="font-semibold text-primary">DINESH S</span> at DMI College of Engineering, Chennai.
                </p>
                <p className="text-sm text-gray-400 mt-1">Empowering India with emergency preparedness through technology.</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-white border-white/30">
                  Made in India 🇮🇳
                </Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  Open Source
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;