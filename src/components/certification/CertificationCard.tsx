import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Certification } from "@/data/trainingData";
import { Download, Award } from 'lucide-react';

interface CertificationCardProps {
  certification: Certification;
  earnedDate?: string;
  expiryDate?: string;
  score?: number;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  earnedDate,
  expiryDate,
  score
}) => {
  const isExpired = expiryDate ? new Date(expiryDate) < new Date() : false;
  const daysUntilExpiry = expiryDate
    ? Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {certification.title}
              <Badge variant={isExpired ? "destructive" : "outline"}>
                {certification.level}
              </Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {certification.description}
            </p>
          </div>
          <Award className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Issuer</p>
              <p className="text-sm text-muted-foreground">{certification.issuer}</p>
            </div>
            {score && (
              <div>
                <p className="text-sm font-medium">Score Achieved</p>
                <p className="text-sm text-muted-foreground">{score}%</p>
              </div>
            )}
            {earnedDate && (
              <div>
                <p className="text-sm font-medium">Earned Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(earnedDate).toLocaleDateString()}
                </p>
              </div>
            )}
            {expiryDate && (
              <div>
                <p className="text-sm font-medium">Valid Until</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(expiryDate).toLocaleDateString()}
                  {!isExpired && daysUntilExpiry < 30 && (
                    <Badge variant="warning" className="ml-2">
                      Expires in {daysUntilExpiry} days
                    </Badge>
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Requirements</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimum Score: {certification.requirements.minimumScore}%</li>
              {certification.requirements.practicalAssessments && (
                <li>• Practical Assessment Required</li>
              )}
              <li>• Valid for {certification.validityPeriod} months</li>
            </ul>
          </div>

          {earnedDate && !isExpired && (
            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          )}

          {isExpired && (
            <Button className="w-full" variant="destructive">
              Renew Certification
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};