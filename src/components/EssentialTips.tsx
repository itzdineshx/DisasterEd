import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, MapPin, Phone, CheckCircle, BookOpen } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const tips = [
  {
    id: 'plan',
    title: 'Make an emergency plan',
    body: 'Identify escape routes, meeting points and emergency contacts. Practice the plan with family or colleagues regularly.',
    icon: Shield
  },
  {
    id: 'kit',
    title: 'Prepare an emergency kit',
    body: 'Include water, non-perishable food, flashlight, batteries, first-aid kit, chargers and important documents.',
    icon: CheckCircle
  },
  {
    id: 'numbers',
    title: 'Save essential numbers',
    body: 'Keep local emergency numbers saved and accessible. Know the nearest hospital and police contacts.',
    icon: Phone
  },
  {
    id: 'location',
    title: 'Know your location',
    body: 'Familiarize yourself with nearby shelters and evacuation routes. Enable location services for personalized tips.',
    icon: MapPin
  },
  {
    id: 'learn',
    title: 'Learn and practice',
    body: 'Take short courses, run drills, and learn first-aid basics to increase confidence during an emergency.',
    icon: BookOpen
  }
];

const EssentialTips: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="essential-tips" className="space-y-4">
      <Card className="card-enhanced">
        <CardHeader>
          <CardTitle id="essential-tips" className="flex items-center justify-between">
            <span className="font-semibold">{t ? t('emergency.title') || 'Essential Preparedness Tips' : 'Essential Preparedness Tips'}</span>
            <Button variant="ghost" size="sm" asChild>
              <a href="/emergency-procedures">Learn More</a>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div key={tip.id} className="p-3 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{t ? t(`tips.${tip.id}.title`) || tip.title : tip.title}</div>
                    <div className="text-sm text-muted-foreground">{t ? t(`tips.${tip.id}.body`) || tip.body : tip.body}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
};

export default EssentialTips;
