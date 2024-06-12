import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface CardReportProps {
  title: string;
  content: string;
  subContent: string;
  icon: any;
}

const CardReport = ({ title, content, subContent, icon }: CardReportProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-xs text-muted-foreground">{subContent}</p>
      </CardContent>
    </Card>
  );
};

export default CardReport;
