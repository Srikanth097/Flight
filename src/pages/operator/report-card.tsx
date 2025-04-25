// src/pages/operator/components/report-card.tsx

import { FC } from "react";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReportCardProps {
  title: string;
  value: string | number;
  isPositive: boolean; // Use for checking if the report value is positive or negative
}

const ReportCard: FC<ReportCardProps> = ({ title, value, isPositive }) => {
  return (
    <Card className="w-full p-4 shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-xl font-bold">{value}</p>
      </CardContent>
      <CardFooter>
        <Badge variant={isPositive ? "outline" : "destructive"}>
          {isPositive ? "Positive" : "Negative"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
