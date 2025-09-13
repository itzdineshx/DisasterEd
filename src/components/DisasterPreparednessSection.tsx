import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Shield, Zap, Droplets, Wind, Mountain, Flame } from 'lucide-react';

interface DisasterTip {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  tips: string[];
  preparation: string[];
}

const DisasterPreparednessSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const disasterTips: DisasterTip[] = [
    {
      id: 'earthquake',
      title: 'Earthquake Preparedness',
      icon: Mountain,
      color: 'text-orange-600',
      description: 'Earthquakes can strike without warning. Being prepared can save lives.',
      tips: [
        'Drop, Cover, and Hold during shaking',
        'Stay away from windows and heavy objects',
        'If outdoors, move away from buildings and power lines',
        'After shaking stops, evacuate if building is damaged'
      ],
      preparation: [
        'Secure heavy furniture to walls',
        'Keep emergency kit with 72 hours of supplies',
        'Identify safe spots in each room',
        'Practice earthquake drills regularly'
      ]
    },
    {
      id: 'flood',
      title: 'Flood Safety',
      icon: Droplets,
      color: 'text-blue-600',
      description: 'Floods are among the most common and destructive natural disasters.',
      tips: [
        'Never walk through flowing water',
        'Turn around, don\'t drown - find alternate route',
        'Move to higher ground immediately',
        'Stay away from storm drains and ditches'
      ],
      preparation: [
        'Know your evacuation routes',
        'Keep sandbags and emergency supplies ready',
        'Install sump pumps and backup power',
        'Review flood insurance coverage'
      ]
    },
    {
      id: 'fire',
      title: 'Fire Emergency',
      icon: Flame,
      color: 'text-red-600',
      description: 'Quick action during fire emergencies can prevent tragedy.',
      tips: [
        'Get low and crawl under smoke',
        'Feel doors before opening (if hot, find another way)',
        'Call 101 once you are safely outside',
        'Never go back inside a burning building'
      ],
      preparation: [
        'Install smoke detectors and check batteries',
        'Plan and practice escape routes',
        'Keep fire extinguishers in key locations',
        'Maintain clear exit pathways'
      ]
    },
    {
      id: 'cyclone',
      title: 'Cyclone/Hurricane Preparedness',
      icon: Wind,
      color: 'text-purple-600',
      description: 'Cyclones require advance preparation and evacuation planning.',
      tips: [
        'Stay indoors during the storm',
        'Avoid windows and glass doors',
        'Have battery-powered radio for updates',
        'Don\'t go outside during the eye of the storm'
      ],
      preparation: [
        'Board up windows with plywood',
        'Stock up on water and non-perishable food',
        'Trim trees and secure outdoor objects',
        'Know evacuation routes and shelters'
      ]
    }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="text-primary">🛡️ Disaster Preparedness</Badge>
          <h2 className="text-4xl font-bold">Essential Disaster Preparedness Tips</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to prepare for and respond to different types of natural disasters. Knowledge saves lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {disasterTips.map((disaster) => {
            const isOpen = openItems.includes(disaster.id);
            
            return (
              <Card key={disaster.id} className="hover:shadow-lg transition-all duration-300">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <CardHeader 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => toggleItem(disaster.id)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-3">
                          <div className={`p-2 rounded-full bg-muted`}>
                            <disaster.icon className={`h-6 w-6 ${disaster.color}`} />
                          </div>
                          <span className="text-lg">{disaster.title}</span>
                        </CardTitle>
                        {isOpen ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 text-left">
                        {disaster.description}
                      </p>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-red-700 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          During Emergency
                        </h4>
                        <ul className="space-y-2">
                          {disaster.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Preparation Steps
                        </h4>
                        <ul className="space-y-2">
                          {disaster.preparation.map((prep, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></span>
                              {prep}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">🚨 Emergency Kit Essentials</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">Basic Supplies (72 hours)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Water (1 gallon per person per day)</li>
                  <li>• Non-perishable food</li>
                  <li>• Battery-powered radio</li>
                  <li>• Flashlight and extra batteries</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Medical & Personal</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• First aid kit</li>
                  <li>• Prescription medications</li>
                  <li>• Personal hygiene items</li>
                  <li>• Important documents (copies)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tools & Communication</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Mobile phone with chargers</li>
                  <li>• Whistle for signaling help</li>
                  <li>• Local area maps</li>
                  <li>• Cash in small bills</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisasterPreparednessSection;